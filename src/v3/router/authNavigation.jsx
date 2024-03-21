import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
 
import Login from '../views/auth/login'
import Register from '../views/auth/register';

import AppBar from '../components/appbar.component'
import Landing from '../views/auth/landing';
import ChangePassword from '../views/user/changePassword';

const Stack = createStackNavigator();

/*Este es el navegador */
const AuthNavigation = () => {

  return(
    <Stack.Navigator initialRouteName='landing'>
        <Stack.Screen
            name='landing'
            component={Landing}
            options={({navigation}) => ({
              headerShown: false,
            })}
        />
        <Stack.Screen
            name='login'
            component={Login}
            options={({navigation}) => ({
              headerShown: false,
            })}
        />
        <Stack.Screen
            name='register'
            component={Register}
            options={({navigation}) => ({
              headerShown: false
            })}
        />
        <Stack.Screen
            name='recover_password'
            component={ChangePassword}
            options={({navigation}) => ({
              headerShown: true,
              header: () => <AppBar title='RECUPERAR CONTRASEÑA'/>
            })}
        />
    </Stack.Navigator>
  )
}

export default AuthNavigation;
