import { Text as NativeText } from 'react-native'

const Text = (props) => {

  const style = props.style

  const familyForWeight = style => {
    const weight = style && style.fontWeight
    
    switch (weight) {
      case 'black' :
        return 'Lato-Black'
      case 'bold' :
        return 'Lato-Bold'
      case 'light' :
        return 'Lato-Light'
      default :
        return 'Lato-Regular'
    }
  }
 
  const size = style && style.fontSize ? style.fontSize : 14
  const fontFamily = style && style.fontFamily ? style.fontFamily : familyForWeight(style)

  const minLineHeight = size + 5

  const styles = {
    ...style,
    fontFamily: fontFamily,
    lineHeight: style?.lineHeight ? Math.max(style.lineHeight, minLineHeight) : minLineHeight,
    fontWeight: 'normal'
  }

  return <NativeText numberOfLines={ props.numberOfLines } style={{...styles}} props={ props }>{ props.children }</NativeText>
}

export default Text