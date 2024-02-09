import { StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from './text.component'
import colors from '../styles/colors'
import { useState } from 'react'
import text from '../styles/text'

const FilterItem = ({ name, selected, onPressed }) => {
  
  const [checked, setChecked] = useState(selected)

  const handlePress = () => {
    setChecked(!checked)
    onPressed(!checked)
  }

  return (
    <TouchableOpacity
      style={ styles.container }
      activeOpacity={ 0.6 }
      onPress={ handlePress }
    >
      <Text style={ styles.label }>{ name }</Text>
      { checked && <Icon name='check' size={ 24 } color={ colors.accent }/> }
    </TouchableOpacity>
  )
}

export default FilterItem

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  label: {
    fontSize: text.size.label
  }
})