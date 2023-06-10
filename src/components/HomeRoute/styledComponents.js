import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
`

export const HomeContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  height: 90vh;
  overflow-y: auto;
  background-color: ${props => (props.isDark ? '#181818' : '#ffffff')};

  @media screen and (min-width: 768px) {
    width: 85%;
  }
`

export const HomeBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
`

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px 0 0;
`

export const BannerLogo = styled.img`
  width: 80px;
  margin: 0 0 15px 0;
  @media screen and (min-width: 768px) {
    width: 100px;
  }
`

export const BannerDescription = styled.p`
  font-family: Roboto;
  font-size: 12px;
  color: #1e293b;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`

export const BannerButton = styled.button`
  outline: none;
  background-color: transparent;
  border: 1px solid #1e293b;
  border-radius: 5px;
  font-family: Roboto;
  font-size: 10px;
  color: #1e293b;
  padding: 5px 10px;
  @media screen and (min-width: 768px) {
    font-size: 12px;
  }
`
export const BannerCloseButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
`

export const LoaderCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
`

export const HomePageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  background-color: ${props => (props.isDark ? '#181818' : '#ffffff')};
`

export const InputCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #1e293b;
  background-color: #fff;
  border-radius: 5px;
  width: 70%;
`

export const SearchInput = styled.input`
  background: transparent;
  outline: none;
  border: none;
  font-family: Roboto;
  font-size: 10px;
  color: #1e293b;
  padding: 10px;
  width: 100%;
`
export const SearchIconCard = styled.button`
  color: #1e293b;
  padding: 10px 15px;
  border: none;
  border-left: 1px solid #1e293b;
  outline: none;
  background-color: transparent;
`

export const SearchResultsListCard = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 10px 0;
`
export const EmptySearchResultsCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`
export const EmptySearchResultsImage = styled.img`
  width: 50%;
  margin: 0 0 20px 0;
`
export const EmptySearchResultsHeading = styled.h4`
  font-size: 20px;
  font-weight: bold;
  font-family: Roboto;
  color: ${props => (props.isDark ? '#ffffff' : '#1e293b')};
`
export const EmptySearchResultsDescription = styled.p`
  font-size: 15px;
  font-weight: bold;
  font-family: Roboto;
  color: ${props => (props.isDark ? '#ffffff' : '#1e293b')};
`
export const RetryButton = styled.button`
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #3b82f6;
  font-family: Roboto;
  font-weight: bold;
  color: #ffffff;
  font-size: 14px;
  margin: 20px 0;
`
