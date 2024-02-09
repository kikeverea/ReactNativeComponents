import { useEffect, useState } from "react"

const useData = fetchData => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    
    const fetch = async () => {
      const result = await fetchData()

      if (ignore)
        return

      else if (result.data)
        setData(result.data)
      
      else if (result.error)
        setError(result.error)

      setLoading(false)
    }

    fetch()

    return () => {
      ignore = true
    }
  },
  [])

  return { loading, data, error }
}

export default useData