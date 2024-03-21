import { View, StyleSheet, Image} from 'react-native'
import Text from '../components/text.component'

import ProgressBar from './progressBar.component'

import colors from '../styles/colors'
import text from '../styles/text'

import badge from '../assets/icons/achievement.png'
import Card from './card.component'
import { useRef, useState } from 'react'

const AchievementCard = ({ achievement }) => {
  
  const footerRef = useRef(null)
  
  const [footerWidth, setFooterWidth] = useState(null)

  const measureComponent = () => {
    footerRef.current.measure((_x, _y, w,) => {
      if (!footerWidth)
        setFooterWidth(w)
    })
  }

  const cardBackground = {
    backgroundColor: achievement.reached ? colors.primaryDark : colors.primaryLight
  }
  
  return (
    <Card style={ achievement.timesReached == achievement.totalTimes ? styles.containerComplete :  styles.containerProgress } >
      <Image source={ badge } style={ styles.badge } resizeMode='contain' />
      <Text style={ styles.timeLeft }>{ achievement.timeLeft }</Text>
      <View style={ styles.nameContainer }>
        <Text style={ styles.name }>{ achievement.achievement }</Text>
      </View>
      <View 
        style={ styles.footer }
        ref={ footerRef }
        onLayout={ measureComponent }
      >
        <ProgressBar
          width={ footerWidth * 0.85 }
          height={ 10 }
          color={ achievement.timesReached == achievement.totalTimes ? colors.darkButton : colors.accent }
          unfilledColor={ colors.primary }
          current={ achievement.timesReached }
          max={ achievement.totalTimes }
        />
        <View style={ styles.footerInfo }>
          <Text style={ styles.footerText }>{ `+${achievement.xp} EXP` }</Text>
          <Text style={ styles.footerText }>{ `${achievement.timesReached}/${achievement.totalTimes}` }</Text>
        </View>
      </View>
    </Card>
  )
}

export default AchievementCard

const styles = StyleSheet.create({
  containerProgress: {
    width: '97%',
    minHeight: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryLight
  },
  containerComplete: {
    width: '97%',
    minHeight: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: colors.accentDark,
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
    width: '100%',
    fontSize: 14
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
    paddingTop: 12,
    alignItems: 'center',
    gap: 8
  },
  progressLabel: {
    color: colors.accent,
    fontSize: 12,
    fontStyle: 'italic',
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 4
  },
  footerInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  footerText: {
    fontSize: text.size.tiny,
    fontStyle: 'italic',
    fontSize: 14
  }
})