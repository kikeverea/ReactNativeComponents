import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'

import Text from './text.component'

const RADIO_BUTTON_SIZE = 16

const Interest = ({ interest, selected, onToggle }) => {
  
  const [showDescription, setShowDescription] = useState(false)
  
  const dotBackgroundColor = {
    backgroundColor: selected ? 'grey' : 'transparent'
  }

  const Content = ({ name, description, showDescription }) => {

    return (
      <View style={ styles.content }>
        <Text style={{ fontWeight: showDescription ? 'bold' : 'thin' }}>{ name }</Text>
        { showDescription && <Text>{ description }</Text> }
      </View>
    )
  }

  const SelectButton = () => {
    return (
      <TouchableOpacity
        style={ styles.dotContainer }
        activeOpacity={ 0.6 }
        onPress={ () => onToggle(interest.id, !selected) }
      >
        <View style={[ styles.dot, dotBackgroundColor ]} />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      style={{ borderRadius: 6 }}
      activeOpacity={ 0.6 }
      onPress={ () => setShowDescription(!showDescription) }
    >
      <View style={ styles.container }>
        <Content
          name={ interest.name }
          description={ interest.description }
          showDescription={ showDescription }
        />
        <SelectButton />
      </View>
    </TouchableOpacity>
  )
}

export default Interest

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    width: '100%'
  },
  content: {
    flex: 1,
    gap: 8,
    paddingEnd: 16
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6
  },
  dot: {
    width: RADIO_BUTTON_SIZE,
    height: RADIO_BUTTON_SIZE,
    borderRadius: RADIO_BUTTON_SIZE / 2,
    borderColor: 'grey',
    borderWidth: 2,
  },
})