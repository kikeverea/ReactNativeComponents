import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from './text.component'
import colors from '../styles/colors'

const IconButton = ({style, textStyle, iconLeft, text, loading, press}) => {

  return (
    loading
    ? <View style={{ ...styles.container, ...style }}>
        <ActivityIndicator size='large' color={ colors.accent } />
      </View>
    : <TouchableOpacity style={{ ...styles.container, ...styles.buttonContainer, ...style, }} activeOpacity={ 0.6 } onPress={ press }>
        <View>
          { iconLeft && iconLeft }
        </View>
        <View style={ styles.labelContainer }>
          <Text style={{ ...styles.text, ...textStyle }}>{text}</Text>
        </View>
      </TouchableOpacity>
  )
  
}

export default IconButton;

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: colors.darkButton,     
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    
    textAlign: 'center',
    fontSize: 21,
  }
})