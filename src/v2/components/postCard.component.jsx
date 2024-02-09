import { Image, StyleSheet, View } from 'react-native'
import colors from '../styles/colors'
import text from '../styles/text'
import Text from '../components/text.component'
import Card from './card.component'

const formatDate = date =>
  new Date(date).toLocaleDateString()

const PostCard = ({ post }) => {
  return (
    <Card style={ styles.container }>
      <View>
        <Image
          style={ styles.image }
          source={{ uri: `https://wepickapp.innobing.net${post.image.url}` }}
          resizeMode='contain'
        />
        <View style={ styles.hide }/>
      </View>
      <View style={ styles.contentContainer }>
        <View style={ styles.titleContainer }>
          <Text numberOfLines={ 3 } style={ styles.content }>{ post.text }</Text>
        </View>
          <Text style={ styles.date }>{ formatDate(post.updated_at) }</Text>
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
    width: 110,
    height: 90,
    borderRadius: 12,
    backgroundColor: 'pink'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center'
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
    //borderBottomColor: 'rgba(255, 0, 0, 0.6)',
    borderBottomColor: colors.primaryDark,
    left: 95,
    bottom: -1
  }
})