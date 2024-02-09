import { ActivityIndicator } from "react-native"
import useData from '../hooks/useData'

const DataComponent = ({ fetchData }) => {

  const { loading } = useData(fetchData)

  return (
    loading
      ? <ActivityIndicator accessibilityHint='loading'/>
      : <></>
  )
}

export default DataComponent