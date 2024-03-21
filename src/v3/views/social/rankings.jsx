import { StyleSheet, View } from 'react-native'

import WepickView from '../../components/wepickView.component'
import ActionButton from '../../components/actionButton.component'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from 'react'
import colors from '../../styles/colors'

const Rankings = ({ navigation }) => {

  const [loadingUsersRankings, setLoadingUsersRankings] = useState(false)
  const [loadingBrandsRankings, setLoadingBrandsRankings] = useState(false)

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setLoadingUsersRankings(false)
      setLoadingBrandsRankings(false)
    })
    
    return () => unsubscribeBlur()
  },
  [])

  const renderIcon = icon =>
    <View style={ styles.roundshape }>{ icon }</View>

  return (
    <WepickView style={ styles.container }>
       <ActionButton
        label='RANKING USUARIOS'
        style={ styles.actionButton }
        decorationGap={ 15 }
        decorationWidth='25%'
        decorationAngle={ 72 }
        icon={ renderIcon(<Icon name='podium' color={ colors.primaryDark } size={ 18 }/>) }
        loading={ loadingUsersRankings }
        startLoading={ () => setLoadingUsersRankings(true) }
        stopLoading={ () => setLoadingUsersRankings(false) }
        onPress={ () => navigation.navigate('users_ranking') }
      />
      <ActionButton
        label='RANKING MARCAS'
        style={ styles.actionButton }
        decorationGap={ 15 }
        decorationWidth='25%'
        decorationAngle={ 72 }
        icon={ renderIcon(<Icon name='podium' color={ colors.primaryDark } size={ 18 }/>) }
        loading={ loadingBrandsRankings }
        startLoading={ () => setLoadingBrandsRankings(true) }
        stopLoading={ () => setLoadingBrandsRankings(false) }
        onPress={ () => navigation.navigate('brands_ranking') }
      />
    </WepickView>
  )
}

export default Rankings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8%',
    gap: 30,
    paddingBottom: 60
  },
  title: {
    fontSize: 32,
    marginBottom: 40
  },
  button: {
    width: '90%',
    padding: 30
  },
  buttonLabel: {
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