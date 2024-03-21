import { Image, StyleSheet, View } from 'react-native'
import WepickAuthView from '../../components/wepickAuthView.component'
import IconButton from '../../components/iconButton.component'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../styles/colors'
import text from '../../styles/text'
import Text from '../../components/text.component'

import logo from '../../assets/img/authLogo.png'

const Landing = ({ navigation }) => {

  return (
    <WepickAuthView>
       <View style={ styles.container }>
        <Image style={ styles.logo } source={ logo } resizeMode='contain'/>
        <IconButton
          style={ styles.button }
          iconLeft={ <Icon name='plus' color={ colors.accent } size={ 28 }/> }
          text='CREAR CUENTA NUEVA'
          press={ () => navigation.navigate('register') }
        />
        <IconButton
          style={ styles.button }
          iconLeft={
            <Image
              style={{width: 20, height: 20, marginEnd: 8 }}
              source={require('../../assets/img/enter.png')}
              resizeMode='contain'/>
          }
          text='ENTRAR EN TU CUENTA'
          press={ () => navigation.navigate('login') }
        />
      </View>
      <Text style={styles.copyright}>Copyright. 2022</Text>
    </WepickAuthView>
  )

}

export default Landing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '8%',
    justifyContent: 'center'
  },
  logo: {
    alignSelf: 'center',
    width: '75%',
    height: '40%',
  },
  button: {
    width: '100%',
    backgroundColor: colors.darkButton
  },
  copyright: {
    padding: 40,
    fontSize: text.size.button,
    textAlign: 'center'
  }
})