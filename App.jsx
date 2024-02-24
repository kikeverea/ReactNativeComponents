import React, { useEffect, useState } from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Skeleton from './src/Skeleton.component'
import ActionButton from './src/v2/components/actionButton.component'

const App = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  },
  [])
    
  return (
    <SafeAreaView style={ styles.container } >
      <Skeleton style={ styles.bar } loading={ loading }>
        <View style={ styles.header }>
          <View style={ styles.icon }/>
          <Text skeletonChars={ 4 }>text</Text>
        </View>
        <View style={ styles.content } />
  </Skeleton>
      {/*<ActionButton
        style={{ width: '80%', borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30, height: 60 }}
        decorationAngle={ 70 }
        loading={ loading }
        startLoading={ () => setLoading(true) }
        stopLoading={ () => setLoading(false) }
        onPress={ () => setLoading(false) }
  />*/}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 70,
    padding: '8%'
  },
  bar: {
    width: '85%',
    height: 100,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'navy'
  },
  header: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'pink',
    
  }
})

export default App;
