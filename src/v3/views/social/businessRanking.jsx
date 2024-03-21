import { useState } from 'react'
import Ranking from '../../components/ranking.component'
import WepickDialog from '../../components/wepickDialog.component'
import { StyleSheet, View } from 'react-native'
import InfoItem from '../../components/infoItem.compoent'
import WepickView from '../../components/wepickView.component'

const BrandsRanking = () => {

  const [showBusiness, setShowBusiness] = useState(null)

  const testRanking = [
    { pos: '1.', name: 'AXE', points: '135146', isElite: false },
    { pos: '2.', name: 'Lexus', points: '56462', isElite: true },,
    { pos: '3.', name: 'Ford', points: '326881', isElite: false },,
    { pos: '4.', name: 'Toyota', points: '321646', isElite: false },,
    { pos: '5.', name: 'Samsung', points: '835542', isElite: true },,
    { pos: '6.', name: 'Google', points: '9832583', isElite: true },,
    { pos: '7.', name: 'UPS', points: '56894', isElite: true },,
    { pos: '8.', name: 'Amazon', points: '87568', isElite: true },,
    { pos: '9.', name: 'Apple', points: '4836', isElite: false },,
    { pos: '10.', name: 'Tesla', points: '7785', isElite: false },
  ]

  const renderBusinessDialog = () => {
    return (
      <View>
        <InfoItem item={{ name: 'Posición', value: showBusiness.pos }}/>
        <InfoItem item={{ name: 'Marca', value: showBusiness.name }}/>
        <InfoItem item={{ name: 'Puntos', value: showBusiness.points }}/>
      </View>
    )
  }

  return (
    <WepickView style={ styles.container }>
      <Ranking
        dataHeader={[ 'POS', 'Marca', 'Puntos' ]}
        columnsData={[
          business => business.pos,
          business => business.name,
          business => business.points,
        ]}
        onItemPressed={ business => setShowBusiness(business) }
        data={ testRanking }
      />
      { showBusiness &&
        <WepickDialog
          visible={ true }
          title='INFO'
          content={ renderBusinessDialog() }
          onClose={ () => setShowBusiness(null) }
        />
       }
    </WepickView>
  )
}

export default BrandsRanking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '8%'
  }
})