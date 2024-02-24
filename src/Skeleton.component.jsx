import { View } from 'react-native'

const Skeleton = ({ style, children, skeletonLayout, loading }) => {
  return (
    loading
      ? createSkeleton(skeletonLayout, style)
      : <View style={ style }>{ children }</View>
  )
}

const createSkeleton = (layout, containerStyle) => {
  console.log('creating skeleton');
  return (
    <View style={ containerStyle }>
      { layout.map((child, ind) => renderChild(child, ind)) }
    </View>
  )
}

const renderChild = (layout, key) => {

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
  = layout.text ? createStyleForText(layout) : layout

  console.log(style)
  
  return layout.children
    ? createSkeleton(layout.children, style)
    : <View key={ key } style={ { ...style, backgroundColor: 'pink' } } />
}

const createStyleForText = layout => {
  console.log('TEXT LAYOUT', layout)
  return(
    {
      width: layout.chars * layout.fontSize,
      height: layout.lines * (layout.fontSize + 4),
      borderRadius: 12
    }
  )
}

export default Skeleton