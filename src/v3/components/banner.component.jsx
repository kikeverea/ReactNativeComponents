import { StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../styles/colors'
import textStyles from '../styles/text'

import Text from './text.component'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import AlertDialog from './alertDialog.component'

const Banner = ({ text, textSecondary, style, fontSize=textStyles.size.title, showInfo }) => {

  const [showInfoDialog, setShowInfoDialog] = useState(false)

  return (
    <View style={[ styles.container, style ]}>
      { showInfo && <View style={ styles.paddingView } /> }
      <View style={ styles.textContainer }>
        { textSecondary && 
          <Text style={{ ...styles.text, fontSize: Math.max(fontSize - 4, 16) }}>
            { textSecondary }
          </Text>
        }
        <Text style={{ ...styles.text, fontSize: fontSize, fontWeight: 'bold' }}>
          { text }
        </Text>
      </View>
      { showInfo &&
        <TouchableOpacity
          style={ styles.infoButton }
          activeOpacity={ 0.7 }
          onPress={ () => setShowInfoDialog(true) }
        >
          <Icon name={ 'information-outline' } color={ colors.accent } size={ 32 } />
        </TouchableOpacity>
      }
      {
        showInfoDialog &&
        <AlertDialog
          info={ showInfo }
          onClose={ () => setShowInfoDialog(false) }
        />
      }
    </View>
  )
}

export default Banner  

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderTopColor: colors.white,
    borderBottomColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: colors.textPrimary,
    textAlign: 'center'
  },
  textSecondary: {
    color: colors.textPrimary,
    textAlign: 'center'
  },
  paddingView: {
    paddingVertical: 4,
    width: 32 + 24,         // info icon width (32) + infoButton padding (12 + 12)
  },
  infoButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  }
})