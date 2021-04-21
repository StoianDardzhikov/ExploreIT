/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import 'react-native-vector-icons';

import {StyleSheet, Animated, View, Dimensions, Text} from 'react-native';
import {vh} from 'react-native-viewport-units';
import Icon from 'react-native-vector-icons/FontAwesome5';

export function Loading({action}) {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animLeft();
  }, []);

  const animLeft = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 12,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => animLeft());
  };

  const xVal = rotateAnim.interpolate({
    inputRange: [0, 2, 3, 4, 6, 8, 12],
    outputRange: [
      '0deg',
      '-10deg',
      '0deg',
      '90deg',
      '180deg',
      '270deg',
      '360deg',
    ],
  });

  const rotateAnimStyle = {
    transform: [
      {
        rotateZ: xVal,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loadingBox, rotateAnimStyle]}>
        <Icon
          name="map-marker-alt"
          size={7 * vh}
          color="darkred"
          style={styles.mapMarkerIcon}
        />
      </Animated.View>
      <Text style={styles.actionText}>{action}</Text>
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
  loadingBox: {
    width: 20 * vh,
    height: 20 * vh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: 'black',
    fontSize: 3 * vh,
  },
});
