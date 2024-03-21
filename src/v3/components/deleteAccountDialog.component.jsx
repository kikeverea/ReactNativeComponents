import { useState, useEffect } from 'react'
import colors from '../styles/colors'
import WepickDialog from './wepickDialog.component'
import Text from './text.component'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import text from '../styles/text'

const DeleteAccountDialog = ({ onClose }) => {
  
  const [waitTime, setWaitTime] = useState(5)

  // timer
  useEffect(() => {
    setTimeout(() => {
      const time = waitTime - 1

      if (time >= 0)
        setWaitTime(time) 
    },
    1000)
  },
  [waitTime])

  const waitTimeLabel = ` (${waitTime})`

  const renderContent = () => {
    return (
      <View style={ styles.container }>
       
        <View style={ styles.contentContainer }>
          <Text style={ styles.textStyle }>
            ¿Estás seguro que deseas eliminar tu cuenta?
          </Text>
          <Text style={ styles.textStyle }>
            Toda tu experiencia y iCoals serán eliminados
            y no podrán ser recuperados
          </Text>
          <Text style={{ ...styles.textStyle, fontWeight: 'regular', paddingTop: 4 }}>
            Esta operación no es reversible
          </Text>
        </View>
        
        <View style={ styles.buttonsContainer }>
          <TouchableOpacity
            activeOpacity={ 0.6 }
            style={ styles.button }
            onPress={ () => onClose(false) }
          >
            <Text style={styles.buttonLabel}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={ 0.6 }
            style={[ styles.button, { backgroundColor: waitTime > 0 ? colors.error : colors.accentDark }]}
            onPress={ () => onClose(false) }
            disabled={ waitTime > 0 }
          >
            <Text style={{ textAlign: 'center' }}>
              {`Eliminar Cuenta${ waitTime > 0 ? waitTimeLabel : ''}`}
            </Text>

          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <WepickDialog
      visible={ true }
      title='ELIMINAR CUENTA'
      width='85%'
      content={ renderContent() }
      onClose={ () => onClose(false) }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  contentContainer: {
    gap: 10
  },
  textStyle: {
    fontSize: text.size.header,
    lineHeight: 22,
    textAlign: 'center'
  },
  buttonsContainer : {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 8,
    justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
    marginTop: 16,
    backgroundColor: colors.accentDark,
  },
  buttonLabel: {
    textAlign: 'center',
  },
})

export default DeleteAccountDialog