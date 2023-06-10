import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
// import {formatDistanceToNow} from 'date-fns'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header'
import SideBar from '../SideBar'
import FailureView from '../FailureView'
import ActiveThemeContext from '../../context/ActiveThemeContext'
import {
  VideoItemDetailsContainer,
  VideoCard,
  VideoTextContent,
  VideoTitle,
  VideoViewsAndDate,
  VideoButtonCard,
  VideoButton,
  BreakLine,
  ProfileContainer,
  ProfileImage,
  ProfileDetails,
  ProfileName,
  ProfileSubscriberCount,
  VideoDescription,
  LoaderCard,
} from './styledComponents'

const apiConstants = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {videoDetails: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiConstants.process})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        isLiked: false,
        isDisLiked: false,
      }
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({
      videoDetails: {
        ...prevState.videoDetails,
        isLiked: !prevState.videoDetails.isLiked,
        isDisLiked: false,
      },
    }))
  }

  onClickDisLike = () => {
    this.setState(prevState => ({
      videoDetails: {
        ...prevState.videoDetails,
        isLiked: false,
        isDisLiked: !prevState.videoDetails.isDisLiked,
      },
    }))
  }

  renderLoadingView = () => (
    <LoaderCard data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </LoaderCard>
  )

  renderSuccessView = (
    isDark,
    savedVideosList,
    savedVideosDetailsList,
    addSavedVideo,
    deleteSavedVideo,
  ) => {
    const {videoDetails} = this.state
    const {
      id,
      channel,
      description,
      title,
      publishedAt,
      thumbnailUrl,
      viewCount,
      videoUrl,
      isLiked,
      isDisLiked,
    } = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel
    // const uploadTime = formatDistanceToNow(new Date(publishedAt))
    let likeIconColor
    if (isLiked) {
      likeIconColor = '#2563eb'
    } else {
      likeIconColor = '#64748b'
    }
    let disLikeIconColor
    if (isDisLiked) {
      disLikeIconColor = '#2563eb'
    } else {
      disLikeIconColor = '#64748b'
    }
    const video = savedVideosList.findIndex(each => each === id)
    const isVideoSaved = video !== -1
    let iconColor
    if (isVideoSaved) {
      iconColor = '#2563eb'
    } else {
      iconColor = '#64748b'
    }
    const saveButtonText = isVideoSaved ? 'Saved' : 'Save'

    const onClickSave = () => {
      if (isVideoSaved) {
        deleteSavedVideo(id)
      } else {
        addSavedVideo(id, videoDetails)
      }
    }

    return (
      <VideoCard data-testid="videoItemDetails" isDark={isDark}>
        <ReactPlayer
          url={videoUrl}
          light={thumbnailUrl}
          height="50vh"
          width="100%"
        />
        <VideoTextContent>
          <VideoTitle isDark={isDark}>{title}</VideoTitle>
          <VideoViewsAndDate isDark={isDark}>
            {viewCount} views
          </VideoViewsAndDate>
          <VideoViewsAndDate isDark={isDark}>{publishedAt}</VideoViewsAndDate>
          <VideoButtonCard>
            <VideoButton
              type="button"
              onClick={this.onClickLike}
              active={isLiked}
            >
              <BiLike size={15} color={likeIconColor} />
              Like
            </VideoButton>
            <VideoButton
              type="button"
              onClick={this.onClickDisLike}
              active={isDisLiked}
            >
              <BiDislike size={15} color={disLikeIconColor} />
              DisLike
            </VideoButton>
            <VideoButton
              type="button"
              active={isVideoSaved}
              onClick={onClickSave}
            >
              <MdPlaylistAdd size={15} color={iconColor} />
              {saveButtonText}
            </VideoButton>
          </VideoButtonCard>
          <BreakLine />
          <ProfileContainer>
            <ProfileImage src={profileImageUrl} alt="channel logo" />
            <ProfileDetails>
              <ProfileName isDark={isDark}>{name}</ProfileName>
              <ProfileSubscriberCount isDark={isDark}>
                {subscriberCount} subscribers
              </ProfileSubscriberCount>
            </ProfileDetails>
          </ProfileContainer>
          <VideoDescription isDark={isDark}>{description}</VideoDescription>
        </VideoTextContent>
      </VideoCard>
    )
  }

  renderFailureView = () => <FailureView retryApiCall={this.getVideoDetails} />

  renderSpecifiedView = (
    isDark,
    savedVideosList,
    savedVideosDetailsList,
    addSavedVideo,
    deleteSavedVideo,
  ) => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.process:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderSuccessView(
          isDark,
          savedVideosList,
          savedVideosDetailsList,
          addSavedVideo,
          deleteSavedVideo,
        )
      case apiConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <ActiveThemeContext.Consumer>
        {value => {
          const {
            activeTheme,
            activeTab,
            changeActiveTab,
            tabsList,
            savedVideosList,
            savedVideosDetailsList,
            addSavedVideo,
            deleteSavedVideo,
          } = value
          const isDark = activeTheme === 'Dark'

          return (
            <>
              <Header />
              <VideoItemDetailsContainer>
                <SideBar
                  isDark={isDark}
                  activeTab={activeTab}
                  changeActiveTab={changeActiveTab}
                  tabsList={tabsList}
                />
                {this.renderSpecifiedView(
                  isDark,
                  savedVideosList,
                  savedVideosDetailsList,
                  addSavedVideo,
                  deleteSavedVideo,
                )}
              </VideoItemDetailsContainer>
            </>
          )
        }}
      </ActiveThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
