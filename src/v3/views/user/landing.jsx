import { StyleSheet, TouchableHighlight, View } from 'react-native'
import colors from '../../styles/colors'
import Text from '../../components/text.component'
import text from '../../styles/text'
import Button from '../../components/button.component'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import useLogout from '../../hooks/useLogout'
import { useEffect, useState } from 'react'
import { me } from '../../services/user.service'
import { validateUserProfile } from '../../helpers/validateProfile'
import { useNavigationState } from '@react-navigation/native'
import WepickView from '../../components/wepickView.component'
import DeleteAccountDialog from '../../components/deleteAccountDialog.component'
import AlertDialog from '../../components/alertDialog.component'

const UserLanding = ({ navigation }) => {

  const logout = useLogout()
  
  const [missingProfileFields, setMissingProfileFields] = useState(false)
  const [missingInterests, setMissingInterests] = useState(false)
  
  const [showLogoutDialog, setShowLogoutDialog] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(null)

  const navigationStack = useNavigationState(state => state.routes)

  useEffect(() => {
    
    const validateProfile = async () => {
      
      const userProfile = await me()
      const missingFields = validateUserProfile(userProfile)
  
      if (missingFields.length > 0) {
        const isMissingInterests = missingFields.includes('interests') 
        const isMissingFields = isMissingInterests ? missingFields.length > 1 : true
  
        setMissingProfileFields(isMissingFields)
        setMissingInterests(isMissingInterests)
      }
    }

    if (navigationStack[navigationStack.length -1]?.name === 'user_landing')
      validateProfile()

    return () => {
      setMissingProfileFields(false)
      setMissingInterests(false)
    }
  },
  [navigationStack])

  const dismissDeleteDialog = choice => {
    setShowDeleteDialog(false)
  }
  
  const renderItem = (name, navigate, warning) => {
    return (
      <TouchableHighlight
        underlayColor={ colors.primaryLight }
        onPress={ navigate }
      >
        <View style={ styles.item }>
          <Text style={ styles.itemLabel }>{ name }</Text>
          { warning
            ? <Icon
                name='exclamation-thick'
                size={ 14 }
                color={ colors.primaryDark }
                style={ styles.roundshape } />
            : <Icon
                name='menu-right'
                size={ 24 }
                color={ colors.accent } />
          }
        </View>
      </TouchableHighlight>
    )
  }
  
  return (
    <WepickView style={ styles.container }>
      <View style={ styles.itemsContainer }>
        { renderItem ('Cuenta', () => navigation.navigate('profile'), missingProfileFields )}
        { renderItem ('Intereses', () => navigation.navigate('interests'), missingInterests ) }
        { renderItem ('Cambiar Contraseña', () => navigation.navigate('change_password')) }
        { renderItem ('Invitar a un amigo', () => navigation.navigate('invite_friend')) }
        { renderItem ('Términos y Condiciones', () => navigation.navigate('terms_and_conditions')) }
      </View>
      <View style={{ gap: 16 }}>
        <Button
          text='Cerrar sesión'
          style={{ ...styles.button, ...styles.logout }}
          textStyle={{ color: colors.white }}
          press={ () => setShowLogoutDialog(true) }
        />
        <Button
          text='Eliminar Cuenta'
          style={{ ...styles.button, ...styles.delete }}
          textStyle={{ color: colors.white }}
          press={ () => setShowDeleteDialog(true) }
        />
      </View>
      { showLogoutDialog &&
        <AlertDialog
          info={{
            title:'CERRAR SESIÓN',
            info: [ '¿Estás seguro que seseas cerrar la sesión' ],
            button: { label: 'CERRAR SESIÓN', action: () => logout() }
          }}
          onClose={ () => setShowLogoutDialog(false) }
        />
      }
      { showDeleteDialog &&
          <DeleteAccountDialog onClose={ choice => {
            console.log('CHOICE', choice)
            setShowDeleteDialog(false)
          }}/>
      }
    </WepickView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '8%'
  },
  itemsContainer: {
    flex: 1
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemLabel: {
    fontSize: text.size.button,
    fontWeight: 'regular'
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlign: 'center',
    borderRadius: 6,
  },
  logout: {
    backgroundColor: colors.primary,
  },
  delete: {
    backgroundColor: colors.accentDark,
  },
  roundshape: {
    padding: 4,
    borderRadius: 14,
    backgroundColor: colors.accent,
    overflow: 'hidden'
  }
})

export default UserLanding