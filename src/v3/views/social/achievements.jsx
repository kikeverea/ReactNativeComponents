import { Image, StyleSheet, View } from 'react-native'
import AsyncList from '../../components/asyncList.component'
import AchievementCard from '../../components/achievementCard.component'
import { useEffect, useState } from 'react'
import FilterButton from '../../components/filterButton.component'
import WepickView from '../../components/wepickView.component'
import colors from '../../styles/colors'
import Text from '../../components/text.component'

import achievementBadge from '../../assets/icons/achievement.png'

const mockAchievements = [
  {
    id: 1,
    achievement: 'Consigue participaciones visualizando anuncios',
    timeLeft: '2d 7h 5min',
    xp: 300,
    totalTimes: 200,
    timesReached: 200,
  },
  {
    id: 2,
    achievement: 'Responde correctamente preguntas de control segudias',
    timeLeft: '2d 7h 5min',
    xp: 250,
    totalTimes: 75,
    timesReached: 18,
  },
  {
    id: 3,
    achievement: 'Responde correctamente preguntas',
    timeLeft: 'Indefinido',
    xp: 50,
    totalTimes: 3,
    timesReached: 1,
  },
]

const Achievements = () => {

  const [achievements, setAchievements] = useState(null)

  useEffect(() => {
    setTimeout(() => setAchievements(mockAchievements), 800)
  },
  [])

  const renderExpPointsLegend = () => {
    return (
      <View style={ styles.expLegend }>
        <Image source={ achievementBadge } style={ styles.expBadge } resizeMode='contain'/>
        <Text>1 EXP = 1 PUNTO</Text>
      </View>
    )
  }

  return (
    <WepickView>
      <View style={ styles.container }>
        <View style={ styles.content }>
          <AsyncList
            data={ achievements }
            loading={ !achievements }
            showsVerticalScrollIndicator={ false }
            renderItem={({item}) => <AchievementCard achievement={ item } />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={ <View style={{ height: 20 }}/> }
            ListFooterComponent={ renderExpPointsLegend() }
          />
        </View>
      </View>
    </WepickView>
  )
}

export default Achievements

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: '8%',
    justifyContent: 'space-between'
  },
  content: {
    paddingVertical: '4%',
    flex: 1,
    gap: 16,
  },
  expLegend: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 24,
    marginTop: 16
  },
  expBadge: {
    width: 40,
    height: 40,
  }
})