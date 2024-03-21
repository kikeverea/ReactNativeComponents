import { StyleSheet, View } from 'react-native'

import WepickView from '../../components/wepickView.component'
import ActionButton from '../../components/actionButton.component'
import { useState, useEffect } from 'react'
import colors from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'

const Social = ({ navigation }) => {

  const [loadingPosts, setLoadingPosts] = useState(false)
  const [loadingRankings, setLoadingRankings] = useState(false)
  const [loadingAchievements, setLoadingAchievements] = useState(false)

  const renderIcon = icon =>
    <View style={ styles.roundshape }>{ icon }</View>

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setLoadingPosts(false)
      setLoadingRankings(false)
      setLoadingAchievements(false)
    })

    
    return () => unsubscribeBlur()
  },
  [])
  
  return (
    <WepickView style={ styles.container }>
      <ActionButton
        label='NOTICIAS'
        style={ styles.actionButton }
        decorationGap={ 40 }
        decorationWidth='25%'
        decorationAngle={ 72 }
        icon={ renderIcon(<Icon name='newspaper-variant-outline' color={ colors.primaryDark } size={ 18 }/>) }
        loading={ loadingPosts }
        startLoading={ () => setLoadingPosts(true) }
        stopLoading={ () => setLoadingPosts(false) }
        onPress={ () => navigation.navigate('posts') }
      />
      <ActionButton
        label='RANKINGS'
        style={ styles.actionButton }
        decorationGap={ 40 }
        decorationWidth='25%'
        decorationAngle={ 72 }
        icon={ renderIcon(<Icon name='podium' color={ colors.primaryDark } size={ 18 }/>) }
        loading={ loadingRankings }
        startLoading={ () => setLoadingRankings(true) }
        stopLoading={ () => setLoadingRankings(false) }
        onPress={ () => navigation.navigate('rankings') }
      />
      <ActionButton
        label='LOGROS'
        style={ styles.actionButton }
        decorationGap={ 40 }
        decorationWidth='25%'
        decorationAngle={ 72 }
        icon={ renderIcon(<Icon name='medal-outline' color={ colors.primaryDark } size={ 19 }/>) }
        loading={ loadingAchievements }
        startLoading={ () => setLoadingAchievements(true) }
        stopLoading={ () => setLoadingAchievements(false) }
        onPress={ () => navigation.navigate('achievements') }
      />
    </WepickView>
  )
}

export default Social

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8%',
    gap: 40
  },
  title: {
    fontSize: 32,
    marginBottom: 16
  },
  button: {
    width: '90%',
    padding: 30,
  },
  buttonLabel: {
    fontStyle: 'italic',
    fontSize: 24
  },
  actionButton: {
    width: '95%',
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
})