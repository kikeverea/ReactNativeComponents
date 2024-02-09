import { login as loginService } from '../services/auth.service'
import tokenStore from '../services/tokenStore.service'
import { storeUser } from '../services/user.service'
import { useContext, useState } from 'react'
import SessionContext from '../contexts/SessionContext'
import Toast from 'react-native-toast-message'

const useLogin = () => {
  const [_token, setToken] = useContext(SessionContext)

  const [waiting, setWaiting] = useState(false)

  const login = async (email, password) => {

    try {
      setWaiting(true)

      const user = await loginService(email, password)
      
      if (user) {
        await tokenStore.setToken(user.token)
        await storeUser(user.info)
        setToken(user.token)
        console.log('login successful')
      }
    }
    catch (e) {
      console.error(e.response.data);
      const message = e.response?.data.error
        ? e.response.data.error
        : 'No se ha podido iniciar sesión'
        
      Toast.show({
        type: 'error',
        text1: message,
        position: 'bottom',
        visibilityTime: 3000
      });
    }
    finally {
      setWaiting(false)
    }
  }

  return [login, waiting]
}

export default useLogin