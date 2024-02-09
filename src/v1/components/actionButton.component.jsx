import { StyleSheet, View, Pressable, ActivityIndicator, Text, Dimensions} from 'react-native'
import colors from '../styles/colors'
import { useRef } from 'react'

const ActionButton = ({ label, style, icon, leftWidth='25%', leftAngle=45, loading, setLoading, onPress }) => {

  const parsePercentage = percentage =>
    parseInt(percentage.substring(0, percentage.length -1))

  const determineWidth = width => {
    
    const windowWidth = () => Dimensions.get('window').width

    if (!width) {
      return windowWidth() * 0.9
    }
    else if(typeof width === 'string') {
      return windowWidth() * parsePercentage(width) / 100
    }
    else return width
  }

  const shapeMetrics = (componentHeight, containerWidth, angle) => {
    // shape height equals component height
    const height = componentHeight
  
    // calculates shape width from its height and wanted angle
    const width = height / Math.tan((angle * Math.PI) / 180)
    
    // shape x position equals its container minus its width
    const pos = containerWidth - width

    return { width, height, pos }
  }

  const selfRef = useRef(null)

  // this component's boundaries
  const left = useRef(0)
  const top = useRef(0)
  const right = useRef(0)
  const bottom = useRef(0)

  const width = determineWidth(style?.width)
  const height = style?.height ? style.height : 50
  
  const defaultIconBackground = colors.primaryDark
  const activeIconBackground = colors.primaryLight

  const iconContainerWidth = width * parsePercentage(leftWidth) / 100
  const hideShape = shapeMetrics(height, iconContainerWidth, leftAngle)

  const activeStyles = StyleSheet.create({
    activeBackground: {
      backgroundColor: loading ? activeIconBackground : defaultIconBackground
    }
  })

  const pressIn = () => setLoading(true)

  const pressOut = event => {

    if (offBoundaries(event.nativeEvent))
      setLoading(false)
  }

  // determines if a touch event took place outside this component's boundaries
  const offBoundaries = ({ pageX, pageY }) => {
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
      width,
      height,
      pageX,
      pageY) =>
    {
      left.current = pageX
      top.current = pageY
      right.current = pageX + width
      bottom.current = pageY + height
    })
  }

  const decorationLayout = {
    position: 'absolute',
    bottom: -1,
    left: hideShape.pos + 1,
    borderLeftWidth: hideShape.width,     // width
    borderBottomWidth: hideShape.height,  // height
  }

  const decorationWidth = {
    width: iconContainerWidth,
    paddingEnd: hideShape.width / 2,
  }
  
  return (
    <Pressable
      ref={ selfRef }
      style={[style, styles.container ]}
      onLayout={ measureComponent }
      onPress={ onPress }
      onPressIn={ pressIn }
      onPressOut={ pressOut }
    >
      <View style={[ activeStyles.activeBackground, styles.decorationContainer, decorationWidth ]}>
        { loading
          ? <ActivityIndicator size='large' color={ colors.primaryDark } />
          : <View>{ icon }</View>
        }
      </View>
      <View style={ styles.labelContainer }>
        <Text style={ styles.label }>{ label }</Text>
      </View>
      <View style={[ styles.hide, decorationLayout ]}/>
    </Pressable>
  )
}

export default ActionButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  decorationContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    height: '100%',
    width: '100%',
    paddingLeft: 30,
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  label: {
    fontSize: 22,
    fontStyle: 'italic',
    color: 'white',
  },
  hide: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.primary,
  }
})

