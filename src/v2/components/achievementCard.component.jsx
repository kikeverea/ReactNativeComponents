import { View, StyleSheet, Image} from 'react-native'
import Text from '../components/text.component'

import colors from '../styles/colors'
import text from '../styles/text'

import badge from '../assets/icons/achievement.png'
import Card from './card.component'

const AchievementCard = ({ achievement }) => {
  
  return (
    <Card style={ styles.container }>
      <Image source={ badge } style={ styles.badge } resizeMode='contain' />
      <Text style={ styles.timeLeft }>{ achievement.timeLeft }</Text>
      <View style={ styles.nameContainer }>
        <Text style={ styles.name }>{ achievement.achievement }</Text>
      </View>
      <View style={ styles.footer }>
        <Text style={ styles.footerText }>{ `+${achievement.xp} EXP` }</Text>
        <Text style={ styles.footerText }>{ `${achievement.timesReached}/${achievement.totalTimes}` }</Text>
      </View>
    </Card>
  )
}

export default AchievementCard

const styles = StyleSheet.create({
  container: {
    width: '97%',
    minHeight: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
  },
  badge: {
    position: 'absolute',
    left: 2,
    top: 4,
    width: 40,
    height: 40,
  },
  timeLeft: {
    fontSize: text.size.tiny,
    fontStyle: 'italic',
    textAlign: 'right',
    width: '100%'
  },
  nameContainer: {
    flex: 1,
    width: '85%',
    justifyContent: 'center'
  },
  name: {
    fontSize: text.size.header,
    fontWeight: 'light',
    textAlign: 'center'
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  footerText: {
    fontSize: text.size.tiny,
    fontStyle: 'italic',
  }
})