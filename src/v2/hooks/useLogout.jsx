import tokenStore from '../services/tokenStore.service'
import { storeUser } from '../services/user.service'
import { useContext } from 'react'
import SessionContext from '../contexts/SessionContext'

const useLogout = () => {

  const [_token, setToken] = useContext(SessionContext)

  const logout = async() => {
    await tokenStore.deleteToken()
    await storeUser(null)
    setToken(null)
  }

  return logout
}

export default useLogout