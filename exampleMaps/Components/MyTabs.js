import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Map"
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({focused, color}) => (
            <Icon name="map" size={30} color={color} />
          ),
        }}
        component={MapScreen}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
