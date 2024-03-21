import React, {useState} from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import WepickView from '../../components/wepickView.component';
import Text from '../../components/text.component';

const Post = ({navigation, route}) => {
    const [post, setPost] = useState(route.params.post)

    return (
        <WepickView>
            {post &&
            <ScrollView>
                <View>
                    <View style={styles.containerImage}>
                        <Image style={styles.image} resizeMode={'contain'} source={{uri: `https://wepickapp.innobing.net${post.image.url}`}}/>
                    </View>
                    <View style={styles.container}>
                        <Text>{post.title}</Text>
                        <Text>{post.text}</Text>
                    </View>
                </View>
                
            </ScrollView>
            }
        </WepickView>
    )
}

export default Post;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        paddingTop: 16,
        paddingBottom: 8,
        paddingHorizontal: '8%'
    },
    image: {
        width: '100%',
        height: 200
    },
    containerImage: {
        width: '100%',
        marginTop: 20
    }

})