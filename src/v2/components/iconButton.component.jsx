import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from './text.component'
import colors from '../styles/colors';

const IconButton = ({style, iconLeft, text, loading, press}) => {

  return (
    loading
    ? <View style={[ style, styles.container ]}>
        <ActivityIndicator size='large' color={ colors.accent } />
      </View>
    : <TouchableOpacity style={[style, styles.container, styles.buttonContainer ]} activeOpacity={ 0.6 } onPress={ press }>
      <View>
        { iconLeft && iconLeft }
      </View>
      <Text style={styles.text}>{text}</Text>
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
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 21,
  }
})