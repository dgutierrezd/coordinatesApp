import React, {useRef, useEffect} from 'react';
import {graphql} from 'react-apollo';
import {GET_ALL_COORDINATES} from '../graphql/Queries';
import MapMarkers from './MapMarkers';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

const MapScreen = props => {
  const {loading, allCoordinates} = props.data;

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return <MapMarkers coordinates={allCoordinates} />;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default graphql(GET_ALL_COORDINATES)(MapScreen);
