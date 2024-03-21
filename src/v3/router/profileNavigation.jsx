import React, { useEffect } from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import InviteFriend from '../views/user/invite'
import AppBar from '../components/appbar.component'
import TermsAndConditions from '../views/user/termsConditions'
import UserLanding from '../views/user/landing'
import ProfileInfo from '../views/user/profile'
import Interests from '../views/user/interests'
import ChangePassword from '../views/user/changePassword'
import DeleteAccount from '../views/user/deleteAccount'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { tabBarStyle } from '../styles/styles'

const Stack = createStackNavigator()

const PROFILE_INFO = {
  title: 'INFO CUENTA',
  info:
  [
    'Cualquier información falsa o errónea puede secuenciar la eliminación o suspensión de la cuenta, ' +
    'junto con todos los logros obtenidos y los iCoals correspondientes.',
    'Además, la cuenta de usuario se vuelve inactiva tras 4 eventos de Hora Cero sin participaciones, '+
    'pero puede ser reactivada en cualquier momento, hasta que se cumplan 12 eventos sin participar, ' +
    'cuando se suspendería la cuenta'
  ]
  }

const INTERESTS_INFO = {
  title: 'INTERESES',
  info:
    [
      'Los intereses marcados definirán la temática de los anuncios disponibles',
      'Cuantos más intereses marcados, mayor variedad y cantidad de anuncios se tendrá disponible.',
      'Deben pasar 90 días desde el último cambio de intereses para poder realizar nuevos cambios.'
    ],
  highlight:
    [
      'Debes marcar un mínimo de 5 y un máximo de 10 intereses.'
    ]
}

const ProfileNavigation = ({ navigation, route }) => {
  
  useEffect(() => {
    const currentRoute = getFocusedRouteNameFromRoute(route) ?? 'user_landing'
    const tabsDisplay = currentRoute === 'user_landing' ? 'flex' : 'none'
  
    navigation.setOptions({ tabBarStyle: [tabBarStyle, { display: tabsDisplay }]})
  
  }, [route])

  return(
    <Stack.Navigator initialRouteName='user_landing'>
      <Stack.Screen
        name='user_landing'
        component={UserLanding}
        options={({navigation}) => ({
        headerShown: true,
        header: () => <AppBar title='PERFIL' goBack={ false } />,
        })}
      />
      <Stack.Screen
        name='profile'
        component={ProfileInfo}
        options={({navigation}) => ({
          headerShown: true,
          header: () => <AppBar title='CUENTA' showInfo={ PROFILE_INFO }/>,
        })}
      />
      <Stack.Screen
        name='interests'
        component={Interests}
        options={({navigation}) => ({
          headerShown: true,
          header: () => <AppBar title='INTERESES' showInfo={ INTERESTS_INFO }/>,
        })}
      />
      <Stack.Screen
        name='change_password'
        component={ChangePassword}
        options={({navigation}) => ({
          headerShown: true,
          header: () => <AppBar title='CAMBIAR CONTRASEÑA'/>,
        })}
      />
      <Stack.Screen
        name='invite_friend'
        component={InviteFriend}
        options={({navigation}) => ({
          headerShown: true,
          header: () => <AppBar title='INVITAR A UN AMIGO'/>,
        })}
      />
      <Stack.Screen
        name='terms_and_conditions'
        component={TermsAndConditions}
        options={({navigation}) => ({
          headerShown: true,
          header: () => <AppBar title='TÉRMINOS Y CONDICIONES'/>,
        })}
      />
      <Stack.Screen
        name='delete_account'
        component={DeleteAccount}
        options={({navigation}) => ({
          headerShown: true,
          header: () => <AppBar title='ELIMINAR CUENTA'/>,
        })}
      />
    </Stack.Navigator>
  )
}



export default ProfileNavigation
