import React, { useEffect, useLayoutEffect } from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {getFocusedRouteNameFromRoute} from '@react-navigation/native'
 
import Home from '../views/home'
import Jackpot from '../views/jackpot'
import Campaigns from '../views/campaigns'
import AppBar from '../components/appbar.component'
import colors from '../styles/colors'
import { tabBarStyle } from '../styles/styles'

const Stack = createStackNavigator()

const hideTabs = ['campaigns', 'jackpot']

const VIEW_INFO_1 = 'El Bote se reparte cada jueves a las 20:00 CET, y el volumen de iCoals acumulados para repartir aumenta con ' +
                    'cada visualización de anuncios que realicéis. Completad la barra de segundos de anuncios visualizados para obtener ' +
                    'una participación de número único.'
const VIEW_INFO_2 = 'Diferenciamos entre la cantidad de iCoals dirigidos a los Elite Users ' +
                    '(primeros usuarios en el ranking) y los iCoals dirigidos al Sorteo, donde existen los premios principales ' +
                    'con grandes cantidades de iCoals, y un gran número de premios secundarios, con menor cantidad de iCoals.'
const VIEW_INFO_3 = 'Cuantas más participaciones obtengáis, más posibilidades tenéis de ganar un premio en el sorteo. '
const VIEW_INFO_4 = 'Se notificará a los premiados por correo, y su Apodo aparecerá en el apartado de noticias.'

const HomeNavigation = ({ navigation, route }) => {

  useEffect(() => {
    const currentRoute = getFocusedRouteNameFromRoute(route)
    const tabsDisplay = hideTabs.includes(currentRoute) ? 'none' : 'flex'

    navigation.setOptions({ tabBarStyle: [tabBarStyle, { display: tabsDisplay }]})
  }, [route])

  return(
    <Stack.Navigator initialRouteName='home'>
        <Stack.Screen
            name='home'
            component={Home}
            options={({}) => ({
              headerShown: true,
              header: () => <AppBar title='PRINCIPAL' goBack={ false }/>,
            })}
        />
        <Stack.Screen
            name='campaigns'
            component={Campaigns}
            options={({}) => ({
            headerShown: false,
            cardStyle: {
              backgroundColor: colors.primaryDark
            }
            })}
        />
        <Stack.Screen
            name='jackpot'
            component={Jackpot}
            options={({}) => ({
              headerShown: true,
              header: () => <AppBar title='BOTE' showInfo={{
                info: [ VIEW_INFO_1, VIEW_INFO_2, VIEW_INFO_3, VIEW_INFO_4 ],
                title: 'CANJEAR'
              }}
            />
            })}
        />
    </Stack.Navigator>
  )
}

export default HomeNavigation
