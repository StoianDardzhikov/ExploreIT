/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import 'react-native-vector-icons';

import {StyleSheet, Text, View, FlatList} from 'react-native';
import {vh} from 'react-native-viewport-units';
import {LandmarkOnMap} from './landmarkScreens/landmarkOnMap';
import {LandmarkPage} from './landmarkScreens/landmarkPage';
import {Home} from './homeScreens/home';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LandmarkPage"
        component={LandmarkPage}
        options={{
          headerStyle: {
            backgroundColor: '#C44242',
            height: 10 * vh,
          },
          title: 'Информация',
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="LandmarkOnMap"
        component={LandmarkOnMap}
        options={{
          headerStyle: {
            backgroundColor: '#C44242',
            height: 10 * vh,
          },
          title: 'Опътвания',
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#BCEFDF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#07AC7A',
    marginTop: 2 * vh,
    marginBottom: 2 * vh,
  },

  list: {
    width: '100%',
  },
  itemContainer: {
    height: 30 * vh,
    width: '100%',
    backgroundColor: '#9ADEC9',
    marginBottom: 2 * vh,
    elevation: 6,
    alignItems: 'center',
  },
  itemName: {
    marginTop: 1 * vh,
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold',
  },
});
