import React from 'react';
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

import {Login} from '../screens/auth/login';
import {SignUp} from '../screens/auth/signUp';
import {LoginSignUp} from '../screens/auth/loginSignUp';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const SignedOutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginSignUp"
        component={LoginSignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: '#C44242',
            height: 10 * vh,
          },
          title: 'Влезни',
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: '#C44242',
            height: 10 * vh,
          },
          title: 'Регистрирай се',
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
};
