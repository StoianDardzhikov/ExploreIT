/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import 'react-native-vector-icons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import {Loading} from '../../loading';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  StyleSheet,
  Text,
  Platform,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {forModalPresentationIOS} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

export const LandmarkOnMap = ({route}) => {
  let watchId;
  const toggleSwitchAnim = useRef(new Animated.Value(0)).current;

  const {landmark} = route.params;
  const mapRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [toggleSwitch, setToggleSwitch] = useState(false);

  const [directionMode, setDirectionMode] = useState('WALKING');

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.035,
  });

  useEffect(() => {
    requestLocationPermission();

    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (granted === 'granted') {
        locateInitialLocation();
        watchPosition();
      }
    }
  };

  const locateInitialLocation = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.035,
        };
        setCurrentPosition(region);
        setIsLoading(false);
      },
      error => console.error(error),
      {
        enableHighAccuracy: true,
        timeout: 100000,
        maximumAge: 1000,
      },
    );
  };

  const watchPosition = async () => {
    watchId = await Geolocation.watchPosition(
      position => {
        let currPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.035,
        };
        setCurrentPosition(currPosition);
      },
      error => console.error(error),
      {
        enableHighAccuracy: false,
        timeout: 100000,
        maximumAge: 0,
        distanceFilter: 0,
      },
    );
  };

  const toggleSwitchOn = () => {
    Animated.timing(toggleSwitchAnim, {
      toValue: 6,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setToggleSwitch(true);
    setDirectionMode('DRIVING');
  };

  const toggleSwitchOff = () => {
    Animated.timing(toggleSwitchAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setToggleSwitch(false);
    setDirectionMode('WALKING');
  };

  const xVal = toggleSwitchAnim.interpolate({
    inputRange: [0, 3, 6],
    outputRange: [0, 3 * vw, 9 * vw],
  });

  const toggleSwitchAnimStyle = {
    transform: [
      {
        translateX: xVal,
      },
    ],
  };

  if (isLoading) {
    return <Loading action="Търсим най-краткия път до там..." />;
  }

  return (
    <View style={styles.mapContainer}>
      <View style={styles.switchButtonContainer}>
        <Animated.View style={toggleSwitchAnimStyle}>
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => {
              toggleSwitch ? toggleSwitchOff() : toggleSwitchOn();
            }}>
            {!toggleSwitch ? (
              <Icon name="walking" size={3 * vh} style={{color: 'white'}} />
            ) : (
              <Icon name="car" size={3 * vh} style={{color: 'white'}} />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
      <MapView
        style={styles.map}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={currentPosition}>
        <Marker
          key={landmark.id}
          coordinate={{
            latitude: parseFloat(landmark.lat),
            longitude: parseFloat(landmark.lon),
          }}
          title={landmark.name}></Marker>
        <MapViewDirections
          origin={currentPosition}
          destination={{
            latitude: parseFloat(landmark.lat),
            longitude: parseFloat(landmark.lon),
          }}
          apikey={'AIzaSyB5yfS5khTJ_zN9fW6l7xndqHPU1X4RuGI'}
          strokeWidth={3}
          strokeColor="#C44242"
          mode={directionMode}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFill,
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 3 * vh,
  },
  carouselItemContainer: {
    flex: 1,
    backgroundColor: 'rgba(151,216,196, 0.7)',
    alignItems: 'center',
  },
  carouselItemImage: {
    height: 25 * vh,
    width: 80 * vw,
  },
  carouselItemText: {
    color: 'white',
    fontSize: 26,
    marginTop: 1 * vh,
  },
  switchButtonContainer: {
    position: 'absolute',
    zIndex: 1000,
    width: 20 * vw,
    height: 10 * vw,
    backgroundColor: 'white',
    top: 5 * vw,
    left: 5 * vw,
    borderRadius: 100 * vw,
    justifyContent: 'center',
    elevation: 10,
  },
  switchButton: {
    height: 9 * vw,
    width: 9 * vw,
    backgroundColor: '#C44242',
    borderRadius: 100 * vw,
    marginLeft: 1 * vw,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
