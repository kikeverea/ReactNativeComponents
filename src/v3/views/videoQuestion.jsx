import { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import { lockToPortrait } from 'react-native-orientation-manager'
import colors from '../styles/colors'
import WepickView from '../components/wepickView.component'
import AppBar from '../components/appbar.component'
import Text from '../components/text.component'
import text from '../styles/text'
import ActionButton from '../components/actionButton.component'
import { sendControlAnswerResponse } from '../services/campaings.service'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import WepickDialog from '../components/wepickDialog.component'
import { useNavigation } from '@react-navigation/native'
import useRequireAuth from '../hooks/useRequireAuth'

const A = 65

const VideoQuestion = ({ question, campaignId, onReplayRequest, playNextVideo, isLast }) => {

  useLayoutEffect(() => {   // use useLayoutEffect to avoid rotating the screen after the view is rendered
    lockToPortrait()
  }, [])

  const [waitingForReply, setWaitingForReply] = useState(null)
  const [result, setResult] = useState(null)

  const { width, height } = useWindowDimensions()
  const navigation = useNavigation()

  const authFailed = useRequireAuth()

  const isPortrait = width < height
  const sizeFactor = isPortrait ? width : height

  const headerStyle = { 
    title: {
      fontSize: sizeFactor / 10,
      fontWeight: 'bold'
    },
    content: {
      fontSize: sizeFactor / 20
    }
  }

  const submitAnswer = async answer => {
    const result = await sendControlAnswerResponse(answer, campaignId, authFailed)

    setWaitingForReply(null)
    setResult(result)
  }

  const renderResult = () => {
    const message = result.success ? result.data.message : result.data.message.error
    return <View>
      <Text style={ styles.result }>{ message }</Text>
      <Text style={ styles.result }>{ message }</Text>

    </View>
    
  }

  const navigateHome = () => {
    setResult(null)
    navigation.navigate('home')
  }

  const nextVideo = () => {
    setResult(null)
    playNextVideo()
  }
  
  return (
    <WepickView style={ styles.container }>
      <AppBar title='PRINCIPAL' goBack={ false } />
      <View>
        <Text style={ headerStyle.title }>Pregunta Control</Text>
        <Text style={ headerStyle.content }>{ question.title }</Text>
      </View>
      <View style={ styles.answersContainer }>
        { question.control_answers.map((answer, i) =>
          <ActionButton
            key={ answer.id }
            label={ answer.title }
            style={ styles.answer }
            decorationWidth='22%'
            decorationAngle={ 67 }
            decorationGap={ 4 }
            icon={ <Text style={ styles.option }>{ String.fromCharCode(A + i) }</Text> }
            loading={ waitingForReply && waitingForReply === answer.id }
            startLoading={ () => setWaitingForReply(answer.id) }
            stopLoading={ () => setWaitingForReply(null) }
            onPress={ () => submitAnswer(answer) }
          />
        )}
        <TouchableOpacity 
          style={ styles.submitButton }
          activeOpacity={ 0.6 }
          onPress={ onReplayRequest }
        >
          <Icon name='play-circle-outline' color={ colors.accent } size={ 28 } />
          <Text style={ styles.buttonLabel }>VOLVER A VER EL ANUNCIO</Text>
        </TouchableOpacity>
      </View>
      { result &&
        <WepickDialog
          visible={ true }
          closeButton={ !result.success && {
            icon: <Icon name='replay' color={ colors.accent } size={ 24 } />,
            action: onReplayRequest
          }}
          width='80%'
          title='RESULTADO'
          content={ renderResult() }
          buttons={
            isLast
              ? [ { label: 'FINALIZAR', action: navigateHome } ]
              : [
                  { label: 'IR A HOME', action: navigateHome },
                  { label: 'SIGUIENTE', action: nextVideo },
                ]
          }
          onClose={ () => setResult(null) }
          closeOnTouch={ false }
        />
      }
    </WepickView>
  )
}

export default VideoQuestion

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  answersContainer: {
    flex: 1,
    gap: 16,
    paddingHorizontal: '10%',
    paddingBottom: '8%',
    justifyContent: 'center',
    width: '100%'
  },
  answer: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
  },
  option: {
    fontSize: text.size.button,
    fontStyle: 'italic',
    paddingRight: 4,
    paddingBottom: 4,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 16,
    paddingVertical: 8,
    textAlign: 'center',
    borderRadius: 4
  },
  buttonLabel: {
    fontSize: text.size.header,
    fontWeight: 'regular'
  },
  result: {
    padding: 10,
    textAlign: 'center'
  }
})