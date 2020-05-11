import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, View, Text} from 'react-native';
import {ApolloProvider} from 'react-apollo';
import client from './graphql/ApolloClient';
import MapScreen from './Components/MapScreen';
import HomeScreen from './Components/HomeScreen';
import 'react-native-gesture-handler';
import MyTabs from './Components/MyTabs';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MyTabs />
        {/* <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator> */}
      </NavigationContainer>
      {/* <MapScreen /> */}
    </ApolloProvider>
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
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default App;
