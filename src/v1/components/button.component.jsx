import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../styles/colors'
import Text from './text.component'

export const ButtonThemes = {
  primary: 'PRIMARY',
  dark: 'DARK',
  secondary: 'SECONDARY'
}

const Button = ({ style, text, icon, theme=ButtonThemes.primary, press }) => {

    const { containerStyle, textStyle } = resolveContainerStyle(theme)

    return (
        <TouchableOpacity style={[style, styles.container, containerStyle ]} activeOpacity={0.7} onPress={press}>
            { icon && icon }
            <Text style={ textStyle }>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button;

const resolveContainerStyle = (theme) => {
  let containerStyle
  let fontWeight = 'black'
  let fontSize = 20

  switch (theme) {
    case ButtonThemes.dark :
      containerStyle = styles.containerDark
      break;
    case ButtonThemes.secondary :
      fontWeight = 'regular'
      fontSize = 13
      containerStyle = styles.containerSecondary
      break;
    default :
      containerStyle = styles.containerPrimary
      break;
  }

  return { containerStyle, textStyle: { color: '#FFFFFF', fontWeight, fontSize } }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16,
      alignItems: 'center',
      width: '100%',
      height: 60,
      borderRadius: 30
  },
  containerPrimary: {
      backgroundColor: colors.primary,
  },
  containerDark: {
    backgroundColor: colors.primaryDark,
  },
  containerSecondary: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  textPrimary: {
      color: '#FFFFFF'
  }
})