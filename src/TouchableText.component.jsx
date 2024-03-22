import { Text, TouchableOpacity } from 'react-native'

const TouchableText = ({ text, style={ padding: 6 }, textStyle, ...props}) => {
  return (
    <TouchableOpacity style={ style } { ...props }>
      <Text style={ textStyle }>{ text }</Text>
    </TouchableOpacity>
  )
}

export default TouchableText