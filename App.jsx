import React, { useState } from 'react';

import { SafeAreaView, StyleSheet, Text } from 'react-native'
import ActionButton from './src/components/actionButton.component';
import colors from './src/styles/colors';

const App = () => {

  const [loading, setLoading] = useState(false)

  return (
    <SafeAreaView style={ styles.container }>
      <ActionButton
        label='Test Button'
        style={ styles.button }
        leftWidth='25%'
        leftAngle={ 65 }
        icon={ <Text style={{ fontSize: 20, color: 'white' }}>A</Text> }
        loading={ loading }
        setLoading={ setLoading }
        onPress={ () => setTimeout(() => setLoading(false), 2000) }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '8%'
  },
  button: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopStartRadius: 12,
    borderBottomStartRadius: 12,
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    overflow: 'hidden',
    backgroundColor: colors.primary
  }
})

export default App;
