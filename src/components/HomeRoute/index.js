import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdClose} from 'react-icons/io'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoItem from '../VideoItem'
import FailureView from '../FailureView'
import ActiveThemeContext from '../../context/ActiveThemeContext'
import {
  HomeContainer,
  HomeContainerContent,
  HomeBanner,
  BannerContent,
  BannerLogo,
  BannerDescription,
  BannerButton,
  BannerCloseButton,
  LoaderCard,
  HomePageContent,
  InputCard,
  SearchInput,
  SearchIconCard,
  SearchResultsListCard,
  EmptySearchResultsCard,
  EmptySearchResultsImage,
  EmptySearchResultsHeading,
  EmptySearchResultsDescription,
  RetryButton,
} from './styledComponents'

const apiConstants = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {
    showBanner: true,
    searchInput: '',
    searchResults: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount = () => {
    this.getSearchResults()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getSearchResults()
  }

  onSuccessApi = videosList => {
    this.setState({apiStatus: apiConstants.success, searchResults: videosList})
  }

  onFailureApi = () => {
    this.setState({apiStatus: apiConstants.failure})
  }

  getSearchResults = async () => {
    this.setState({apiStatus: apiConstants.process})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.videos.map(eachVideo => ({
      channel: {
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      },
      id: eachVideo.id,
      publishedAt: eachVideo.published_at,
      thumbnailUrl: eachVideo.thumbnail_url,
      title: eachVideo.title,
      viewCount: eachVideo.view_count,
    }))

    if (response.ok === true) {
      this.onSuccessApi(updatedData)
    } else {
      this.onFailureApi()
    }
  }

  onClickRetry = () => {
    this.setState({searchInput: ''}, this.getSearchResults)
  }

  removeHomeBanner = () => {
    this.setState({showBanner: false})
  }

  renderBanner = () => (
    <HomeBanner data-testid="banner">
      <BannerContent>
        <BannerLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <BannerDescription>
          Buy Nxt Watch Premium prepaid plans with UPI
        </BannerDescription>
        <BannerButton type="button">GET IT NOW</BannerButton>
      </BannerContent>
      <BannerCloseButton
        type="button"
        data-testid="close"
        onClick={this.removeHomeBanner}
      >
        <IoMdClose size={20} />
      </BannerCloseButton>
    </HomeBanner>
  )

  renderLoadingView = () => (
    <LoaderCard data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </LoaderCard>
  )

  renderSuccessView = () => {
    const {searchResults} = this.state
    return (
      <>
        {searchResults.length > 0 ? (
          <SearchResultsListCard>
            {searchResults.map(eachItem => (
              <VideoItem key={eachItem.id} videoDetails={eachItem} />
            ))}
          </SearchResultsListCard>
        ) : (
          <EmptySearchResultsCard>
            <EmptySearchResultsImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <EmptySearchResultsHeading>
              No Search results found
            </EmptySearchResultsHeading>
            <EmptySearchResultsDescription>
              Try different key words or remove search filter
            </EmptySearchResultsDescription>
            <RetryButton type="button" onClick={this.onClickRetry}>
              Retry
            </RetryButton>
          </EmptySearchResultsCard>
        )}
      </>
    )
  }

  renderFailureView = () => <FailureView retryApiCall={this.onClickRetry} />

  renderSpecifiedView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.process:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderHomePageContent = isDark => {
    const {searchInput} = this.state

    return (
      <HomePageContent isDark={isDark}>
        <InputCard>
          <SearchInput
            type="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            placeholder="Search"
          />
          <SearchIconCard
            data-testis="searchButton"
            onClick={this.onClickSearchButton}
          >
            <BsSearch size={20} />
          </SearchIconCard>
        </InputCard>
        {this.renderSpecifiedView()}
      </HomePageContent>
    )
  }

  render() {
    const {showBanner} = this.state

    return (
      <ActiveThemeContext.Consumer>
        {value => {
          const {activeTheme, activeTab, changeActiveTab, tabsList} = value
          const isDark = activeTheme === 'Dark'

          return (
            <>
              <Header />
              <HomeContainer>
                <SideBar
                  isDark={isDark}
                  activeTab={activeTab}
                  changeActiveTab={changeActiveTab}
                  tabsList={tabsList}
                />
                <HomeContainerContent data-testid="home" isDark={isDark}>
                  {showBanner && this.renderBanner()}
                  {this.renderHomePageContent(isDark)}
                </HomeContainerContent>
              </HomeContainer>
            </>
          )
        }}
      </ActiveThemeContext.Consumer>
    )
  }
}

export default HomeRoute
