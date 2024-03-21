import { View, Modal, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import colors from '../styles/colors'
import Text from './text.component'
import text from '../styles/text'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const WepickDialog = ({
  visible,
  width='60%',
  title,
  content,
  buttons,
  closeButton='default',
  onClose,
  closeOnTouch=true
}) => {

  const buttonsLayout = {
    flexDirection: 'row',
    gap: 8,
    justifyContent: buttons?.length === 1 ? 'center' : 'space-between'
  }

  const dialogWitdth = {
    width: width
  }

  const renderDefaultCloseButton = () => {
    return renderCloseButton(<Icon name='close' size={ 24 } color={ colors.accent } />, onClose)
  }
  
  const renderCloseButton = (icon, action) =>  
    <TouchableOpacity
      style={ styles.closeButton }
      activeOpacity={ 0.6 }
      onPress={ action }
      >
      { icon }
    </TouchableOpacity>

  const doAction = button => {
    onClose()
    button.action()
  }

  return (
    <Modal
      style={ styles.modal }
      animationType='slide'
      transparent={ true }
      visible={ visible }
      supportedOrientations={['portrait', 'landscape']}
      onRequestClose={ closeOnTouch ? onClose : () => {} }
    >
      <Pressable style={ styles.centeredView } onPress={ () => closeOnTouch && onClose() }>
        <Pressable
          style={[ styles.dialogView, dialogWitdth, styles.shadow ]}
          onPress={ () => false }    // ensures this dialog closes only when there is a touch event outside of it
        >
          <View style={ styles.titleContainer }>
            { closeButton &&
              <View style={ styles.closeButton } />   // padding view
            }
            <Text style={ styles.title }>{ title }</Text>
            { closeButton &&
              (closeButton === 'default'
                ? renderDefaultCloseButton()
                : renderCloseButton(closeButton.icon, closeButton.action))
            }
          </View>
          <ScrollView style={ styles.contentContainer }>
            <Pressable
              // DO NOT REMOVE --> ensures swipe events are picked by the scroll view
            >             
              { content }
            </Pressable>
          </ScrollView>
          { buttons &&
            <View style={ buttonsLayout }>
              { buttons.map((button, ind) => 
                <TouchableOpacity
                  key={ ind }
                  activeOpacity={ 0.6 }
                  style={ styles.button }
                  onPress={ () => doAction(button) }
                >
                  <Text style={styles.textStyle}>{ button.label }</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        </Pressable>
      </Pressable>
    </Modal>
  )
}

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
  closeButton: {
    paddingVertical: 4,
    width: '12%',
    alignItems: 'center',
  },
  contentContainer: {
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
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  title: {
    flex: 1,
    fontSize: text.size.title,
    textAlign: 'center',
  },
})

export default WepickDialog