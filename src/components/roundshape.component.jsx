import { TouchableOpacity, StyleSheet } from 'react-native'

const Roundshape = ({ content, doAction, size = 1, color, borderColor, absolute, style }) => {
  
  const SIZE_CONSTANT = 24
  const diameter = size + (SIZE_CONSTANT * 32 / size)

  const position = absolute
    ? {
        position: 'absolute',
        ...absolute
      }
    : { position: 'relative' }

  const styles = StyleSheet.create({
    roundshape: {
      ...style,
      ...position,
      color: borderColor,
      borderWidth: borderColor ? 1 : 0,
      borderColor: borderColor,
      backgroundColor: color,
      justifyContent:'center',
      alignItems:'center',
      paddingBottom: diameter / SIZE_CONSTANT,
      height: diameter,
      width: diameter,
      minWidth: diameter,
      maxHeight: diameter,
      borderRadius: diameter / 2  // height / 2
    }
  })

  return (
    <TouchableOpacity
          style={ styles.roundshape }
          activeOpacity={0.7}
          onPress={ doAction }
    >
      { content }
    </TouchableOpacity>
  )
}

export default Roundshape