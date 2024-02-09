import React, {useState, useRef} from 'react'
import {Animated, Easing, TextInput, StyleSheet, Pressable, View, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from './text.component'


const AnimatedTextInput = ({
  text,
  onChangeText,
  error,
  clearError,
  errorColor='#F31B04',
  autoCapitalize='words',
  label='Label',
  isPassword,
  labelActiveColor='#444444',     // color when the input is focused
  labelInactiveColor='#c2c2c2',   // color when the input loses focus
  style,
  textStyle,
  labelTextStyle
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

  const animatedValue = useRef(new Animated.Value(0))
  let inputRef = useRef(null);

  // plain styles
  const styles = StyleSheet.create({
    input: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 0.8,
      paddingLeft: paddingHorizontal,
      paddingRight: 8,
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
    error: {
      display: error ? 'flex' : 'none',
      color: errorColor,
      fontSize: fontSize * 0.88,
      paddingLeft: paddingHorizontal,
      paddingTop: 6
    }
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
    if (error)
      clearError()

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
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View>
      <Animated.View style={ styles.input }>
        <Animated.Text
          style={[
            styles.title,
            labelTextStyle ? labelTextStyle : null,
            animatedLabelStyles
          ]}
          onPress={() => inputRef.focus()}
          activeOpacity={0}
          >
            {label}
        </Animated.Text>
        { isPassword && 
          <ShowPasswordButton showPassword={ showPassword } onShowPasswordChange={ setShowPassword } color={ labelInactiveColor }/>
        }
        <TextInput
          ref={ref => inputRef = ref}
          onChangeText={onChangeText}
          secureTextEntry={ isPassword && !showPassword }
          value={text}
          autoCapitalize={ autoCapitalize }
          style={[styles.textStyle, { position: 'absolute',
          left: paddingHorizontal, bottom: Platform.OS === 'android' ? -4 : 10, right: paddingHorizontal + 30}]}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </Animated.View>
      <Text style={ styles.error }>{ error }</Text>
    </View>
  )
}

const ShowPasswordButton = ({ showPassword, onShowPasswordChange, color }) => {

  const toggleShowPassword = () => onShowPasswordChange(!showPassword)
  const iconName = showPassword ? 'eye-outline' : 'eye-off-outline'

  return (
    <Pressable onPress={() => toggleShowPassword() } style={{ alignSelf: 'center', padding: 12 }} >
      <Icon name={ iconName } color={ color } size={ 18 }/>
    </Pressable>
  )
}

/***** Helpers ******/

const DEFAULT_FONT_SIZE = 16
const INPUT_PADDING_TOP = 16
const INPUT_PADDING_BOTTOM = 12
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
  const viewHeight = inputSize + fontSize
  
  const labelPadding = fontSize / 2 - (DEFAULT_FONT_SIZE / fontSize)
  
  const labelActiveSize = fontSize * 0.75
  const labelInactiveSize = fontSize * 0.88

  const labelStart = (viewHeight / 2) - (fontSize / 1.5)
  const labelEnd = inputSize - INPUT_PADDING_BOTTOM - fontSize - (labelPadding * 1.15)

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

export default AnimatedTextInput