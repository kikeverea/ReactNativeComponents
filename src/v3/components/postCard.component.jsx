import { Image, StyleSheet, View } from 'react-native'
import colors from '../styles/colors'
import text from '../styles/text'
import Text from '../components/text.component'
import Card from './card.component'

import defaultImage from '../assets/img/logo_icon.png'

const formatDate = date => {
  const str = new Date(date).toLocaleString()           // dd/m/yyyy, hh:mm:ss
  return `${str.substring(0, str.lastIndexOf(':'))} `   // add a space to prevent text being cut off
}

const fallbackImageConfig = {
  source: defaultImage,
  resizeMode: 'cover'
}

const PostCard = ({ post, press }) => {

  const imageConfig = post.image?.url
    ? {
        style: styles.image,
        source: { uri: `https://wepickapp.innobing.net${post.image.url}` },
        resizeMode: 'contain'
      }
    : fallbackImageConfig

  return (
    <Card style={ styles.container } press={press}>
      <View>
        <Image
          style={ styles.image }
          source={ imageConfig.source }
          resizeMode={ imageConfig.resizeMode }
        />
        <View style={ styles.hide }/>
      </View>
      <View style={ styles.contentContainer }>
        <View style={ styles.titleContainer }>
          <Text numberOfLines={ 3 } style={ styles.content }>{ post.title }</Text>
        </View>
        <View >
          <Text style={ styles.date }>{ formatDate(post.updated_at) }</Text>
        </View>
      </View>
    </Card>
  )
}

export default PostCard

const styles = StyleSheet.create({
  container: {
    width: '97%',
    gap: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.primaryDark,
  },
  image: {
    width: 90,
    height: 75,
    borderRadius: 12
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 4,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10
  },
  content: {
    fontSize: text.size.label
  },
  date: {
    fontSize: text.size.secondary,
    paddingBottom: 4,
    textAlign: 'right',
    fontStyle: 'italic',
    fontWeight: 'light'
  },
  hide: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.primaryDark,
    left: 77,
    bottom: -1
  }
})
