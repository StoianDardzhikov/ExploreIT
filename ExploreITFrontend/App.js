/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useReducer, useContext, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignedOutStack} from './layouts/signedOut';
import {AuthContext} from './AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {HomeStack} from './screens/main/homeStack';
import {UserProfile} from './screens/main/userProfile';
import {Landmarks} from './screens/main/landmarks';

import {Loading} from './screens/loading';

var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import {StyleSheet, AppState} from 'react-native';
import {
  immersiveModeOn,
  immersiveModeOff,
} from 'react-native-android-immersive-mode';

function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {isLoading: true, isSignout: false, userToken: null},
  );

  React.useEffect(async () => {
    const bootstrapAsync = async () => {
      dispatch({
        type: 'RESTORE_TOKEN',
        token: await AsyncStorage.getItem('@ACCESS_TOKEN'),
      });
    };

    bootstrapAsync();
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  const handleAppStateChange = nextAppState => {
    if (nextAppState == 'active') {
      immersiveModeOn();
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        let response = await fetch('https://exploreit.foema.com/users/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: data.username.value,
            password: data.password.value,
          }),
        });
        let json = await response.json();

        if (json.accessToken) {
          dispatch(
            {type: 'SIGN_IN', token: json.accessToken},
            await AsyncStorage.setItem('@ACCESS_TOKEN', json.accessToken),
          );
        }
        if (response.status) {
          console.log(response.status);
          return response.status;
        }
      },
      signOut: async () => {
        dispatch(
          {type: 'SIGN_OUT', token: ''},
          await AsyncStorage.setItem('@ACCESS_TOKEN', ''),
        );
      },
      signUp: async data => {
        let response = await fetch(
          'https://exploreit.foema.com/users/register',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: data.username.value,
              password: data.password.value,
            }),
          },
        );
        let json = await response.json();

        if (json.accessToken) {
          dispatch(
            {type: 'SIGN_IN', token: json.accessToken},
            await AsyncStorage.setItem('@ACCESS_TOKEN', json.accessToken),
          );
        }
        if (response.status) {
          return response.status;
        }
      },
    }),
    [],
  );

  immersiveModeOn();

  if (state.isLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#C44242',
            inactiveTintColor: 'darkgray',
            height: 10 * vh,
            tabStyle: {
              backgroundColor: 'white',
              height: 10 * vh,
            },
            showIcon: true,
          }}>
          {state.userToken ? (
            <>
              <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                  title: '',
                  tabBarIcon: ({color}) => {
                    return (
                      <Icon name="map-marked-alt" size={4 * vh} color={color} />
                    );
                  },
                }}
              />
              <Tab.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                  title: '',
                  tabBarIcon: ({color}) => {
                    return <Icon name="user" size={4 * vh} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="Landmarks"
                component={Landmarks}
                options={{
                  title: '',
                  tabBarIcon: ({color}) => {
                    return <Icon name="landmark" size={4 * vh} color={color} />;
                  },
                }}
              />
            </>
          ) : (
            <Tab.Screen
              name="SignedOutStack"
              component={SignedOutStack}
              options={{
                tabBarVisible: false,
              }}
            />
          )}
        </Tab.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
