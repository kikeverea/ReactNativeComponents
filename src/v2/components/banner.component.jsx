import { StyleSheet, View } from 'react-native'
import colors from '../styles/colors'
import text from '../styles/text'

import Text from './text.component'

const Banner = ({ text, style }) => {
 return (
  <View style={[ styles.container, style ]}>
    <Text style={ styles.text }>
      { text }
    </Text>
  </View>
 )
}

export default Banner

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.primary,
    borderTopColor: colors.white,
    borderBottomColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  text: {
    color: colors.textPrimary,
    fontSize: text.size.title,
    textAlign: 'center'
  }
})