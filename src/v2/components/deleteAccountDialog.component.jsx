import Dialog from 'react-native-dialog'
import { useState, useEffect } from 'react'
import colors from '../styles/colors'

const DeleteUserDialog = ({ dismiss }) => {
  
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

  const deleteColor = waitTime > 0 ? '#CC6666' : colors.critical
  const disabled = waitTime > 0

  return (
    <Dialog.Container visible={ true }>
      <Dialog.Title>Eliminar Cuenta</Dialog.Title>
      <Dialog.Description>Esta operación NO es reversible. ¿Deseas continuar?</Dialog.Description>
      <Dialog.Button
        label="Cancelar"
        onPress={() => dismiss(false)}
      />
      <Dialog.Button
        disabled={ disabled }
        color={ deleteColor }
        label={ `Eliminar ${ waitTime > 0 ? '(' + waitTime + ')' : '' }` }
        onPress={() => dismiss(true)}
      />
    </Dialog.Container>
    )
}

export default DeleteUserDialog