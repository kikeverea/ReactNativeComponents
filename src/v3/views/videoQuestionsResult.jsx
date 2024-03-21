import { StyleSheet, Text, View } from "react-native"
import colors from "../styles/colors"

const VideoQuestionsResult = () => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.text }>
        Has ganado 3 participaciones por ver un anuncio de 15 segundos y contestar la pregunta
        de control de manera correcta
      </Text>
    </View>
  )
}

export default VideoQuestionsResult

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    margin: 40,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000000'
  }
})