import React from 'react'

const ActiveThemeContext = React.createContext({
  activeTheme: 'Light',
  changeTheme: () => {},
  activeTab: 'HOME',
  changeActiveTab: () => {},
  tabsList: [],
  savedVideosList: [],
  savedVideosDetailsList: [],
  addSavedVideo: () => {},
  deleteSavedVideo: () => {},
})

export default ActiveThemeContext
