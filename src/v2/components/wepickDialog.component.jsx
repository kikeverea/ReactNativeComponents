import { View, Modal, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import colors from '../styles/colors'
import Text from './text.component'
import text from '../styles/text'
import { ScrollView } from 'react-native-gesture-handler'

const WepickDialog = ({
  visible,
  width='60%',
  title,
  content,
  buttons,
  onClose
}) => {

  const buttonsLayout = {
    flexDirection: 'row',
    gap: 8,
    justifyContent: buttons?.length === 1 ? 'center' : 'space-between'
  }

  const dialogWitdth = {
    width: width
  }

  return (
    <Modal
      style={ styles.modal }
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={ onClose }
    >
      <Pressable style={ styles.centeredView } onPress={ onClose }>
        <View style={[ styles.dialogView, dialogWitdth, styles.shadow ]}>
          <Text style={ styles.title }>{ title }</Text>
          <ScrollView style={ styles.itemsContainer }>
            { content }
          </ScrollView>
          { buttons &&
            <View style={ buttonsLayout }>
              { buttons.map((button, ind) => 
                <TouchableOpacity
                  key={ ind }
                  activeOpacity={ 0.6 }
                  style={ styles.button }
                  onPress={ button.action }
                >
                  <Text style={styles.textStyle}>{ button.label }</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        </View>
      </Pressable>
    </Modal>
  )
}

export default WepickDialog

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom : 90
  },
  dialogView: {
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
  button: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginTop: 16,
    backgroundColor: colors.accentDark,
  },
  textStyle: {
    textAlign: 'center',
  },
  title: {
    marginBottom: 15,
    fontSize: text.size.title,
    textAlign: 'center',
  },
})