import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

const Skeleton = ({ style, children, loading }) => {
  
  const opacityAnim = useRef(new Animated.Value(1)).current

  const fade =
    Animated.loop(
      Animated.sequence([
        Animated.delay(700),
        Animated.timing(opacityAnim, {
        toValue: 0.4,
        duration: 1000,
        useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    )

  useEffect(() => {
    if (loading)
      fade.start()

    return () => fade.stop()
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
    : <View key={ key } style={ { ...style, backgroundColor: '#C4CDD3' } } />
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