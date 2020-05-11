import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, Text, ToastAndroid, PermissionsAndroid} from 'react-native';
import {getDistance, getPreciseDistance} from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchBar, Header, Button} from 'react-native-elements';

const MapMarkers = props => {
  const [coordinates, setCoordinates] = useState(props.coordinates);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const setLocation = (region, lat, long) => {
    setMapRegion(region);
    setCurrentLatitude(lat || currentLatitude);
    setCurrentLongitude(long || currentLongitude);
  };

  const _getCurrentPosition = () => {
    let currentLocation = Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
        };
        setLocation(region, region.latitude, region.longitude);
        showToast('Ubicación actualizada.')
      },
      err => console.log(err),
    );
    return currentLocation;
  };

  useEffect(() => {
    let granted = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      let currentLocation = _getCurrentPosition();
      return Geolocation.clearWatch(currentLocation);
    } else {
      alert('ACCESS_FINE_LOCATION permission denied');
    }
  }, []);

  const _getPreciseDistance = (latDestino, longDestino) => {
    return getPreciseDistance(
      {
        latitude: parseFloat(currentLatitude),
        longitude: parseFloat(currentLongitude),
      },
      {latitude: latDestino, longitude: longDestino},
    );
  };

  const mapStyle =[
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]

  return (
    <React.Fragment>
      <SearchBar
        lightTheme
        // onChangeText={someMethod}
        // onClearText={someMethod}
        icon={{type: 'font-awesome', name: 'search'}}
        placeholder="Search a place"
      />
      <MapView
        // customMapStyle={mapStyle}
        style={styles.mapStyle}
        region={mapRegion}
        showsUserLocation={true}
        followsUserLocation={true}>
        {coordinates?.map(coord => {
          let distancia =
            _getPreciseDistance(coord.latitude, coord.longitude) / 1000;
          return (
            distancia < 1.8 && (
              <Marker
                key={coord.id}
                coordinate={{
                  latitude: coord.latitude,
                  longitude: coord.longitude,
                }}
                title={coord.name}
                description={`Distancia ${distancia} Km`}
              />
            )
          );
        })}
      </MapView>
      <View
        style={{
          position: 'absolute', //use absolute position to show button on top of the map
          bottom: 0, //for center align
          alignSelf: 'flex-end', //for align to right
        }}>
        <Button
          icon={{name: 'replay', color: '#fff'}}
          onPress={_getCurrentPosition.bind(this)}
        />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  marker: {
    backgroundColor: '#15358c',
    padding: 5,
    borderRadius: 5,
  },
  mapStyle: {
    flex: 1,
  },
});

export default MapMarkers;
