import {AiTwotoneFire} from 'react-icons/ai'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoItem from '../VideoItem'
import ActiveThemeContext from '../../context/ActiveThemeContext'
import {
  SavedVideosPage,
  SavedVideosPageContent,
  SavedVideosPageCard,
  SavedVideosPageHeader,
  SavedVideosIconCard,
  SavedVideosPageHeading,
  SearchResultsListCard,
  EmptySearchResultsCard,
  EmptySearchResultsImage,
  EmptySearchResultsHeading,
  EmptySearchResultsDescription,
} from './styledComponents'

const SavedVideosRoute = () => {
  const renderVideoCard = (isDark, savedVideosDetailsList) => (
    <SavedVideosPageCard data-testid="savedVideos" isDark={isDark}>
      <SavedVideosPageHeader isDark={isDark}>
        <SavedVideosIconCard isDark={isDark}>
          <AiTwotoneFire size={20} color="red" />
        </SavedVideosIconCard>
        <SavedVideosPageHeading isDark={isDark}>
          Trending
        </SavedVideosPageHeading>
      </SavedVideosPageHeader>
      {savedVideosDetailsList.length > 0 ? (
        <SearchResultsListCard>
          {savedVideosDetailsList.map(eachItem => (
            <VideoItem key={eachItem.id} videoDetails={eachItem} />
          ))}
        </SearchResultsListCard>
      ) : (
        <EmptySearchResultsCard>
          <EmptySearchResultsImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <EmptySearchResultsHeading>
            No saved videos found
          </EmptySearchResultsHeading>
          <EmptySearchResultsDescription>
            You can save your videos while watching them
          </EmptySearchResultsDescription>
        </EmptySearchResultsCard>
      )}
    </SavedVideosPageCard>
  )

  return (
    <ActiveThemeContext.Consumer>
      {value => {
        const {
          activeTheme,
          activeTab,
          changeActiveTab,
          tabsList,
          savedVideosDetailsList,
        } = value
        const isDark = activeTheme === 'Dark'

        return (
          <SavedVideosPage>
            <Header />
            <SavedVideosPageContent>
              <SideBar
                isDark={isDark}
                activeTab={activeTab}
                changeActiveTab={changeActiveTab}
                tabsList={tabsList}
              />
              {renderVideoCard(isDark, savedVideosDetailsList)}
            </SavedVideosPageContent>
          </SavedVideosPage>
        )
      }}
    </ActiveThemeContext.Consumer>
  )
}

export default SavedVideosRoute
