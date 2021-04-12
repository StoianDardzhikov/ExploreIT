/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-vector-icons';

import {StyleSheet, Text, View, Dimensions} from 'react-native';

export function Loading() {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>Зареждане...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
