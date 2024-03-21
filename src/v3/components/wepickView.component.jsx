import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native'

import defaultBackground from '../assets/img/background.jpg'
import colors from '../styles/colors'

const WepickView = ({ style, background, children, loading }) => {
  return (
    <ImageBackground source={ background || defaultBackground } style={[ style, styles.container ]} resizeMode='cover'>
      { loading
          ? <View style={ styles.loader }>
              <ActivityIndicator size='large' color={ colors.accent } />
            </View>
          : children }
    </ImageBackground>
  )
}

export default WepickView

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})