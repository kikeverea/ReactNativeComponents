import { useState } from "react"
import Ranking from "../../components/ranking.component"
import { StyleSheet, View } from "react-native"
import WepickView from "../../components/wepickView.component"
import WepickDialog from "../../components/wepickDialog.component"
import InfoItem from "../../components/infoItem.compoent"

const UsersRanking = () => {

  const [showUser, setShowUser] = useState(null)

  const testRanking = [
    { pos: '1.', nick: 'Susana Oria', points: '135146', isElite: false },
    { pos: '2.', nick: 'Elsa Pato', points: '56462', isElite: true },
    { pos: '3.', nick: 'Elmer Cado', points: '326881', isElite: true },
    { pos: '4.', nick: 'Alan Brito', points: '321646', isElite: true },
    { pos: '5.', nick: 'Aquiles Bailo', points: '835542', isElite: false },
    { pos: '6.', nick: 'Elvis Teck', points: '9832583', isElite: true },
    { pos: '7.', nick: 'Elon Bligo', points: '56894', isElite: true },
    { pos: '8.', nick: 'Elena No', points: '87568', isElite: false },
    { pos: '9.', nick: 'Aitor Tilla', points: '4836', isElite: false },
    { pos: '10.', nick: 'Elton Tito', points: '7785', isElite: false }
  ]

  const renderUserDialog = () => {
    return (
      <View>
        <InfoItem item={{ name: 'Posición', value: showUser.pos }}/>
        <InfoItem item={{ name: 'Nick', value: showUser.nick }}/>
        <InfoItem item={{ name: 'Puntos', value: showUser.points }}/>
      </View>
    )
  }

  return (
    <WepickView style={ styles.container }>
      <Ranking
        dataHeader={[ 'POS', 'Usuario', 'Puntos' ]}
        columnsData={[
          user => user.pos,
          user => user.nick,
          user => user.points,
        ]}
        dataFooter={{ pos: '5263.', nick: 'Yo User', points: '12', isElite: false }}
        onItemPressed={ user => setShowUser(user) }
        data={ testRanking }
      />
      { showUser &&
        <WepickDialog
          visible={ true }
          title='INFO'
          closeButton='default'
          content={ renderUserDialog() }
          onClose={ () => setShowUser(null) }
        />
       }
    </WepickView>
  )
}

export default UsersRanking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '8%'
  }
})
