import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native"
import colors from "../styles/colors"

const AsyncList = props => {

  return (
    <View style={ props.containerStyle ? props.containerStyle : styles.container }>
      { props.loading
        ? <ActivityIndicator style={ styles.indicator} size='large' color={ colors.accent } />
        : <FlatList
            style={ props.style }
            data={ props.data }
            renderItem={ props.renderItem }
            keyExtractor={ props.keyExtractor }
            ItemSeparatorComponent={ props.ItemSeparatorComponent }
          /> 
      }
    </View>
  )
}

export default AsyncList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  indicator: {
    marginBottom: 60
  }
})