import { StyleSheet, View } from 'react-native'
import text from '../styles/text'
import WepickDialog from './wepickDialog.component'
import Text from './text.component'

const AlertDialog = ({ info, onClose, centerContent }) => {

  const renderText = (text, style, key) => {
    return (
      <Text key={ key } style={ style }>
        { text }
      </Text>
    )
  }

  const renderContent = content =>
    <View style={[ styles.infoContainer, centerContent && { alignItems: 'center'} ]}>
        { content.info.map((text, index) => renderText(text, styles.info, index) )}
        { content.highlight &&
          content.highlight.map((text, index) => renderText(text, styles.infoHighlight, index)
        )}
    </View>

  return (
      <WepickDialog
        visible={ true }
        width='85%'
        title={ info.title }
        content={ renderContent(info) }
        buttons={ info.button && [ info.button ]}
        closeButton='default'
        onClose={ onClose }
      />
  )
}

const styles = StyleSheet.create({
    infoContainer: {
        padding: 8,
        gap: 8
    },
    info: {
        fontSize: text.size.header,
        lineHeight: 22
    },
    infoHighlight: {
        fontSize: text.size.header,
        lineHeight: 22,
        fontWeight: 'regular'
    }
})

export default AlertDialog