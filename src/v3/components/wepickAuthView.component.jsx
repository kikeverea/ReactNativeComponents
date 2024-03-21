import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import background from '../assets/img/auth_background.jpg'
import WepickView from './wepickView.component'

import iconLogo from '../assets/img/logo.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../styles/colors'
import { useNavigation } from '@react-navigation/native'

const WepickAuthView = ({ children, allowGoBack }) => {

  const navigation = useNavigation()

  return (
    <WepickView background={ background } resizeMode='cover'>
      { allowGoBack &&
        <View style={ styles.header }>
            <TouchableOpacity
              style={ styles.goBack }
              activeOpacity={0.6}
              onPress={ () => navigation.goBack() }
            >
              <Icon name='arrow-left' color={colors.accent} size={40} />
            </TouchableOpacity>
          <Image source={ iconLogo } style={ styles.iconLogo } resizeMode='contain' />
          <View style={{ paddingHorizontal: 10 }} />
        </View>
      }
      { children }
    </WepickView>
  )
}

const styles = StyleSheet.create({
  goBack: {
    padding: 4,
  },
  header: {
    paddingHorizontal: '4%',
    paddingVertical: '8%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLogo: {
    flex: 1,
    height: 65
  }
})

export default WepickAuthView