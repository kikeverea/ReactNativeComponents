import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'

const SIZE_CONSTANT = 32
const PADDING = 24

const Roundshape = ({
  content,
  text,
  onPress,
  size = SIZE_CONSTANT,
  color,
  textStyle,
  borderColor,
  absolute,
  style
}) => {

  const diameter = size + (PADDING + (size / SIZE_CONSTANT))
  
  const fontSize = textStyle?.fontSize ? textStyle.fontSize : 14
  const paddingText = (fontSize / 32 * 4)

  const display = content
    ? content
    : <Text style={[textStyle, { paddingBottom: paddingText }]}>{ text }</Text>

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
      borderWidth: borderColor ? 1 : 0,
      borderColor: borderColor,
      backgroundColor: color,
      justifyContent:'center',
      alignItems:'center',
      height: diameter,
      width: diameter,
      minWidth: diameter,
      maxHeight: diameter,
      borderRadius: diameter / 2
    }
  })

  const renderRoundshape = () => {
    return onPress
      ? <TouchableOpacity
              style={ styles.roundshape }
              activeOpacity={0.7}
              onPress={ onPress }
        >
          { display }
        </TouchableOpacity>
      : <View style={ styles.roundshape }>
          { display }
        </View>
  }

  return renderRoundshape()
}

export default Roundshape