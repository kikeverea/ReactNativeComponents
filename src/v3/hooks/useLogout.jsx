import tokenStore from '../services/tokenStore.service'
import { useContext } from 'react'
import SessionContext from '../contexts/SessionContext'

const useLogout = () => {

  const [_token, setToken] = useContext(SessionContext)

  const logout = async() => {
    await tokenStore.deleteToken()
    setToken(null)
  }

  return logout
}

export default useLogout