import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable } from 'react-native'

import colors from '../styles/colors';
import textStyles from '../styles/text';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from './text.component';

const Input = ({
  text,
  error,
  hideError,
  placeholder,
  change,
  isPassword,
  textSize=textStyles.size.button,
  autoCapitalize='words',
  autoComplete='off',
  inputMode='text'
}) => {
    
  const [showPassword, setShowPassword] = useState(false)

  const handleChangeText = value => {
    hideError && hideError()
    change(value)
  }

  return (
    <View style={ styles.container }>
      <TextInput
        onFocus={ hideError }
        value={ text }
        inputMode={ inputMode }
        autoCapitalize={ autoCapitalize }
        autoComplete={ autoComplete }
        secureTextEntry={ isPassword && !showPassword }
        style={[styles.input, { fontSize: textSize }]}
        placeholder={placeholder}
        placeholderTextColor={colors.accent}
        onChangeText={ handleChangeText }
      />
      { isPassword && <ButtonShowPassword showPassword={ showPassword } onShowPasswordChange={ setShowPassword }/> }
      { error && <Text style={ styles.error }>{ error }</Text> }
    </View>
  )
}

export default Input;

const ButtonShowPassword = ({ showPassword, onShowPasswordChange }) => {

  const iconName = showPassword ? 'eye-outline' : 'eye-off-outline'

  return (
    <Pressable onPress={() => onShowPasswordChange(!showPassword) } style={ styles.showPasswordButton } >
      <Icon name={ iconName } color={ colors.accent } size={ 22 }/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 15,
    },
    input: {
      width: '100%',
      color: colors.accent,
      backgroundColor: colors.darkButton,
      paddingVertical: 15,
      paddingHorizontal: 22,
      borderRadius: 10,
      fontFamily: 'Aero Matics Italic',
    },
    showPasswordButton: {
      position: 'absolute',
      height: '100%',
      justifyContent: 'center',
      right: 0,
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    error: {
      padding: 8,
      color: colors.error,
    }
})