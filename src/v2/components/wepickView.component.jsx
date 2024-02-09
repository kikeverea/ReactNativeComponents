import { ImageBackground, StyleSheet } from 'react-native'

import background from '../assets/img/background.jpg'

const WepickView = ({ style, children }) => {
  return (
    <ImageBackground source={ background } style={[ style, styles.container ]} resizeMode='cover'>
      { children }
    </ImageBackground>
  )
}

export default WepickView

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})