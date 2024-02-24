import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

const Skeleton = ({ style, children, loading }) => {
  
  const opacityAnim = useRef(new Animated.Value(1)).current

  const pulse =
    Animated.loop(
      Animated.sequence([
        Animated.delay(700),
        Animated.timing(opacityAnim, {    // moves opacityAnim from 1 to 0.4
        toValue: 0.4,
        duration: 1000,
        useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,                     // moves opacityAnim from 0.4 to 1
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    )

  useEffect(() => {
    if (loading)
      pulse.start()
    
    return () => pulse.stop()
  },
  [])

  return (
    loading
      ? <Animated.View style={{ opacity: opacityAnim }}>
          { createSkeleton(children, style) }
        </Animated.View>
      : <View style={ style }>
          { children }
        </View>
  )
}

const createSkeleton = (components, containerStyle) => {
  return (
    <View style={ cleanContainerStyle(containerStyle) }>
      {
        React.Children.map((components), (element, index) =>
          React.isValidElement(element)
            && renderChild(element, containerStyle.backgroundColor, index))
      }
    </View>
  )
}

const renderChild = (child, containerColor, key) => {

  const props = child.props
  const isText = props.children === 'text'
  const isContainer =
    !isText &&
    Array.isArray(props.children) &&
    props.children.length > 1

  const style = isText ? createStyleForText(props) : props.skeletonStyle || props.style

  return isContainer
    ? createSkeleton(props.children, style)
    : <View key={ key } style={ cleanStyle(style, containerColor) } />
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

const cleanStyle = (style, containerColor) =>
  ({ ...style,
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: 
      containerColor && containerColor !== 'transparent'
        ? 'transparent'
        : '#C4CDD3'
  })

const cleanContainerStyle = style =>
  ({ ...style,
    backgroundColor: style.backgroundColor ? '#C4CDD3' : 'transparent',
    borderWidth: 0 })

export default Skeleton