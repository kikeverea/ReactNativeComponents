import { useState } from 'react'
import colors from '../styles/colors'
import Input from './input.component'
import WepickDialog from './wepickDialog.component'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InputDialog = ({ title, initialText='', validation, placeholder, onClose }) => {
    const [text, setText] = useState(initialText)
    const [error, setError] = useState('')

    const closeDialog = () => {
      const error = validation(text)

      if (error)
        setError(error)
      else
        onClose(text)
    }

    return (
        <WepickDialog
          visible={ true }
          title={ title }
          width='90%'
          content={ 
            <Input
                text={ text }
                textSize={ 16 }
                error={ error }
                hideError={ () => setError('') }
                autoCapitalize='characters'
                change={ setText }
                placeholder={placeholder}
            />
           }
          buttons={ [{ label: 'ACEPTAR', action: closeDialog }] }
          closeButton='default'
          onClose={ () => onClose('') }
        />
    )
}

export default InputDialog