import { View, StyleSheet } from 'react-native'
import colors from '../styles/colors'
import Text from './text.component'
import text from '../styles/text'
import WepickDialog from './wepickDialog.component'

const fieldsDictionary = {
  email: 'email',
  nick: 'nick',
  name: 'Nombre',
  town_id: 'Ciudad',
  country_id: 'País',
  nif: 'NIF',
  gender: 'Sexo',
  interests: 'Intereses'
}

const InvalidProfileDialog = ({
  visible,
  hideDialog,
  missingFileds,
  onClose
}) => {
  
  const closeDialog = goToProfile => {
    onClose(goToProfile)
    hideDialog()
  }

  const renderContent = () =>
    <View style={ styles.itemsContent }>
      { missingFileds.map((field, index) => (
        <Text key={ field+index }>{ `\u2022 ${fieldsDictionary[field]}` }</Text>
      ))}
    </View>

  return (
    <WepickDialog
      visible={visible}
      title='PERFIL INCOMPLETO'
      content={ renderContent() }
      buttons={[{ label: 'IR A PERFIL', action: () => closeDialog(true) }]}
      onClose={ () => closeDialog(false) }
    />
  )
}

export default InvalidProfileDialog

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom : 90
  },
  dialogView: {
    width: '60%',
    backgroundColor: colors.primaryDark,
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemsContainer: {
    maxHeight: 400
  },
  itemsContent: {
    padding: 8,
    gap: 8
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 16,
    backgroundColor: colors.accentDark,
  },
  textStyle: {
    textAlign: 'center',
  },
  titleContainer: {
    marginBottom: 15,
    backgroundColor: 'pink'
  },
  title: {
    fontSize: text.size.title,
    textAlign: 'center',
    marginBottom: 16
  }
})