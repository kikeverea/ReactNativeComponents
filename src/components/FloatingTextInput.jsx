import React, {useState, useRef} from 'react'
import {Animated, Easing, TextInput, StyleSheet} from 'react-native'

const FloatingTextInput = ({
  label='Label',
  labelActiveColor='#444444',     // color when the input is focused
  labelInactiveColor='#c2c2c2',   // color when the input loses focus
  style,
  textStyle
}) => {

  // Some properties of 'style' will be deleted in this function. A copy of 'style'
  // is created here to avoid losing information from the original 'style' prop 
  style = {...style}
  delete style.height

  const {
    fontSize,
    viewHeight,
    paddingHorizontal,
    labelActiveSize,
    labelInactiveSize,
    labelStart,
    labelEnd
  } 
  = calculateMetrics(style)

  const [text, onChangeText] = useState('');
  const animatedValue = useRef(new Animated.Value(0))

  // plain styles
  const styles = StyleSheet.create({
    container: {
      borderWidth: 0.8,
      paddingHorizontal: paddingHorizontal,
      height: viewHeight,
      ...style,
    },
    title: {
      paddingHorizontal: 4
    },
    textStyle: {
      ...textStyle,
      fontSize: fontSize,
    },
  })

  // these styles will be applied to the label to animate it
  const animatedLabelStyles = {
    top: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [labelStart, labelEnd],
      extrapolate: 'clamp',
    }),
    fontSize: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [labelInactiveSize, labelActiveSize],
      extrapolate: 'clamp',
    }),
    color: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [labelInactiveColor, labelActiveColor],
    })
  }

  const onFocus = () => {
    Animated.timing(animatedValue?.current, {
      toValue: 1,
      duration: 200,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    if (!text) {
      Animated.timing(animatedValue?.current, {
        toValue: 0,
        duration: 200,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start()
    }
  };

  return (
    <Animated.View style={ styles.container }>
      <Animated.Text style={[styles.title, animatedLabelStyles]}>{label}</Animated.Text>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        style={[styles.textStyle, { position: 'absolute',
        left: paddingHorizontal, bottom: 4, right: 8}]}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </Animated.View>
  )
}

/***** Helpers ******/

const DEFAULT_FONT_SIZE = 16
const INPUT_PADDING_TOP = 20
const INPUT_PADDING_BOTTOM = 16
const PADDING_HORIZONTAL = 16

const calculatePadding = style => {
  const userPadding = style.padding || style.paddingHorizontal || style.paddingLeft

  delete style.padding
  delete style.paddingLeft
  delete style.paddingRight
  delete style.paddingVertical
  delete style.paddingHorizontal

  const paddingHorizontal = userPadding 
    ? PADDING_HORIZONTAL + userPadding
    : PADDING_HORIZONTAL

    return paddingHorizontal
}

const calculateMetrics = style => {
  const fontSize = style && style.fontSize ? style.fontSize : DEFAULT_FONT_SIZE

  const inputSize = INPUT_PADDING_BOTTOM + fontSize + INPUT_PADDING_TOP
  const viewHeight = inputSize + fontSize + INPUT_PADDING_TOP / 2
  
  const labelPadding = fontSize / 4 - (DEFAULT_FONT_SIZE / fontSize)
  
  const labelActiveSize = fontSize * 0.75
  const labelInactiveSize = fontSize * 0.88

  const labelStart = (viewHeight / 2) - labelPadding - (fontSize / 2)
  const labelEnd = inputSize - INPUT_PADDING_BOTTOM - fontSize - 4

  const paddingHorizontal = calculatePadding(style)
  
  return {
    fontSize,
    viewHeight,
    paddingHorizontal,
    labelActiveSize,
    labelInactiveSize,
    labelStart,
    labelEnd
  }
}

export default FloatingTextInput