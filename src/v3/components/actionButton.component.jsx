import { StyleSheet, View, Pressable, ActivityIndicator, Dimensions } from 'react-native'
import Text from './text.component'
import colors from '../styles/colors'
import text from '../styles/text'
import { useRef } from 'react'
import { calculateWidth, triangleMetrics } from '../helpers/shapeMetrics.helper'

const ActionButton = ({
  style,
  label,
  icon,
  decorationWidth='25%',
  decorationAngle=45,
  decorationGap=0,
  loading,
  startLoading,
  stopLoading,
  onPress
}) => {


  const selfRef = useRef(null)

  // this component´s boundaries
  const left = useRef(0)
  const top = useRef(0)
  const right = useRef(0)
  const bottom = useRef(0)
  
  const windowWidth = Dimensions.get('window').width

  const width = style?.width ? calculateWidth(style.width, windowWidth) : windowWidth * 0.9
  const height = style?.height ? style.height : 50
  const decorationContainerWidth = calculateWidth(decorationWidth, width)
  
  const hideShape = triangleMetrics(height, decorationContainerWidth, decorationAngle)

  const defaultIconBackground = colors.primaryDark
  const activeIconBackground = colors.primaryLight

  const activeStyles = StyleSheet.create({
    activeBackground: {
      backgroundColor: loading ? activeIconBackground : defaultIconBackground
    }
  })

  const decorationLayout = {
    width: decorationContainerWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingEnd: hideShape.width / 2,
  }

  const labelGap = {
    paddingLeft: decorationGap
  }

  const hideLayout = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: hideShape.width,
    borderBottomWidth: hideShape.height,
    left: hideShape.pos
  }

  const pressIn = () => startLoading()

  const pressOut = event => {
    if (offBoundaries(event.nativeEvent))
      stopLoading()
  }

  const offBoundaries = ({ pageX, pageY }) => {
    // determines if a touch event happened outside this component boundaries
    return (
      pageX < left.current ||
      pageX > right.current ||
      pageY < top.current ||
      pageY > bottom.current
    )
  }
  
  const measureComponent = () => {
    selfRef.current.measure((
      _x, _y,
      w,
      h,
      pageX,
      pageY) =>
      {
      left.current = pageX
      top.current = pageY
      right.current = pageX + w
      bottom.current = pageY + h
    })
  }

  return (
    <Pressable
      ref={ selfRef }
      style={[ style, styles.container ]}
      onLayout={ measureComponent }
      onPress={ onPress }
      onPressIn={ pressIn }
      onPressOut={ pressOut }
    >
      <View style={[ activeStyles.activeBackground, decorationLayout ]}>
        { loading
          ? <ActivityIndicator size='large' color={ colors.primaryDark } />
          : <View>{ icon }</View>
        }
      </View>
      <View style={[ styles.labelContainer, labelGap ]}>
        <Text style={ styles.label }>{ label }</Text>
      </View>
      <View style={[ styles.hideShape, hideLayout ]}/>
    </Pressable>
  )
}

export default ActionButton

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  labelContainer: {
    height: '100%',
    width: '100%', 
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  label: {
    fontSize: text.size.button,
    fontStyle: 'italic',
    fontWeight: 'regular',
    color: colors.textButtons,
  },
  hideShape: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.accent,
  }
})