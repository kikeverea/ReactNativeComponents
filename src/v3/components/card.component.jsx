import { Platform, StyleSheet, TouchableOpacity } from "react-native"

const Card = ({ style, children, press }) => {

  const shadow = Platform.OS === 'android' ? styles.shadowAndroid : styles.shadowIos

  return (
    <TouchableOpacity style={[ style, shadow ]} activeOpacity={press ? 0.7 : 1} onPress={press}>
      { children }
    </TouchableOpacity>
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