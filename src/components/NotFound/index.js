import Header from '../Header'
import SideBar from '../SideBar'
import ActiveThemeContext from '../../context/ActiveThemeContext'
import {
  NotFoundContainer,
  NotFoundCard,
  NotFoundCardImage,
  NotFoundCardHeading,
  NotFoundCardDescription,
} from './styledComponent'

const NotFound = () => (
  <ActiveThemeContext.Consumer>
    {value => {
      const {activeTheme, activeTab, changeActiveTab, tabsList} = value
      const isDark = activeTheme === 'Dark'
      const notFoundImage = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <>
          <Header />
          <NotFoundContainer>
            <SideBar
              isDark={isDark}
              activeTab={activeTab}
              changeActiveTab={changeActiveTab}
              tabsList={tabsList}
            />
            <NotFoundCard>
              <NotFoundCardImage src={notFoundImage} alt="not found" />
              <NotFoundCardHeading>Page Not Found</NotFoundCardHeading>
              <NotFoundCardDescription>
                we are sorry, the page you requested could not be found
              </NotFoundCardDescription>
            </NotFoundCard>
          </NotFoundContainer>
        </>
      )
    }}
  </ActiveThemeContext.Consumer>
)

export default NotFound
