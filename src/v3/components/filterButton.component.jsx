import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import Text from './text.component'
import colors from '../styles/colors'
import text from '../styles/text'

import filterIcon from '../assets/icons/filter.png'

const FilterButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={ styles.container } onPress={ onPress }>
      <Image source={ filterIcon } style={ styles.icon } resizeMode='contain' />
      <Text style={ styles.label }>Filtrar</Text>
    </TouchableOpacity>
  )
}

export default FilterButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    gap: 6,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  icon: {
    width: 32,
    height: 32,
  },
  label: {
    color: colors.textButtons,
    fontSize: text.size.button
  },
})