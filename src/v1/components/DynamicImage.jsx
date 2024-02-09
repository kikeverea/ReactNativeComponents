import { Image, StyleSheet, Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import Shape from 'react-clip-path'

const uri = 'http://10.0.2.2:8081/assets/assets/city_image.jpg?platform=android&hash=6644083cb0e9c0f3a5a3d60ea2807764'

const DynamicImage = () => {
  
  const [imageHeight, setImageHeight] = useState(null)
  
  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      const windowWidth = Dimensions.get('window').width
      const ratio = height / width
      setImageHeight(windowWidth * ratio)
    })
  })

  const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: imageHeight
    }
  })

  // <Image style={ styles.image } source={ img } resizeMode='cover' />
  
  return (
    <Shape
    name="Circle"
    id="circle-shape-id"
    width="300px"
    height="300px"
    showLabel={true}
    showShadow={true}
    handleClick={() => someFunction()}
/>
  )

}

export default DynamicImage
