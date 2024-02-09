import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'

import colors from '../styles/colors'
import logo from '../assets/img/logo.png'
import Banner from './banner.component'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const AppBar = ({ title, goBack=true }) => {

  const navigation = useNavigation()

  return (
    <View>
      <View style={ styles.appbar }>
        {goBack ?
          <TouchableOpacity  style={styles.backIcon} activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <Icon name={'arrow-left'} color={'#FFFFFF'} size={30}/>
          </TouchableOpacity>
          :
          <View style={{width: 40}}></View>
        }
        
        <Image source={ logo } style={ styles.logo } resizeMode='contain'/>

        <View style={{width: 40}}></View>
      </View>
      <Banner text={ title } />
    </View>
  )
}

export default AppBar

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 100,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.primaryDark
  },
  backIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 40,
  },
  logo: {
    height: '100%',
    width: 280,
  }
})