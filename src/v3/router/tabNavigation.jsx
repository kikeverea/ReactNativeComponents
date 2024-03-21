import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileNavigation from './profileNavigation'

const AppBottomNavigation = createBottomTabNavigator()

import HomeNavigation from '../router/homeNavigation'
import SocialNavigation from './socialNavigation'
import Redeem from '../views/redeem'
import colors from '../styles/colors'
import { Image, StyleSheet } from 'react-native'

import home_active from '../assets/icons/home_active.png'
import social_active from '../assets/icons/social_active.png'
import icoals_active from '../assets/icons/icoal_active.png'
import user_active from '../assets/icons/user_active.png'

import home_inactive from '../assets/icons/home_inactive.png'
import social_inactive from '../assets/icons/social_inactive.png'
import icoals_inactive from '../assets/icons/icoal_inactive.png'
import user_inactive from '../assets/icons/user_inactive.png'
import { tabBarStyle } from '../styles/styles'
import AppBar from '../components/appbar.component'

const ICON_SIZE = 40

const REDEEM_INFO = {
  title: 'MONEDERO',
  info: [
    'Puedes retirar la cantidad de iCoals almacenada en el monedero, ' +
    'convirtiéndola a la moneda deseada, y pudiéndola enviar a través de servicios bancarios populares.'
  ],
  highlight: [
    'Cualquier intento de hurto o truco puede resultar en la eliminación ' +
    'de la cuenta y de sus correspondientes iCoals.'
  ]
}

const Icons = {
  home: focused => focused ? home_active : home_inactive,
  social: focused => focused ? social_active : social_inactive,
  redeem: focused => focused ? icoals_active : icoals_inactive,
  user: focused => focused ? user_active : user_inactive,
}

const styles = StyleSheet.create({
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE
  }
})

const renderIcon = source =>
  <Image style={ styles.icon } source={ source }/>

const TabNavigation = () => {

  return(
      <AppBottomNavigation.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.accent,         // <-- Pone el color del icono del tab cuando esta activa
          tabBarInactiveTintColor: colors.secondary,    // <-- Pone el color del icono del tab cuando esta inactiva
        }}
      >
        <AppBottomNavigation.Screen
          component={HomeNavigation}
          name={'Home'}
          options={() => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => renderIcon(Icons.home(focused)),
          })}
        />
        <AppBottomNavigation.Screen
          component={SocialNavigation}
          name={'Social'}
          options={() => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => renderIcon(Icons.social(focused)),
          })}
        />
        <AppBottomNavigation.Screen
          component={Redeem}
          name={'Canjear'}
          options={(route) => ({
            headerShown: true,
            header: () => <AppBar title={ 'MONEDERO' } titleSize={ 24 } goBack={ false } showInfo={ REDEEM_INFO }/>,
            tabBarIcon: ({ focused }) => renderIcon(Icons.redeem(focused))
          })}
        />
        <AppBottomNavigation.Screen
          component={ProfileNavigation}
          name={'Usuario'}
          options={(route) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => renderIcon(Icons.user(focused))
          })}
        />
      </AppBottomNavigation.Navigator>
  )
}

export default TabNavigation
