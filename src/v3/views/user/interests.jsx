import { View, StyleSheet, ScrollView } from 'react-native'

import Interest from '../../components/interest.component'
import Text from '../../components/text.component'
import colors from '../../styles/colors'
import useRequireAuth from '../../hooks/useRequireAuth'
import { MAX_INTERESTS, MIN_INTERESTS } from '../../helpers/validateProfile'
import { me, getInterests, getDaysLeftToEditInterests, selectInterest, unselectInterest } from '../../services/user.service'
import { useEffect, useState } from 'react'
import WepickView from '../../components/wepickView.component'
import text from '../../styles/text'

import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message'

const UserInterests = () => {

  const [loading, setLoading] = useState(true)
  const [interests, setInterests] = useState([])
  const [selectedInterests, setSelectedInterests] = useState([])

  const [daysLeftToEdit, setDaysLeftToEdit] = useState(false)

  const authFailed = useRequireAuth()

  useEffect(() => {
    
    const init = async () => {
      const user = await me(authFailed)
      const interests = await getInterests(authFailed)
      const daysLeftToEdit = await getDaysLeftToEditInterests(authFailed)

      setInterests(interests)
      setDaysLeftToEdit(daysLeftToEdit)
      setSelectedInterests(user.interests)

      setLoading(false)
    }
    
    init()
  },
  [])

  const handleInterestToggle = async (interestId, selected) => {
    if (selected)
      select(interestId)
    else
      unselect(interestId)
  }

  const select = (selectedId) => {

    if (selectedInterests.length >= MAX_INTERESTS)
      showWarning(`Solo los primeros ${MAX_INTERESTS} intereses serán tomados en cuenta`)
    
    setSelectedInterests(selectedInterests.concat(interests.filter(interest => interest.id === selectedId)))
    selectInterest(selectedId, authFailed)
  }

  const unselect = (interestId) => {

    if (selectedInterests.length <= MIN_INTERESTS)
      showWarning(`Debes tener al menos ${MIN_INTERESTS} intereses para visualizar vídeos`)
    
    setSelectedInterests(selectedInterests.filter(selected => selected.id !== interestId))
    unselectInterest(interestId, authFailed)
  }

  const saveInterests = async () => {

    const edited = await saveInterests(selectInterest, authFailed)

    if (edited.success) {
      Toast.show({
        type: 'success',
        text1: 'Cambios guardados correctamente',
        position: 'bottom',
        visibilityTime: 3000
      })

      setDaysLeftToEdit(90)
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'No se ha podido guardar los cambios',
        position: 'bottom',
        visibilityTime: 3000
      })
    }
  }

  const showWarning = warning => {
    Toast.show({
      type: 'warning',
      text1: warning,
      position: 'bottom',
      visibilityTime: 3000
    })
  }

  const editingEnabled = daysLeftToEdit === 0
  
  return (
    <WepickView style={ styles.container } loading={ loading }>
      <View style={ styles.header }>
        <Text style={ styles.headerTitle }>ELIJE ENTRE 5 Y 10 OPCIONES</Text>
      </View>
      <ScrollView style={{ flex: 1 }} indicatorStyle='white'>
        { !editingEnabled &&
            <View style={ styles.warningContainer }>
              <Icon name='warning' style={ styles.warningIcon } size={ 50 } color={ colors.accent } />
              <Text style={ styles.warning }>Has editado tus intereses recientemente.</Text>
              <Text style={ styles.warning }>{`Debes esperar ${daysLeftToEdit} días para volver a hacerlo`}</Text>
            </View>
        }
        <View style={{ paddingHorizontal: '4%', }}>
          { interests.map(interest =>
            <Interest
              key={ interest.id }
              interest={ interest }
              editable={ interest.name !== 'Genérico'}
              selected={ interest.name === 'Genérico' || selectedInterests.find(selected => selected.id === interest.id) }
              onToggle={ handleInterestToggle }
            />)
          }
        </View>
      </ScrollView>
      {/*<Button
        text='GUARDAR CAMBIOS'
        style={ styles.deleteButton }
        disabled={ !editingEnabled }
        press={ saveInterests }
        />*/}
    </WepickView>
  )
}

export default UserInterests

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16
  },
  header: {
    padding: 16
  },
  headerTitle: {
    fontSize: text.size.header,
    textAlign: 'center',
    fontWeight: 'regular'
  },
  headerDescription: {
    fontSize: text.size.header,
    textAlign: 'center',
    padding: 4,
    color: colors.textSecondary,
    fontStyle: 'italic'
  },
  warningContainer: {
    paddingHorizontal: '4%',
    marginHorizontal: '4%',
    alignItems: 'center',
    gap: 4,
    marginVertical: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.accent
  },
  warningIcon: {
    paddingBottom: 4
  },
  warning: {
    fontSize: text.size.button,
    textAlign: 'center'
  },
  deleteButton: {
    width: 220,
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30
  }
})