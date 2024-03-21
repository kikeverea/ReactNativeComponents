import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'

import colors from '../styles/colors'
import logo from '../assets/img/logo.png'
import Banner from './banner.component'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import text from '../styles/text'

const AppBar = ({ title, subTitle, titleSize=text.size.title, goBack=true, showInfo }) => {

  const navigation = useNavigation()

  return (
    <View>
      <View style={ styles.appbar }>
        { goBack
            ? renderIconButton('arrow-left', () => navigation.goBack())
            : renderPaddingView()
        }
        <Image source={ logo } style={ styles.logo } resizeMode='contain'/>
        { renderPaddingView() }
      </View>
      <Banner text={ title } textSecondary={ subTitle } fontSize={ titleSize } showInfo={ showInfo }/>
    </View>
  )
}

export default AppBar

const renderIconButton = (icon, action) =>
  <TouchableOpacity
    style={styles.iconButton}
    activeOpacity={0.7}
    onPress={ action }
  >
    <Icon name={ icon } color={ colors.accent } size={ 32 }/>
  </TouchableOpacity>


const renderPaddingView = () =>
  <View style={ styles.paddingView }></View>

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 80,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.primaryDark
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 40,
  },
  logo: {
    height: 50,
    width: 280,
  },
  paddingView: {
    width: 32
  }
})