import React, { useEffect, useState, useContext } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import colors from '../styles/colors'
import WepickView from '../components/wepickView.component'
import ActionButton from '../components/actionButton.component'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { me, getMaxTime, getUsedTime } from '../services/user.service'

import icoal from '../assets/icons/icoal_dark.png'
import { validateUserProfile } from '../helpers/validateProfile'
import InvalidProfileDialog from '../components/invalidProfileDialog.component'
import WepickDialog from '../components/wepickDialog.component'
import Text from '../components/text.component'
import { getCampaigns } from '../services/campaings.service'
import useRequireAuth from '../hooks/useRequireAuth'
import Toast from 'react-native-toast-message'
import ProgressBar from '../components/progressBar.component'
import AlertDialog from '../components/alertDialog.component'
import { checkZeroHour } from '../services/app.service'
import StatusAppContext from '../contexts/StatusAppContext'
import { useNavigation } from '@react-navigation/native'

const TIME_LIMIT_REACHED = 'Has completado el tiempo límite de hoy/Ahora mismo ya no quedan más anuncios por ver, ' +
                          '¡Tómate un descanso! Vuelve en otro momento y podrás seguir viendo anuncios y ganando ' +
                          'participaciones.'

const TIME_LIMIT_INFO_1 = 'Este contador de segundos indica el máximo tiempo establecido para un usuario que desee '
const TIME_LIMIT_INFO_2 = 'Se reinicia cada ciclo diario (20:00 CET)'

const Home = () => {
  
  const [loadingCampaigns, setLoadingCampaigns] = useState(false)
  const [loadingJackpot, setLoadingJackpot] = useState(false)
  const [missingProfileFields, setMissingProfileFields] = useState([])
  const [showMessage, setShowMessage] = useState(null)
  const [showInfoTime, setShowInfoTime] = useState(false)
  const [modalMaxTime, setModalMaxTime] = useState(false)
  const [maxTime, setMaxTime] = useState(null)
  const [usedTime, setUsedTime] = useState(null)
  const [_appIsActive, setAppIsActive] = useContext(StatusAppContext)

  const authFailed = useRequireAuth()

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setLoadingJackpot(false)
      setLoadingCampaigns(false)
    })

    const unsubscribeFocus = navigation.addListener('focus', () => {
      getUsedTime(authFailed).then(res => {
        setUsedTime(res.data)
      })
    })

    getMaxTime(authFailed).then(res => setMaxTime(res.data))

    return () => {
      unsubscribeBlur()
      unsubscribeFocus()
    }
  },[])

  useEffect(() => {
    if (maxTime !== null && usedTime !== null && maxTime == usedTime) {
      setModalMaxTime(true)
    }
    
    navigation.addListener('focus', () => {
      if (maxTime !== null && usedTime !== null && maxTime == usedTime) {
        setModalMaxTime(true)
      }
    })
  }, [usedTime, maxTime])

  const checkAppIsActive = async (event) => {
    console.log('cehckapp')
    checkZeroHour(authFailed).then(res => {
      if (res == false) {
        setAppIsActive(res)
      } else {
        event
      }
    })
  }

  const launchCampaigns = async () => {
    
    const userProfile = await me()
    const missingFields = validateUserProfile(userProfile)
    
    if (missingFields && missingFields.length > 0) {
      setMissingProfileFields(missingFields)
      setLoadingCampaigns(false)
    }
    else {
      const campaigns = await getCampaigns(authFailed)

      if (campaigns.error) {
        Toast.show({
          type: 'warning',
          text1: 'Se ha producido un error al reproducir los anuncios. Inténtalo de nuevo más tarde',
          position: 'bottom',
          visibilityTime: 4000
        });
      }
      else if (!campaigns || campaigns.length === 0) {
        setShowMessage('No hay campañas disponibles en este momento')
      }
      else if (campaigns.error) {
        setShowMessage(campaigns.message.error)
      }
      else {
        navigation.navigate('campaigns', { campaigns: campaigns })
      }

      setLoadingCampaigns(false)
    }
  }

  const dismissMissingFieldsDialog = goToProfile => {
    setMissingProfileFields([])
    
    if (goToProfile)
      navigation.navigate('Usuario')
  }

  const renderIcon = icon =>
    <View style={ styles.roundshape }>{ icon }</View>

  return (
    <WepickView style={ styles.container }>
      <View style={ styles.buttonsContainer }>
        <ActionButton
          label='VER ANUNCIOS'
          style={ styles.actionButton }
          decorationGap={ 30 }
          decorationWidth='30%'
          decorationAngle={ 70 }
          icon={renderIcon(<Icon name='play' size={ 24 } color={ colors.primaryDark }/>) }
          loading={ loadingCampaigns }
          startLoading={ () => setLoadingCampaigns(true) }
          stopLoading={ () => setLoadingCampaigns(false) }
          onPress={() => checkAppIsActive(launchCampaigns()) }
        />
        <ActionButton
          label='VER BOTE'
          style={ styles.actionButton }
          decorationGap={ 30 }
          decorationWidth='30%'
          decorationAngle={ 70 }
          icon={ renderIcon(<Image source={ icoal } style={{ width: 18, height: 18 }}/>) }
          loading={ loadingJackpot }
          startLoading={ () => setLoadingJackpot(true) }
          stopLoading={ () => setLoadingJackpot(false) }
          onPress={ () => checkAppIsActive(navigation.navigate('jackpot')) }
        />
      </View>
      <View style={ styles.progressBarContainer}>
        <ProgressBar
          label='Segundos disponibles'
          current={ usedTime }
          max={ maxTime }
          onFilledMessage={ TIME_LIMIT_REACHED }
          press={() => setShowInfoTime(true)}
        />
      </View>

      <InvalidProfileDialog
        visible={ missingProfileFields.length > 0 }
        missingFileds={ missingProfileFields }
        hideDialog={ dismissMissingFieldsDialog }
        onClose={ dismissMissingFieldsDialog }
      />
      { showMessage && 
        <WepickDialog
          visible={ true }
          title='NO PUEDES VER ANUNCIOS'
          width='80%'
          content={ <Text style={ styles.message }>{ showMessage }</Text> }
          closeButton='default'
          onClose={ () => setShowMessage(null) }
        />
      }

      { showInfoTime && 
        <AlertDialog
          info={{
            title:'Contador de segundos',
            info: [ TIME_LIMIT_INFO_1 ],
            highlight: [ TIME_LIMIT_INFO_2 ]
          }}
          onClose={ () => setShowInfoTime(false) }
        />
      }

      { modalMaxTime && 
        <AlertDialog
          info={{
            title: '¡Tiempo completado!',
            info: ['Has completado el tiempo límite de hoy/Ahora mismo ya no quedan más anuncios por ver, ¡Tómate un descanso!'],
            highlight: ['Vuelve en otro momento y podrás seguir viendo anuncios y ganando participaciones']
          }}
          onClose={ () => setModalMaxTime(false) }
        />
      }
    </WepickView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '6%'
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  actionButton: {
    width: '80%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopStartRadius: 12,
    borderBottomStartRadius: 12,
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
  },
  roundshape: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
    padding: 16
  },
  progressBarContainer: {
    alignItems: 'center'
  }
})