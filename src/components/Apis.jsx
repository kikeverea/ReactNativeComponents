import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native'
import colors from '../styles/colors'
import Text from '../components/text.component'
import { textSize } from '../styles/text'

import mobility_api_img from '../assets/img/api_mobility.jpg'
import mobility_api_icon from '../assets/icons/api_mobility.png'

import parkings_api_img from '../assets/img/api_parkings.jpg'
import parkings_api_icon from '../assets/icons/api_parkings.png'

import environment_api_img from '../assets/img/api_environment.jpg'
import environment_api_icon from '../assets/icons/api_environment.png'

import sports_api_img from '../assets/img/api_sports.jpg'
import sports_api_icon from '../assets/icons/api_sports.png'

const Apis = ({ navigation }) => {
  const Api = ({ image, icon, title, description, offset=0, goTo }) => {

    const CARD_HEIGHT = 180

    const cardStyles = StyleSheet.create({
      container: {
        overflow: 'hidden',
        height: CARD_HEIGHT,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      },
      backgroundImage: {
        width: '100%',
        height: CARD_HEIGHT + offset,
        top: -offset,
        bottom: 0
      },
      content: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 180
      }
    })

    return (
      <Pressable onPress={ () => navigation.navigate(goTo) }>
        <View style={ cardStyles.container } >
          <Image style={ cardStyles.backgroundImage } source={ image } resizeMode='cover' />
          <View style={ cardStyles.content }>
            <Image style={ styles.icon } source={ icon } resizeMode='contain' />
            <View style={ styles.cardContent }>
              <Text style={ styles.title }>{ title }</Text>
              <Text style={ styles.description }>{ description }</Text>
            </View>
          </View>
        </View>
      </Pressable>
    )
  }
  
  return (
    <ScrollView>
      <View style={ styles.container }>
        <Api
          offset={ 140 }
          image={ mobility_api_img }
          icon={ mobility_api_icon }
          title='Mobilidad'
          description='Lorem ipsum dolor sit amet elit. In tempus lacinia enim.'/>
        <Api
          image={ parkings_api_img }
          icon={ parkings_api_icon }
          title='Parkings'
          description='Lorem ipsum dolor sit amet elit. In tempus lacinia enim.'/>
        <Api
          image={ environment_api_img }
          icon={ environment_api_icon }
          goTo='devices_map'
          title='Medio Ambiente'
          description='Lorem ipsum dolor sit amet elit. In tempus lacinia enim.'/>
        <Api
          image={ sports_api_img }
          icon={ sports_api_icon }
          title='Polideportivo'
          description='Lorem ipsum dolor sit amet elit. In tempus lacinia enim.'/>
      </View>
    </ScrollView>
  )
}

export default Apis

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '8%',
    backgroundColor: 'white',
    gap: 20,
  },
  cardContent: {
    paddingHorizontal: '4%',
    gap: 16
  },
  icon: {
    width: 80,
    height: 80
  },
  title: {
    fontSize: textSize.title,
    color: colors.white
  },
  description: {
    color: colors.white
  }
})