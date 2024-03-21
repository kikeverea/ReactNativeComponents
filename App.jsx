import React, { useEffect, useState } from 'react';

import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
import Form from './src/Form.component'

const App = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  },
  [])
  
  /*
  <SafeAreaView style={ styles.container } >
      <Skeleton style={ styles.bar } loading={ loading }>
        <View style={ styles.header }>
          <View style={ styles.icon }/>
          <Text skeletonChars={ 4 }>text</Text>
        </View>
        <View style={ styles.content } />
      </Skeleton>
    </SafeAreaView>
  */

  return (
    <SafeAreaView style={ styles.container } >
      <Form
        fields={[
          { name: 'field1', label: 'Field 1', validate: () => 'error' },
          { name: 'field2', label: 'Field 2' },
          { name: 'field3', label: 'Field 2' },
        ]}
        InputComponent={ TextInput }
        onSubmit={ result => console.log(result) }
      />
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
