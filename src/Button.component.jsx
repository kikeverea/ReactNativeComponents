import { ActivityIndicator, StyleSheet, View } from 'react-native'
import colors from '../styles/colors'
import TouchableText from './touchableText.component'

const Button = ({ style, title, onPress, loading }) => {
  
  return (
    loading
      ? <View style={[ styles.button, style ]}>
          <ActivityIndicator size='large' color={ colors.primary } />
        </View>
      : <TouchableText
          text={ title }
          style={[ styles.button, style ]}
          textStyle={ styles.label }
          activeOpacity={ 0.7 }
          onPress={ onPress } />
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: colors.primaryDark,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    fontSize: 20,
    color: colors.primaryLight,
    textAlign: 'center'
  }
})