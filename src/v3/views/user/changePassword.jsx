import { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet } from 'react-native'
import Button from '../../components/button.component'
import WepickView from '../../components/wepickView.component'
import Input from '../../components/input.component'
import useRequireAuth from '../../hooks/useRequireAuth'

import background from '../../assets/img/auth_background.jpg'

const ChangePassword = () => {
  
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [hasKeyboard, setHasKeyboard] = useState(false)
  
  const authFailed = useRequireAuth()

  useEffect(() => {
    const { show, hide } =
      Platform.OS === 'android'
      ? { show: 'keyboardDidShow', hide: 'keyboardDidHide' }
      : { show: 'keyboardWillShow', hide: 'keyboardWillHide' }

    const showSubscription = Keyboard.addListener(show, () => {
      setHasKeyboard(true)
    })
    
    const hideSubscription = Keyboard.addListener(hide, () => {
      setHasKeyboard(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const send = async () => {

    if (email) {
      const result = await sendRecoverPassword(email, authFailed)
      
      if (result.success) {
        console.log('La se ha enviado correctamente')
      }
      else {
        console.log('No se ha podido enviar la invitación')
      }
    }
    else {
      setEmailError('Campo obligatorio')
    }
  }

  return (
    <WepickView style={ styles.container } background={ background }>
      <KeyboardAvoidingView style={{ flex: 1 }} >
        <Pressable
          style={ styles.inputContainer }
          onPress={ () => Keyboard.dismiss() }
        >
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
        </Pressable>
      </KeyboardAvoidingView>
      { !hasKeyboard &&
        <Button
          style={{ width: '100%' }}
          text='Enviar Solicitud'
          press={ () => send() } />
      }
    </WepickView>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '8%',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center'
  }
})