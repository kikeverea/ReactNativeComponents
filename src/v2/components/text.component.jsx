import { Text as NativeText } from 'react-native'
import colors from '../styles/colors'

const Text = (props) => {

  const style = props.style

  const resolveFontFamily = style => {
    const weight = style && style.fontWeight
    const fontStyle = style && style.fontStyle

    if (fontStyle === 'italic') {
      return weight === 'light'
        ? 'Aero Matics Light Italic'
        : 'Aero Matics Italic'
    }

    switch (weight) {
      case ('bold') :
        return 'Aero Matics Bold'

      case ('regular') :
        return 'Aero Matics Display Regular'
        
      default :
        return 'Aero Matics Light'
    }
  }
 
  const fontSize = style?.fontSize ? style.fontSize : 16
  const fontFamily = style && style.fontFamily ? style.fontFamily : resolveFontFamily(style)
  const color = style?.color ? style.color : colors.textPrimary

  const styles = {
    ...style,
    color: color,
    fontSize: fontSize,
    fontFamily: fontFamily,
    fontWeight: 'normal',
    fontStyle: 'normal'
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