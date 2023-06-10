import ActiveThemeContext from '../../context/ActiveThemeContext'
import {
  FailureViewCard,
  FailureViewCardImage,
  FailureViewCardHeading,
  FailureViewCardDescription,
  RetryButton,
} from './styledComponent'

const FailureView = props => {
  const {retryApiCall} = props
  const onClickRetryButton = () => {
    retryApiCall()
  }

  return (
    <ActiveThemeContext.Consumer>
      {value => {
        const {activeTheme} = value
        const isDark = activeTheme === 'DARK'
        const failureImage = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <FailureViewCard>
            <FailureViewCardImage src={failureImage} alt="failure view" />
            <FailureViewCardHeading>
              Oops! Something Went Wrong
            </FailureViewCardHeading>
            <FailureViewCardDescription>
              We are having some trouble to complete your request. Please try
              again.
            </FailureViewCardDescription>
            <RetryButton type="button" onClick={onClickRetryButton}>
              Retry
            </RetryButton>
          </FailureViewCard>
        )
      }}
    </ActiveThemeContext.Consumer>
  )
}

export default FailureView
