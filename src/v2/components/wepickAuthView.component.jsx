import { Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import background from '../assets/img/backgroundAuth.jpg'
import Text from './text.component'
import text from '../styles/text'
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../styles/colors'

const WepickAuthView = ({ style, children, showCopyright, goBack=true }) => {

  const height = Dimensions.get('window').height
  
  const navigation = useNavigation()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      minHeight: height,
      justifyContent: 'center',
      paddingBottom: goBack ? '40%' : 20
    },  
    logo: {
      width: '100%',
      height: height / 4.5,
    },
    copyright: {
      fontSize: text.size.button,
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      textAlign: 'center'
    },
    goBack: {
      marginTop: '6%',
      marginHorizontal: '4%'
    }
  })

  return (
    <ImageBackground source={ background } style={ styles.container } resizeMode='cover'>
      { goBack &&
        <TouchableOpacity
          style={ styles.goBack }
          activeOpacity={ 0.6 }
          onPress={ () => navigation.goBack() }
        >
          <Icon name='arrow-left' color={ colors.accent } size={ 40 } />
        </TouchableOpacity>
      }
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={ styles.content }>
          <Image style={ styles.logo } source={require('../assets/img/authLogo.png')} resizeMode='contain'/>
          <View style={ style }>
            { children }
          </View>
        </View>
      </KeyboardAwareScrollView>
      { showCopyright && <Text style={ styles.copyright }>Copyright. 2022</Text> }
    </ImageBackground>
  )
}

export default WepickAuthView