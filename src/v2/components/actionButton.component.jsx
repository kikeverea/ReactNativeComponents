import { StyleSheet, View, Pressable, ActivityIndicator, Dimensions } from 'react-native'
import Text from './text.component'
import colors from '../styles/colors'
import text from '../styles/text'
import { useRef } from 'react'
import Skeleton from '../../Skeleton.component'

const DEFAULT_BACKGROUND_COLOR = '#706F6F'
const DEFAULT_DECORATION_COLOR = '#343434'
const DEFAULT_ACTIVE_DECORATION_COLOR = '#A9A9AA'

const ActionButton = ({
  style={},
  label,
  icon,
  decorationWidth='25%',
  decorationAngle=45,
  decorationGap=0,
  decorationColor=DEFAULT_DECORATION_COLOR,
  decorationActiveColor=DEFAULT_ACTIVE_DECORATION_COLOR,
  loading,
  startLoading,
  stopLoading,
  onPress
}) => {
  
  const parsePercentage = percentage =>
    parseInt(percentage.substring(0, percentage.length -1))
  
  const determineWidth = width => {
    const windowWidth = Dimensions.get('window').width

    if (!width) {
      return windowWidth * 0.9
    }
    else if(typeof width === 'string') {
      return windowWidth * parsePercentage(width) / 100
    }
    else return width
  }

  const determineDecorationWidth = (width, componentWidth) => {
    return typeof width === 'string'
      ? componentWidth * parsePercentage(width) / 100
      : width
  }

  const shapeMetrics = (componentHeight, containerWidth, angle) => {
    // shape height equals component height
    const height = componentHeight
  
    // calculates shape width from it's height and wanted angle
    const width = height / Math.tan((angle * Math.PI) / 180)
    
    // shape x position equals its container minus its width
    const pos = containerWidth - width

    return { width, height, pos }
  }

  const selfRef = useRef(null)

  // this component´s boundaries
  const left = useRef(0)
  const top = useRef(0)
  const right = useRef(0)
  const bottom = useRef(0)
  
  const width = determineWidth(style.width)
  const height = style.height ? style.height : 50
  const decorationContainerWidth = determineDecorationWidth(decorationWidth, width)
  const backgroundColor = style.backgroundColor || DEFAULT_BACKGROUND_COLOR
  
  const hideShape = shapeMetrics(height, decorationContainerWidth, decorationAngle)

  const decorationLayout = {
    width: decorationContainerWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingEnd: hideShape.width / 2,
    backgroundColor: loading ? decorationActiveColor : decorationColor
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
    left: hideShape.pos,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: backgroundColor,
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
      onLayout={ measureComponent }
      onPress={ onPress }
      onPressIn={ pressIn }
      onPressOut={ pressOut }
    >
      <Skeleton
        style={{ ...style, backgroundColor: backgroundColor, overflow: 'hidden' }}
        loading={ true }
      >
        <View style={ decorationLayout }>
          { loading
            ? <ActivityIndicator size='large' color={ colors.primaryDark } />
            : <View>{ icon }</View>
          }
        </View>
        <View style={[ styles.labelContainer, labelGap ]}>
          <Text style={ styles.label }>{ label }</Text>
        </View>
        <View style={ hideLayout }/>
      </Skeleton>
    </Pressable>
  )
}

export default ActionButton

const styles = StyleSheet.create({
  labelContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  label: {
    fontSize: text.size.button,
    fontStyle: 'italic',
    color: colors.textButtons,
  },
})