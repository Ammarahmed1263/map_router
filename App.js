import {StatusBar, StyleSheet, View, useColorScheme} from 'react-native';
import Mapbox, {MapView} from '@rnmapbox/maps';
import InputContainer from './src/components/InputContainer';
import COLORS from './src/styles/Colors';
import {MAPBOX_ACCESS_TOKEN} from '@env';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

function App() {
  const theme = useColorScheme();

  const colors = COLORS[theme];
  // TODO: path global colors to all components
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          logoEnabled={false}
          scaleBarEnabled={false}
          attributionEnabled={false}
        />
        <InputContainer
          colors={colors}
          style={{backgroundColor: colors.background}}
        />
      </View>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
