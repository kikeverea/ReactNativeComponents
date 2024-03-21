import { View, StyleSheet } from "react-native"
import Text from "./text.component"

const InfoItem = ({ item }) => {
  return (
    <View style={ styles.container }>
      <Text>{ item.name }</Text>
      <Text>{ item.value }</Text>
    </View>
  )
}

export default InfoItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8
  }
})