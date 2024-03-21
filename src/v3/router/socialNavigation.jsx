import React, { useEffect } from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Social from '../views/social/social'
import Posts from '../views/social/posts'
import Post from '../views/social/post'
import Rankings from '../views/social/rankings'
import UsersRanking from '../views/social/usersRanking'
import BrandsRanking from '../views/social/businessRanking'
import Achievements from '../views/social/achievements'
import AppBar from '../components/appbar.component'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { tabBarStyle } from '../styles/styles'

const usersRankingInfo = navigation => {
  return (
    {
      title: 'RANKING',
      info:
      [
        'En este Ranking están ordenados por puntos obtenidos todos los usuarios de WePickApp. ' +
        'Cuanto más alto te encuentres, más opciones tienes de convertirte en Elite User.',
        'Los Elite Users están marcados y son los primeros usuarios del Ranking. ' +
        'Los Elite Users reciben una gran cantidad de iCoals semanalmente, repartiéndose éstos junto con el evento del Sorteo. ',
        '¡Obtén Puntos completando logros y siendo activo en WePickApp para poder llegar a la zona más alta de la tabla!',
      ],
      highlight: ['Puedes visualizar la cantidad de iCoals para repartir entre los Elite Users en la sección para ver el Bote.'],
      button: { label: 'IR AL BOTE', action: () => navigation.navigate('jackpot') }
    }
  )
}

const companiesRankingInfo = () => {
  return (
    {
      title: 'RANKING',
      info:
      [
        'En este Ranking están ordenadas por puntos obtenidos todas las marcas que forman parte de WePickApp.',
        'Las Marcas Top están marcadas, y son las primeras en el Ranking. Éstas han cumplido distintos objetivos para poder llegar a ' +
        'la zona más alta de la tabla.',
        'Las Marcas Top obtienen descuentos regresivos para sus contrataciones, dependiendo del nivel que hayan obtenido.'
      ]
    }
  )
}

const achievementsInfo = () => {
  return (
    {
      title: 'LOGROS',
      info:
      [
        'Completa logros para ganar Experience y aumentar tu prestigio dentro de WePickApp.',
        'Cuanta más Experience consigas, más puntos lograrás tener en el Ranking de Usuarios.',
        'Los logros que se reinician al completarse no tienen tiempo límite.'
      ],
      highlight: ['1 Experience = 1 Punto']
    }
  )
}

const Stack = createStackNavigator()

const SocialNavigation = ({ navigation, route }) => {

  useEffect(() => {
    const currentRoute = getFocusedRouteNameFromRoute(route) ?? 'social'
    const tabsDisplay = currentRoute === 'social' ? 'flex' : 'none'

    navigation.setOptions({ tabBarStyle: [tabBarStyle, { display: tabsDisplay }]})

  }, [route])

  return(
    <Stack.Navigator initialRouteName='social'>
      <Stack.Screen
        name='social'
        component={Social}
        options={() => ({
          headerShown: true,
          header: () => <AppBar title='SOCIAL' goBack={ false }/>,
        })}
      />
      <Stack.Screen
        name='posts'
        component={Posts}
        options={() => ({
          headerShown: true,
          header: () => <AppBar title='NOTICIAS'/>,
        })}
      />
      <Stack.Screen
        name='post'
        component={Post}
        options={() => ({
          headerShown: true,
          header: () => <AppBar title='NOTICIA'/>,
        })}
      />
      <Stack.Screen
        name='rankings'
        component={Rankings}
        options={() => ({
          headerShown: true,
          header: () => <AppBar title='RANKING'/>,
        })}
      />
      <Stack.Screen
        name='users_ranking'
        component={UsersRanking}
        options={() => ({
          headerShown: true,
          header: () => <AppBar title='RANKING USUARIO' showInfo={ usersRankingInfo(navigation) } />,
        })}
      />
      <Stack.Screen
        name='brands_ranking'
        component={BrandsRanking}
        options={() => ({
          headerShown: true,
          header: () => <AppBar title='RANKING MARCAS' showInfo={ companiesRankingInfo() } />,
        })}
      />
      <Stack.Screen
        name='achievements'
        component={Achievements}
        options={() => ({
          headerShown: true,
          header: () => <AppBar title='LOGROS' showInfo={ achievementsInfo() } />,
        })}
      />
    </Stack.Navigator>
  )
}

export default SocialNavigation