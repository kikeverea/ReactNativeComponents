import { ScrollView, StyleSheet, View } from 'react-native'
import Text from '../../components/text.component'

const TermsAndConditions = () => {
  return (
    <ScrollView style={ styles.container }>
      <View style={ styles.contentContainer }>
        <Text>
          En WePickApp estamos convencidos de que la publicidad puede y debe mejorar.
        </Text>
        <Text>
          Iniciamos esta platafoma de prueba, con el objetivo de mejorar la experiencia de usuario,
          por lo que te pedimos tu colaboración para recolectar información sobre el uso que hagas en esta web.
        </Text>
        <Text>
          Las recompensas obtenidas tienen únicamente una finalidad
          profesional y en esta version no suponen ninguna contrapartida monetaria
        </Text>
        <Text>
          Pero la participación en esta fase Beta impicará una antiguedad mayor en la plataforma, por lo que
          supondrá mayores recompensas en la versión definitiva.
        </Text>
        <Text>
          Por supuesto, nos encantaría recibir tu feedback en el apartado de usuario.
        </Text>
        <Text>
          El tratamiento de todos los datos será completamente
          confidencial y no se cederá a terceros. Si continuas, aceptas estas condiciones
        </Text>
        <Text>
          El tratamiento de todos los datos será completamente
          confidencial y no se cederá a terceros. Si continuas, aceptas estas condiciones
        </Text>
        <Text>
          El tratamiento de todos los datos será completamente
          confidencial y no se cederá a terceros. Si continuas, aceptas estas condiciones
        </Text>
        <Text>
          El tratamiento de todos los datos será completamente
          confidencial y no se cederá a terceros. Si continuas, aceptas estas condiciones
        </Text>
        <Text>
          El tratamiento de todos los datos será completamente
          confidencial y no se cederá a terceros. Si continuas, aceptas estas condiciones
        </Text>
        <Text>
          El tratamiento de todos los datos será completamente
          confidencial y no se cederá a terceros. Si continuas, aceptas estas condiciones
        </Text>
        <Text>
          El tratamiento de todos los datos será completamente
          confidencial y no se cederá a terceros. Si continuas, aceptas estas condiciones
        </Text>
      </View>
    </ScrollView>
  )
}

export default TermsAndConditions

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    gap: 16,
    paddingVertical: '8%',
    paddingHorizontal: '6%'
  }
})