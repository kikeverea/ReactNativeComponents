import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Platform, Keyboard } from 'react-native';

import Input from '../../components/input.component';
import IconButton from '../../components/iconButton.component';
import useLogin from '../../hooks/useLogin';
import WepickAuthView from '../../components/wepickAuthView.component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Text from '../../components/text.component';
import text from '../../styles/text';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    
    const [login, waiting] = useLogin()

    const [hasKeyboard, setHasKeyboard] = useState(false)

    useEffect(() => {
      const { show, hide } =
        Platform.OS === 'android'
          ? { show: 'keyboardDidShow', hide: 'keyboardDidHide' }
          : { show: 'keyboardWillShow', hide: 'keyboardWillHide' }
  
      const showSubscription = Keyboard.addListener(show, () => setHasKeyboard(true))
      const hideSubscription = Keyboard.addListener(hide, () => setHasKeyboard(false))
  
      return () => {
        showSubscription.remove()
        hideSubscription.remove()
      }
    }, [])

    const sendLogin = () => {
      
      let valid = true

      if (!email) {
        valid = false
        setEmailError('Campo obligatorio')
      }
      
      if(!password) {
        valid = false
        setPasswordError('Campo obligatorio')
      }
      
      if (valid)
        login(email, password)
    }

    const containerPadding = { paddingVertical: hasKeyboard ? 0 : '30%' }

    return (
      <WepickAuthView allowGoBack >
        <View style={[ styles.container, containerPadding ]}>
          <KeyboardAwareScrollView>
            <View style={ styles.formContainer }>
              <View style={ styles.inputContainer }>
                <Input
                  text={ email }
                  error={ emailError }
                  hideError={ () => setEmailError('')}
                  inputMode='email'
                  autoCapitalize='none'
                  autoComplete='email'
                  change={ setEmail }
                  placeholder={'Email'}
                />
                <Input
                  text={ password }
                  error={ passwordError }
                  hideError={ () => setPasswordError('')}
                  isPassword
                  autoCapitalize='none'
                  change={ setPassword }
                  placeholder={'Contraseña'}
                />
                 <TouchableOpacity
                  activeOpacity={ 0.7 }
                  onPress={ () => navigation.navigate('recover_password') }
                >
                  <Text style={ styles.forgotPassword }>He olvidado mi contraseña</Text>
                </TouchableOpacity>
              </View>
              <View style={ styles.buttonsContainer }>
                <IconButton
                  text={'Login'}
                  style={ styles.button }
                  iconLeft={<Image style={ styles.buttonIcon } source={require('../../assets/img/enter.png')}/>}
                  loading={ waiting }
                  press={ sendLogin }
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </WepickAuthView>
    )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    paddingHorizontal: '8%',
  },
  formContainer: {
    gap: 16
  },
  inputContainer: {
    width: '100%',
  },
  buttonsContainer: {
    alignItems: 'center'
  },
  button: {
    width: '60%',
  },
  buttonIcon: {
    width: 20,
    height: 20
  },
  forgotPassword: {
    padding: 12,
    fontSize: text.size.header,
    fontWeight: 'regular',
    alignSelf: 'flex-end'
  }
})