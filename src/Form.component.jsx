import { useState } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import colors from '../styles/colors'
import Button from './button.component'

const DefaultButton = ({ title, onPress, loading }) => {
  return (
    <Button
      loading={ loading }
      title={ title }
      onPress={ onPress }
    />
  )
}

const DefaultInput = ({ placeholder, value, error, onChangeText, autoCapitalize, isPassword, dismissError }) => {
  
  const changeText = text => {
    dismissError()
    onChangeText(text)
  }

  return (
    <View>
      <TextInput
        style={{
          borderColor: colors.primaryLight,
          borderBottomWidth: 0.5,
          padding: 8
        }}
        placeholder={ placeholder }
        placeholderTextColor={ colors.primaryLight }
        autoCapitalize={ autoCapitalize }
        secureTextEntry={ isPassword }
        value={ value }
        onChangeText={ changeText }
      />
      { error &&
        <Text style={{ paddingHorizontal: 8, paddingVertical: 4, color: colors.error }}>
          { error }
        </Text>
      }
    </View>
  )
}

const Form = ({
  style,
  fields,
  InputComponent=DefaultInput,
  ButtonComponent=DefaultButton,
  buttonLabel,
  onSubmit,
  loading
}) => {

  if (!onSubmit)
    throw new Error('You must provide an onSubmit prop to use this component')

  const fieldsState = fields.map(_field => useState(''))
  const fieldsErrors = fields.map(_field => useState(''))

  const submitForm = () => {

    let submit = true
    const result = {}
    
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      const value = fieldsState[i][0]             // [text, _setText]
      const error = field.validate && field.validate(value)
      
      if (error) {
        fieldsErrors[i][1](error)                 // [_error, setError]
        submit = false
      }

      result[field.name] = value
    }
    
    if (submit) {
      onSubmit(result)
    }
  }

  return (
    <View style={ style || styles.container }>
      <View style={ styles.inputContainer }>
        { fields.map((field, ind) =>
            <InputComponent
              key={ ind }
              label={ field.label }
              placeholder={ field.placeholder }
              isPassword={ field.isPassword }
              autoCapitalize={ field.autoCapitalize || 'none'}
              value={ fieldsState[ind][0] }                     // [text, _setText]
              onChangeText={ fieldsState[ind][1] }              // [_text, setText]
              error={ fieldsErrors[ind][0] }                    // [error, _setError]
              dismissError={ () => fieldsErrors[ind][1]('') }   // [_error, setError]
            />
        )}
      </View>
      <ButtonComponent title={ buttonLabel } loading={ loading } onPress={ submitForm } />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    padding: 8,
  },
  inputContainer: {
    paddingBottom: 48,
    gap: 24
  }
})

export default Form
