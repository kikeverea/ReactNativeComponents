import { ActivityIndicator, StyleSheet, View } from 'react-native'

import Text from '../components/text.component'
import colors from '../styles/colors'

import { formatCurrency, formatNumber } from '../helpers/numberFormat'
import { useEffect, useState } from 'react'
import { iCoalsToEuros } from '../helpers/iCoalConverter.helper'
import { getJackpot } from '../services/campaings.service'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AlertDialog from '../components/alertDialog.component'
import ProgressBar from '../components/progressBar.component'
import { getParticipationTime, getVisualizedTimeForNextParticipation } from '../services/user.service'
import WepickJackpotView from '../components/wepickJackpotView.component'

const Jackpot = () => {
 
  const [jackpot, setJackpot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showParticipations, setShowParticipations] = useState(null)
  
  const [participationTime, setParticipationTime] = useState(null)
  const [visualizedTimeForParticipation, setVisualizedTimeForParticipation] = useState(null)

  const [timeLeft, setTimeLeft] = useState({ days: 365, hours: 24, mins: 60 })

  const parseTime = time => {

    const regex = /\s(d|h|min)/gi
    const [days, hours, mins] = time.replaceAll(regex, '').trim().split(' ')

    return { days, hours, mins }
  }

  const formatTime = time =>
    `${time.days} d ${time.hours} h ${time.mins} min`

  const passMinute = () => {
    const mins = timeLeft.mins - 1
    const hours = mins < 0 ? timeLeft.hours - 1 : timeLeft.hours
    const days = hours < 0 ? timeLeft.days - 1 : timeLeft.days
  
    setTimeLeft({
      days: days,
      hours: hours < 0 ? 23 : hours,
      mins: mins < 0 ? 59 : mins
    })
  }

  useEffect(() => {

    const init = async () => {
      const jackpot = await getJackpot()
      const participationTime = await getParticipationTime()
      const visualizedTime = await getVisualizedTimeForNextParticipation()

      setJackpot(jackpot)
      setTimeLeft(parseTime(jackpot.time_left))
      setParticipationTime(participationTime.data)
      setVisualizedTimeForParticipation(visualizedTime.data)
      setLoading(false)
    }

    init()
  },
  [])

  useEffect(() => {
    const id = setTimeout(passMinute, 60000)
    return () => clearTimeout(id)

  }, [passMinute, timeLeft])

  if (loading) {
    return (
      <WepickJackpotView style={ styles.container }>
        <View style={ styles.indicator }>
          <ActivityIndicator size='large' color={ colors.accent} />
        </View>
      </WepickJackpotView>
    )
  }

  return (
    <WepickJackpotView style={ styles.container }>
      <View style={ styles.counterContainer }>
        <Text style={ styles.counterSubtitle }>Tiempo Restante</Text>
        <Text style={ styles.counter }>{ formatTime(timeLeft) }</Text>
      </View>
      <View style={ styles.jackpot }>
        <View>
          <Text style={ styles.title }>
            { formatCurrency(jackpot.credit, '') }<Text style={ styles.icoal }>iCoals</Text>
          </Text>
          <Text style={ styles.header }>
            { `(${formatCurrency(iCoalsToEuros(jackpot.credit), '€')})` }
          </Text>
        </View>
        <Text style={ styles.header }>
          { formatNumber(jackpot.total_participations) } participaciones totales
        </Text>
        <Text style={ styles.header }>
          { formatNumber(jackpot.total_participants) } participantes totales
        </Text>
        <View>
        <TouchableOpacity
            activeOpacity={ 0.6 }
            onPress={ () => setShowParticipations(jackpot.your_participations) }
          >
            <Text style={ styles.header }>
              Tus participaciones
            </Text>
            <Text style={ styles.title }>
              { formatNumber(jackpot.your_participations.length) }
            </Text>
          </TouchableOpacity>
        </View>
        <ProgressBar
          label='Segundos para una nueva participación'
          current={ visualizedTimeForParticipation }
          textColor={ colors.accent }
          color={ colors.primaryDark }
          unfilledColor={ colors.primaryLight }
          max={ participationTime }
        />
      </View>
      { showParticipations &&
        <AlertDialog
          info={{
            title: 'PARTICIPACIONES',
            info: jackpot.your_participations.length === 0
              ? ['No tienes participaciones']
              : showParticipations.map(participation => participation.id)    
          }}
          centerContent
          onClose={ () => setShowParticipations(null) }
        />
      }
    </WepickJackpotView>
  )
}

export default Jackpot

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '4%',
    gap: 16
  },
  counterContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 16,
    backgroundColor: colors.primaryDarkTransparent
  },
  counter: {
    fontSize: 32
  },
  counterSubtitle: {
    fontSize: 24
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  jackpot: {
    height: '70%',
    borderRadius: 16,
    paddingVertical: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.primaryTransparent
  },
  title: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold'
  },
  header: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'regular'
  },
  icoal: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  icoalIcon: {
    width: 16,
    height: 16,
  }
})