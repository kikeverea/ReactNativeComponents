import { createContext, useState } from 'react'

const SessionContext = createContext()

export const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  return (
    <SessionContext.Provider value={ [token, setToken, error, setError] }>
      { children }
    </SessionContext.Provider>
  )
}

export default SessionContext