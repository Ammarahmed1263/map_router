import {View, StyleSheet, StatusBar} from 'react-native';
import IconTextInput from './IconTextInput';

function InputContainer({style}) {
  return <View style={[styles.container, style]}>
    <IconTextInput />
    <IconTextInput />
  </View>
}

export default InputContainer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    top: StatusBar.currentHeight + 5,
    backgroundColor: 'blue',
    width: '92%',
    borderRadius: 12
  }
})
