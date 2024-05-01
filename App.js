import {
  StatusBar,
  View,
  useColorScheme,
  PermissionsAndroid,
} from 'react-native';
import Mapbox, {
  MapView,
  Camera,
  ShapeSource,
  LineLayer,
  UserLocation,
  PointAnnotation,
} from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import InputContainer from './src/components/InputContainer';
import Icon from 'react-native-vector-icons/Entypo';
import COLORS from './src/styles/Colors';
import {ACCESS_TOKEN} from '@env';
import {useEffect, useState} from 'react';

Mapbox.setAccessToken(ACCESS_TOKEN);

function App() {
  const [currentLocation, setCurrentLocation] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [startCoords, setStartCoords] = useState([]);
  const [endCoords, setEndCoords] = useState([]);
  const theme = useColorScheme();
  const colors = COLORS[theme];

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setTimeout(() => {
          setCurrentLocation([longitude, latitude]);
        }, 2000);
      },
      error => {
        console.warn('Error getting location:', error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getUserLocation();
          // Proceed with location-related functionality
        } else {
          console.error('Location permission denied');
          // Handle denied permission
        }
      } catch (err) {
        console.warn('Error requesting location permission:', err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (startCoords.length === 0 || endCoords.length === 0) {
          setRouteCoordinates([]);
          return;
        }
        if (!startCoords.length || !endCoords.length) {
          return;
        }
        
        let response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${startCoords[0] + '%2C' + startCoords[1] + '%3B' + endCoords[0] + '%2C' + endCoords[1]}?geometries=geojson&access_token=${ACCESS_TOKEN}`)
        response = await response.json();
        setRouteCoordinates(response.routes[0].geometry.coordinates);
      } catch (error) {
        console.error("failed to find route: ", error);
      }

    })()
  }, [startCoords, endCoords])


  const minLon = Math.min(...routeCoordinates.map(coord => coord[0]));
  const maxLon = Math.max(...routeCoordinates.map(coord => coord[0]));
  const minLat = Math.min(...routeCoordinates.map(coord => coord[1]));
  const maxLat = Math.max(...routeCoordinates.map(coord => coord[1]));

  const centerLon = (minLon + maxLon) / 2;
  const centerLat = (minLat + maxLat) / 2;


  const selectCenter = () => {
    if (routeCoordinates.length > 0) {
      return [centerLon, centerLat];
    }
    else if (startCoords.length > 0) {
      return startCoords;
    }
    else if (endCoords.length > 0) {
      return endCoords;
    } 
    else if(currentLocation.length > 0) {
      return currentLocation;
    } else {
      return [25, 25];
    }
  }

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
      />
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          logoEnabled={false}
          scaleBarEnabled={false}
          attributionEnabled={false}>
          <Camera
            centerCoordinate={selectCenter()}
            zoomLevel={2}
            animationMode="flyTo"
          />
          <UserLocation />
          
          {startCoords.length !== 0 && <PointAnnotation id="start" coordinate={startCoords}>
            <Icon name="vinyl" color='#1E90FF' size={25} />
            </PointAnnotation>}
          
          {endCoords.length !== 0 && <PointAnnotation id="destination" coordinate={endCoords}/>}
          
          {routeCoordinates.length > 0 && (
            <ShapeSource
              id="route"
              shape={{type: 'LineString', coordinates: routeCoordinates}}>
              <LineLayer
                id="routeLayer"
                style={{lineColor: '#1E90FF', lineWidth: 4}}
              />
            </ShapeSource>
          )}
        </MapView>
        <InputContainer
          setStartCoords={setStartCoords}
          setEndCoords={setEndCoords}
          colors={colors}
          style={{backgroundColor: colors.background}}
        />
      </View>
    </>
  );
}

export default App;
