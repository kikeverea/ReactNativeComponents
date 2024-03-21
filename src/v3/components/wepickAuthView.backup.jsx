import { Dimensions, Image, Keyboard, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import background from '../assets/img/background.jpg'

import decorationTop from '../assets/img/backgroundDecorTop.png'
import decorationBottom from '../assets/img/backgroundDecorBottom.png'

import Text from './text.component'
import text from '../styles/text'
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../styles/colors'

import iconLogo from '../assets/img/logo.png'
import { useEffect, useState } from 'react'
import { StatusBarHeight } from '../helpers/statusBarHeight'

const WepickAuthView = ({ style, children, showLogo=true, showCopyright, goBack=true }) => {

  const [displayLogo, setDisplayLogo] = useState(showLogo)
  const [hasKeyboard, setHasKeyboard] = useState(false)
  
  const navigation = useNavigation()

  useEffect(() => {
    const { show, hide } =
      Platform.OS === 'android'
      ? { show: 'keyboardDidShow', hide: 'keyboardDidHide' }
      : { show: 'keyboardWillShow', hide: 'keyboardWillHide' }

    const showSubscription = Keyboard.addListener(show, () => {
      setHasKeyboard(true)
      setDisplayLogo(false)
    })
    
    const hideSubscription = Keyboard.addListener(hide, () => {
      setHasKeyboard(false)
      setDisplayLogo(showLogo)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  /*** Screen dimensions ***/
  const window = Dimensions.get('window')
  const height = window.height - StatusBarHeight
  const width = window.width

  /*** Background decorations dimensions ***/
  const { width: imagewidth, height: imageHeight } = Image.resolveAssetSource(decorationTop)
  const ratio = imageHeight / imagewidth
  const decorationHeight = width * ratio
  const decorationCurveHeight = decorationHeight * 0.30

  const logoLayout = {
    width: '100%',
    height: height / 4.5,
  }
  const iconLogoLayout = {
    flex: 1,
    height: height / 12,
  }
  const contentLayout = {
    flex: 1,
    minHeight: height - (decorationHeight * 2) + (decorationCurveHeight * 2),
    justifyContent: hasKeyboard ? 'top' : 'center',
    paddingTop: hasKeyboard ? '6%' : 0,
  }
  const copyrightLayout = {
    position: 'absolute',
    height: decorationHeight - decorationCurveHeight,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center'
  }

  const goBackAction = () => {
    Keyboard.dismiss()
    navigation.goBack()
  }

  return (
    <Background width={ width } height={ height } decorationHeight={ decorationHeight }>
      <View style={[ styles.header, { height: decorationHeight - decorationCurveHeight } ]}>
        { goBack &&
          <TouchableOpacity
            style={ styles.goBack }
            activeOpacity={ 0.6 }
            onPress={ goBackAction }
          >
            <Icon name='arrow-left' color={ colors.accent } size={ 40 } />
          </TouchableOpacity>
        }
        { !displayLogo && <Image source={ iconLogo } style={ iconLogoLayout } resizeMode='contain' /> }
      </View>
      <KeyboardAwareScrollView style={{ flex: 1 }} >
        <View style={ contentLayout }>
          { displayLogo && <Image style={ logoLayout } source={require('../assets/img/authLogo.png')} resizeMode='contain'/> }
          <View style={ style }>
            { children }
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={ copyrightLayout }>
        { showCopyright && <Text style={ styles.copyright }>Copyright. 2022</Text> }
      </View>
    </Background>
  )
}

const Background = ({ width, height, decorationHeight, children }) => {

  const backgroundLayout = {
    position: 'absolute',
    height: height,
    width: width
  }

  const decorationTopLayout = {
    position: 'absolute',
    width: width,
    height: decorationHeight
  }

  const decorationBottomLayout = {
    position: 'absolute',
    bottom: 0, 
    width: width,
    height: decorationHeight
  }

  const childrenLayout = {
    position: 'absolute',
    height: height,
    width: width
  }

  return (
    <View style={ styles.container }>
      <Image source={ background } style={ backgroundLayout } resizeMode='cover' />
      <Image source={ decorationTop } style={ decorationTopLayout } resizeMode='cover'/>
      <Image source={ decorationBottom } style={ decorationBottomLayout } resizeMode='cover'/>
      <View style={ childrenLayout }>
        { children }
      </View>
    </View>
  )
}

export default WepickAuthView

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBack: {
    padding: 4,
  },  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '4%',
  },
  copyright: {
    fontSize: text.size.button,
    textAlign: 'center'
  }
})