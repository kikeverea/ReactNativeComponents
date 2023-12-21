import { View, Text, StyleSheet } from "react-native";
import FloatingTextInput from "./src/components/FloatingTextInput";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'navy',
    gap: 16
  }
})

const App = () => {

  return (
    <View style={ styles.container }>
      <FloatingTextInput
        labelActiveColor={ '#FFFFFF' }
        labelInactiveColor={ '#FFFFFF' }
        style={{
          borderColor: 'white',
          borderRadius: 48,
          paddingHorizontal: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.18)',
          borderWidth: 1
        }}
        textStyle={{
          color: 'white'
        }} />
        <FloatingTextInput
        labelActiveColor={ '#FFFFFF' }
        labelInactiveColor={ '#FFFFFF' }
        style={{
          borderColor: 'white',
          borderRadius: 48,
          paddingHorizontal: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.18)',
          borderWidth: 1
        }}
        textStyle={{
          color: 'white'
        }} />
    </View>
  )
}

export default App;

