import React from 'react'
import { View } from 'react-native'

const Skeleton = ({ style, children, loading }) => {
  return (
    loading
      ? createSkeleton(children, style)
      : <View style={ style }>{ children }</View>
  )
}

const createSkeleton = (components, containerStyle) => {
  return (
    <View style={ containerStyle }>
      {
        React.Children.map((components), (element, index) =>
          React.isValidElement(element) && renderChild(element, index))
      }
    </View>
  )
}

const renderChild = (child, key) => {

  const props = child.props
  const isText = props.children === 'text'
  const isContainer =
    !isText &&
    Array.isArray(props.children) &&
    props.children.length > 1

  const style = {
    flex,
    flexDirection,
    width,
    height,
    alignItems,
    justifyContent,
    gap,
    padding,
    paddingHorizontal,
    paddingVertical,
    margin,
    marginHorizontal,
    marginVertical
  }
  = isText ? createStyleForText(props) : props.skeletonStyle || props.style
  
  return isContainer
    ? createSkeleton(props.children, style)
    : <View key={ key } style={ { ...style, backgroundColor: 'pink' } } />
}

const createStyleForText = ({ style={}, skeletonLines=1, skeletonChars=6 }) => {
  
  const fontSize = style.fontSize || 16
  const width = skeletonChars * fontSize * 0.8
  const height = skeletonLines * (fontSize + 2)
  
  return (
    {
      width: width,
      height: height,
      borderRadius: 12
    }
  )
}

export default Skeleton