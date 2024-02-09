import { Platform, StyleSheet, View } from "react-native"

const Card = ({ style, children }) => {

  const shadow = Platform.OS === 'android' ? styles.shadowAndroid : styles.shadowIos

  return (
    <View style={[ style, shadow ]}>
      { children }
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  shadowAndroid: {
    elevation: 6
  },
  shadowIos: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
})