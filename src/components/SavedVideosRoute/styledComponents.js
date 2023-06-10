import styled from 'styled-components'

export const SavedVideosPage = styled.div`
  display: flex;
  flex-direction: column;
`

export const SavedVideosPageContent = styled.div`
  display: flex;
  margin: 15px 0;
  height: 90vh;
`

export const SavedVideosPageCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f1f5f9')};
`

export const SavedVideosPageHeader = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  background-color: ${prop => (prop.isDark ? '#181818' : '#f8fafc')};
`

export const SavedVideosIconCard = styled.div`
  padding: 10px 12px;
  border-radius: 50%;
  background-color: ${prop => (prop.isDark ? '#000000' : '#f1f5f9')};
`

export const SavedVideosPageHeading = styled.h3`
  font-size: 20px;
  font-family: Roboto;
  font-weight: bold;
  color: ${prop => (prop.isDark ? '#ffffff' : '#181818')};
  margin: 0 20px;
`

export const SearchResultsListCard = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 10px 0;
  overflow: auto;
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
