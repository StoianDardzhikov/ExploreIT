/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Loading} from '../loading';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

export const LoginSignUp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../android/resources/background.png')}
        style={styles.backgroundImage}>
        <Image
          source={require('../../android/resources/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginBtnText}>Влезни</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerBtnText}>Регистрирай се</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  logo: {
    marginTop: 25 * vh,
    width: 45 * vh,
    height: 30 * vh,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90 * vw,
    height: 15 * vw,
    marginTop: 'auto',
    borderRadius: (30 * vw) / 5,
    backgroundColor: 'white',
    borderWidth: 0.5 * vw,
    borderColor: '#C44242',
    elevation: 3,
  },
  loginBtnText: {
    color: '#C44242',
    fontSize: 3 * vh,
  },
  registerBtnText: {
    color: '#C44242',
    fontSize: 3 * vh,
  },
  registerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90 * vw,
    height: 15 * vw,
    borderRadius: (30 * vw) / 5,
    backgroundColor: 'white',
    marginTop: 1 * vh,
    marginBottom: 10 * vh,
    borderWidth: 0.5 * vw,
    borderColor: '#C44242',
    elevation: 3,
  },
});
