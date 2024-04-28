import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import InputContainer from './src/components/InputContainer';

function App() {
  return (
    <>
      <StatusBar backgroundColor="transparent" />
      <View style={styles.container}>
        <InputContainer />
      </View>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  }
})
