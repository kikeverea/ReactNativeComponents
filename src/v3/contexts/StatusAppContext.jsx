import { createContext, useState } from 'react'

const StatusAppContext = createContext()

export const StatusAppContextProvider = ({ children }) => {
  const [appIsActive, setAppIsActive] = useState(true)
  const [error, setError] = useState(null)

  return (
    <StatusAppContext.Provider value={ [appIsActive, setAppIsActive, error, setError] }>
      { children }
    </StatusAppContext.Provider>
  )
}

export default StatusAppContext