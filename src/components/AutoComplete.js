import {useState} from 'react';
import {View, TextInput, Text, FlatList, TouchableHighlight} from 'react-native';
import {MAPBOX_ACCESS_TOKEN} from '@env';

const AutocompleteSearch = ({placeholder, colors}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  // const [loading, setLoading] = useState(false);

  const handleChangeText = text => {
    setQuery(text);
    clearTimeout(debounceTimeout);

    let debounceTimeout = setTimeout(() => {
      fetchSuggestions(text);
    }, 500);
  };

  const fetchSuggestions = async text => {
    // setLoading(true);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${MAPBOX_ACCESS_TOKEN}`,
      );
      const data = await response.json();

      const newSuggestions = data.features.map(feature => feature.place_name);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
      // } finally {
    //   setLoading(false);
    // }
  };

  const handleSelectLocation = location => {
    setQuery(location);
    setSuggestions([]);
  };

  return (
    <View style={{flex: 1, marginLeft: 3}}>
      <View>
        <TextInput
          placeholder={placeholder}
          value={query}
          onChangeText={handleChangeText}
          placeholderTextColor={colors.textFade}
          style={{color: colors.text, fontSize: 18}}
        />
        {/* {loading && <Text>Loading...</Text>} */}
      </View>
      {suggestions.length > 0 ? (
        <FlatList
          style={{position:'absolute',zIndex: 3, top: 35, width: '100%', backgroundColor: colors.background, borderRadius: 12}}
          data={suggestions}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor={colors.overlay}
              style={{paddingVertical: 4, paddingHorizontal: 12}}
              onPress={() => handleSelectLocation(item)}>
              <Text style={{fontSize: 16}}>{item}</Text>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        ''
      )}
    </View>
  );
};

export default AutocompleteSearch;
