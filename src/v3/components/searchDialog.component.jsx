import WepickDialog from './wepickDialog.component'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from './text.component'
import SearchBar from './searchBar.component'
import { useState } from 'react'

const SearchDialog = ({ visible, title, options, onOptionSelected, dismissDialog, placeholder, width='70%' }) => {

  const [availableOptions, setAvailableOptions] = useState(options)
  const [search, setSearch] = useState('')

  const selectOption = option => {
    onOptionSelected(option)
    dismissDialog()
  }

  const refreshSearch = search => {
    setSearch(search)
    setAvailableOptions(search
      ? availableOptions.filter(option => option.name.toLowerCase().startsWith(search))
      : options)
  }

  const renderContent = () => {
    return (
      <View>
        <SearchBar
          placeholder={ placeholder }
          text={ search }
          onTextChange={ refreshSearch }
          cancelSearch={ () => refreshSearch('') }
        />
        { availableOptions.map(option =>
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
      width={ width }
      content={ renderContent() }
      onClose={ dismissDialog }
    >
    </WepickDialog>
  )
}

export default SearchDialog

const styles = StyleSheet.create({
  option: {
    padding: 16,
    alignItems: 'center'
  }
})