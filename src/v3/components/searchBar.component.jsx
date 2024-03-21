import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import colors from '../styles/colors'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SearchBar = ({ text, placeholder, onTextChange, cancelSearch }) => {
  return (
    <View style={ styles.container }>
      <Icon name='magnify' size={ 24 } color={ colors.accent } />
      <TextInput
        value={ text }
        style={ styles.input }
        placeholder={ placeholder }
        placeholderTextColor={ colors.accent }
        onChangeText={ onTextChange }
      />
      <TouchableOpacity
        style={ styles.closeButton }
        activeOpacity={ 0.6 }
        onPress={ cancelSearch }
      >
        <View>
          { text && <Icon name='close' size={ 24 } color={ colors.accent } /> }
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.accent
  },
  input: {
    flex: 1,
    paddingLeft: 8,
    color: colors.accent
  }
})