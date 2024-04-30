import {View, StyleSheet, StatusBar, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EllipsisDots from './EllipsisDots';
import AutocompleteSearch from './AutoComplete';

function InputContainer({style, colors}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <Icon name="radio-button-on-outline" color={colors.text} size={25} />
        <AutocompleteSearch placeholder="Your place" colors={colors} />
      </View>
      <View
        style={styles.separator}>
        <EllipsisDots count={4} dotSize={13} color={colors.text} />
        <View
          style={{...styles.horizontalLine, borderBottomColor: colors.text}}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="location-outline" color={colors.text} size={25} />
        <AutocompleteSearch placeholder="Your destination" colors={colors} />
      </View>
    </View>
  );
}

export default InputContainer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    height: 113,
    width: '96%',
    top: StatusBar.currentHeight + 20,
    borderRadius: 12,
    paddingLeft: 10,
    paddingVertical: 2,
  },
  inputContainer: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row'
  },
  separator: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginLeft: 10,
  },
  horizontalLine: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth, // Adjust the thickness of the line
    marginHorizontal: 14,
  },
});
