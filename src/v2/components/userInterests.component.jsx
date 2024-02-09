import { View, StyleSheet } from 'react-native'

import Interest from './interest.component'
import Banner from './banner.component'
import Text from './text.component'
import colors from '../styles/colors'

const UserInterests = ({ interests, selectedInterests, onInterestToggle }) => {
  
  return (
    <View>
      <Banner style={ styles.title } text={ 'INTERESES' }/>
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Text style={ styles.headerTitle }>ELIJE 5 OPCIONES</Text>
          <Text style={ styles.headerDescription }>(indica preferencias publicitarias)</Text>
        </View>
        { interests.map(interest =>
          <Interest
              key={ interest.id }
              interest={ interest }
              selected={ selectedInterests.find(selected => selected.id === interest.id) }
              onToggle={ onInterestToggle }
          />) }
      </View>
    </View>
  )
}

export default UserInterests

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: '4%'
  },
  title: {
    width: '100%'
  },
  header: {
    padding: 16
  },
  headerTitle: {
    textAlign: 'center',
    fontWeight: 'regular'
  },
  headerDescription: {
    textAlign: 'center',
    padding: 4,
    color: colors.textSecondary,
    fontStyle: 'italic'
  },
  interests: {
    width: '100%'
  }
})