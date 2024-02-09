import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../styles/colors'
import Text from './text.component'

import stylesText from '../styles/text'

const buttonStyle = {
  padding: 16,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
}

const Button = ({text, press, style, textStyle, disabled}) => {

    return (
      disabled
        ? <View style={{...styles.container, ...styles.disabledStyle, ...style }}>
            <Text style={{ ...styles.text, ...styles.disabledText, ...textStyle }}>{text}</Text>
          </View>
        : <TouchableOpacity
            style={{ ...styles.container, ...styles.enabledStyle, ...style }}
            activeOpacity={ 0.6 }
            onPress={ press }
          >
            <Text style={{ ...styles.text, ...styles.enabledText, ...textStyle }}>{text}</Text>
          </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
    padding: 15,
    borderRadius: 6
  },
  enabledStyle: {
    backgroundColor: colors.accent
  },
  disabledStyle: {
    backgroundColor: 'grey'
  },
  text: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: stylesText.size.button,
    fontWeight: 'regular'
  },
  enabledText: {
    fontStyle: 'italic',
    color: colors.textButtons,
  },
  disabledText: {
    fontStyle: 'italic',
    color: colors.textButtonsDisabled,
  }
})