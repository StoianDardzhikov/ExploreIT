/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useEffect} from 'react';
import 'react-native-vector-icons';
import {AuthContext} from '../../AuthContext';

import {Animated, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export function UserProfile() {
  const {signOut} = React.useContext(AuthContext);

  const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        }}>
        {props.children}
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container]}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>LOG OUT</Text>
      </TouchableOpacity>
      <FadeInView
        style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
