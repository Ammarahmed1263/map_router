import {View, TextInput, Text, FlatList, TouchableHighlight, StyleSheet} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {ACCESS_TOKEN} from '@env';

const AutocompleteSearch = ({placeholder, setCoords, colors}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeText = text => {
    setQuery(text);
    clearTimeout(debounceTimeout);

    let debounceTimeout = setTimeout(() => {
      fetchSuggestions(text);
    }, 500);
  };

  const fetchSuggestions = async text => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${ACCESS_TOKEN}`,
      );
      const data = await response.json();
      const newSuggestions = data.features.map(feature => ({name: feature.place_name, center: feature.center}));
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = location => {
    setCoords(location.center);
    setQuery(location.name);
    setSuggestions([]);
  };

  const handleCancle = () => {
    setQuery('');
    setCoords([]);
    setSuggestions([]);
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          value={query}
          onChangeText={handleChangeText}
          placeholderTextColor={colors.textFade}
          style={{color: colors.text, flex: 1, fontSize: 20}}
        />
        {loading && <Text style={{fontSize: 15}}>Loading...</Text>}
        <Icon.Button name="close" backgroundColor='transparent' underlayColor='transparent' color={colors.textFade} size={25} onPress={handleCancle}/>
      </View>
      {suggestions.length > 0 ? (
        <FlatList
          style={{...styles.flatList, backgroundColor: colors.background}}
          data={suggestions}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor={colors.overlay}
              style={styles.button}
              onPress={() => handleSelectLocation(item)}>
              <Text style={{fontSize: 16}}>{item.name}</Text>
            </TouchableHighlight>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        ''
      )}
    </View>
  );
};

export default AutocompleteSearch;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginLeft: 3
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flatList: {
    position:'absolute',
    zIndex: 3,
    top: 35,
    width: '100%',
    borderRadius: 12
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 12
  }
})