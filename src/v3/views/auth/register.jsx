import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Input from '../../components/input.component';
import useLogin from '../../hooks/useLogin'
import { register } from '../../services/auth.service';
import WepickAuthView from '../../components/wepickAuthView.component';
import IconButton from '../../components/iconButton.component';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../styles/colors';

import {
  validateNick,
  validateName,
  validateEmail,
  validatePassword,
  validateCode,
}
from '../../helpers/register.helper'

const Register = () => {

    const [email, setEmail] = useState('')
    const [nick, setNick] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [friendlyCode, setFriendlyCode] = useState('')

    const [emailError, setEmailError] = useState('')
    const [nickError, setNickError] = useState('')
    const [nameError, setNameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [friendlyCodeError, setFriendlyCodeError] = useState('')

    const [login, waiting] = useLogin()

    const sendRegister = async () => {
      try {

        const emailValidation = await validateEmail(email)
        const nickValidation = await validateNick(nick)
        const nameValidation = validateName(name)
        const lastnameValidation = validateName(lastname)
        const passwordValidation = validatePassword(password)
        const friendlyCodeValidation = await validateCode(friendlyCode)
        
        if (
          emailValidation.valid &&
          nickValidation.valid &&
          nameValidation.valid &&
          lastnameValidation&&
          passwordValidation.valid &&
          friendlyCodeValidation.valid
        ) {
          
          const res = await register(email, nick, name, lastname, password, friendlyCode)

          if (res.status === 201)
            await login(email, password)
        }
        else {
          setEmailError(emailValidation.error)
          setNickError(nickValidation.error)
          setNameError(nameValidation.error)
          setLastnameError(lastnameValidation.error)
          setPasswordError(passwordValidation.error)
          setFriendlyCodeError(friendlyCodeValidation.error)
        }
      }
      catch (e) {
        console.error('Register failed', e)
      }
    }

    return (
        <WepickAuthView allowGoBack >
          <View style={ styles.container }>
            <View style={ styles.inputContainer }>
              <Input
                text={ email }
                error={ emailError }
                inputMode='email'
                autoCapitalize='none'
                autoComplete='email'
                hideError={ () => setEmailError('') }
                change={ setEmail }
                placeholder={'Email'}
              />
              <Input
                  text={ nick }
                  error={ nickError }
                  hideError={ () => setNickError('') }
                  change={ setNick }
                  placeholder={'Nick'}
              />
              <Input
                  text={ name }
                  error={ nameError }
                  hideError={ () => setNameError('') }
                  change={ setName }
                  placeholder={'Nombre'}
              />
              <Input
                  text={ password }
                  error={ passwordError }
                  hideError={ () => setPasswordError('') }
                  isPassword
                  autoCapitalize='none'
                  change={ setPassword }
                  placeholder={'Contraseña'}
              />
              <Input
                text={ friendlyCode }
                error={ friendlyCodeError }
                hideError={ () => setFriendlyCodeError('') }
                change={ setFriendlyCode }
                placeholder={'Código amigo'}
              />
            </View>
            <IconButton
              text={'CREAR CUENTA'}
              style={ styles.button }
              iconLeft={ <Icon name='plus' color={ colors.accent } size={ 28 }/> }
              loading={ waiting }
              press={ sendRegister }
            />
          </View>
        </WepickAuthView>
    )
}

export default Register;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingVertical: '4%',
    paddingHorizontal: '8%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  button: {
    width: '80%'
  }
})