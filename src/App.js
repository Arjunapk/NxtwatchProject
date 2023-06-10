import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ActiveThemeContext from './context/ActiveThemeContext'
import AppContainer from './styledComponent'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import HomeRoute from './components/HomeRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import './App.css'

const tabsListItems = [
  {id: 'HOME', displayText: 'Home', path: '/'},
  {id: 'GAMING', displayText: 'Gaming', path: '/gaming'},
  {id: 'TRENDING', displayText: 'Trending', path: '/trending'},
  {id: 'SAVED_VIDEOS', displayText: 'Saved videos', path: '/saved-videos'},
]

class App extends Component {
  state = {
    activeTheme: 'Light',
    activeTab: tabsListItems[0].id,
    tabsList: tabsListItems,
    savedVideosList: [],
    savedVideosDetailsList: [],
  }

  changeActiveTheme = () => {
    const {activeTheme} = this.state
    if (activeTheme === 'Light') {
      this.setState({activeTheme: 'Dark'})
    } else {
      this.setState({activeTheme: 'Light'})
    }
  }

  changeActiveTab = activeId => {
    this.setState({activeTab: activeId})
  }

  addSavedVideo = (id, videoDetails) => {
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, id],
      savedVideosDetailsList: [
        ...prevState.savedVideosDetailsList,
        videoDetails,
      ],
    }))
  }

  deleteSavedVideo = id => {
    const {savedVideosList, savedVideosDetailsList} = this.state
    const updateSavedVideosList = savedVideosList.filter(each => each !== id)
    const updateSavedVideosDetailsList = savedVideosDetailsList.filter(
      each => each.id !== id,
    )
    this.setState({
      savedVideosList: updateSavedVideosList,
      savedVideosDetailsList: updateSavedVideosDetailsList,
    })
  }

  render() {
    const {
      activeTheme,
      activeTab,
      tabsList,
      savedVideosList,
      savedVideosDetailsList,
    } = this.state
    const isDark = activeTheme === 'Dark'

    return (
      <ActiveThemeContext.Provider
        value={{
          activeTheme,
          changeTheme: this.changeActiveTheme,
          activeTab,
          changeActiveTab: this.changeActiveTab,
          tabsList,
          savedVideosList,
          savedVideosDetailsList,
          addSavedVideo: this.addSavedVideo,
          deleteSavedVideo: this.deleteSavedVideo,
        }}
      >
        <AppContainer isDark={isDark}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={HomeRoute} />
            <ProtectedRoute exact path="/trending" component={TrendingRoute} />
            <ProtectedRoute exact path="/gaming" component={GamingRoute} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideosRoute}
            />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route component={NotFound} />
          </Switch>
        </AppContainer>
      </ActiveThemeContext.Provider>
    )
  }
}

export default App
