import ActiveThemeContext from '../../context/ActiveThemeContext'
import {
  GameVideoItemCard,
  GameVideoItemCardImage,
  GameVideoItemText,
  GameVideoItemTitle,
  GameVideoItemViewCount,
} from './styledComponent'

const GameVideoItem = prop => {
  const {videoDetails} = prop
  const {thumbnailUrl, title, viewCount} = videoDetails

  return (
    <ActiveThemeContext.Consumer>
      {value => {
        const {activeTheme} = value
        const isDark = activeTheme === 'Dark'

        return (
          <GameVideoItemCard>
            <GameVideoItemCardImage src={thumbnailUrl} alt="video thumbnail" />
            <GameVideoItemText>
              <GameVideoItemTitle isDark={isDark}>{title}</GameVideoItemTitle>
              <GameVideoItemViewCount isDark={isDark}>
                {viewCount} watching world wide
              </GameVideoItemViewCount>
            </GameVideoItemText>
          </GameVideoItemCard>
        )
      }}
    </ActiveThemeContext.Consumer>
  )
}

export default GameVideoItem
