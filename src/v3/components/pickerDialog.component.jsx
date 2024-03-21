import WepickDialog from './wepickDialog.component'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from './text.component'

const PickerDialog = ({ visible, title, options, onOptionSelected, dismissDialog }) => {

  const selectOption = option => {
    onOptionSelected(option)
    dismissDialog()
  }

  const renderContent = () => {
    return (
      <View>
        { options.map(option =>
            <TouchableOpacity
              style={ styles.option }
              key={ option.id }
              activeOpacity={ 0.6 }
              onPress={ () => selectOption(option) }
            >
            <Text>{ option.name }</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <WepickDialog
      visible={visible}
      title={ title }
      content={ renderContent() }
      onClose={ dismissDialog }
    >
    </WepickDialog>
  )
}

export default PickerDialog

const styles = StyleSheet.create({
  option: {
    padding: 16,
    alignItems: 'center'
  }
})