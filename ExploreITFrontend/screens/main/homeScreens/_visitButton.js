import React, {useRef, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VisitButton = currPosition => {
  const sendCurrPosition = async currPosition => {
    let accessToken = await AsyncStorage.getItem('@ACCESS_TOKEN');
    let response = await fetch('https://exploreit.foema.com/landmarks/visit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
        Host: 'exploreit.foema.com',
      },
      body: JSON.stringify({
        visitDate: Date.now(),
        lat: currPosition.latitude,
        lon: currPosition.longitude,
      }),
    });
    let json = await response.json();
    console.log(json);
  };

  return (
    <TouchableOpacity
      onPress={() => sendCurrPosition(currPosition)}
      style={styles.visitButton}>
      <Icon name="map-marker-alt" size={3 * vh} style={styles.visitIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  visitButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 100 * vh,
    height: 7 * vh,
    width: 7 * vh,
    right: 3 * vw,
    top: 3 * vw,
    elevation: 10,
    zIndex: 1000,
  },
  visitIcon: {
    color: '#C44242',
  },
});
