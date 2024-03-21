import { useState } from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'

const DefaultButton = ({ onPress }) => {
  return (
    <Button
      title='SUBMIT'
      onPress={ onPress }
    />
  )
}

const Form = ({ style, fields, InputComponent=TextInput, ButtonComponent=DefaultButton, onSubmit }) => {

  if (!onSubmit)
    throw new Error('You must provide an onSubmit prop to use this component')

  const fieldsState = fields.map(_field => useState(''))
  const fieldsErrors = fields.map(_field => useState(''))

  const submitForm = () => {

    let submit = true
    const result = {}
    
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      const error = field.validate && field.validate()
      
      if (error) {
        fieldsErrors[i][1](error)                 // [_error, setError]
        submit = false
      }

      result[field.name] = fieldsState[i][0]      // [text, _setText]
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
              value={ fieldsState[ind][0] }                     // [text, _setText]
              onChangeText={ fieldsState[ind][1] }              // [_text, setText]
              error={ fieldsErrors[ind][0] }                    // [error, _setError]
              dismissError={ () => fieldsErrors[ind][1]('') }   // [_error, setError]
            />
        )}
      </View>
      <ButtonComponent onPress={ submitForm } />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  inputContainer: {
    paddingBottom: 8,
    gap: 16
  }
})

export default Form
