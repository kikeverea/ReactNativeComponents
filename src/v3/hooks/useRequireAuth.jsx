import { useContext } from 'react'
import SessionContext from '../contexts/SessionContext'
import Toast from 'react-native-toast-message'

const useRequireAuth = () => {

  const [_token, setToken] = useContext(SessionContext)

  const authFailed = () => {
    console.log('AUTH FAILED')
    setToken(null)
    Toast.show({
      type: 'error',
      text1: 'Tu sesión ha expirado',
      position: 'bottom'
    })
  }

  return authFailed
}

export default useRequireAuth