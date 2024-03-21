import { Text as NativeText, Platform } from 'react-native'
import colors from '../styles/colors'
import { resolveFontFamily } from '../helpers/customFont.helper'

const Text = (props) => {

  const style = props.style || {}

  const fontSize = style.fontSize ? style.fontSize : 16
  const color = style.color ? style.color : colors.textPrimary
  const fontFamily = style.fontFamily
    ? style.fontFamily
    : resolveFontFamily(Platform.OS, style.fontStyle, style.fontWeight)

  const styles = {
    ...style,
    color: color,
    fontSize: fontSize,
    fontFamily: fontFamily,
  }

  if (Platform.OS === 'android') {
    styles.fontWeight = 'normal',
    styles.fontStyle = 'normal'
  }

  return (
    <NativeText
      numberOfLines={ props.numberOfLines }
      style={{...styles}}
    >
        { props.children }
    </NativeText>)
}

export default Text