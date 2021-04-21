/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import Carousel from 'react-native-snap-carousel';
import {Loading} from '../../loading';
import {VisitButton} from './_visitButton';
import base64 from 'react-native-base64';

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
import AsyncStorage from '@react-native-async-storage/async-storage';

var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

export const Home = ({navigation}) => {
  const carouselAnim = useRef(new Animated.Value(6)).current;
  let watchIdCurrPosition;

  const mapRef = useRef();
  const carousel = useRef();

  const [isLoading, setIsLoading] = useState(true);

  const [isCarouselLifted, setIsCarouselLifted] = useState(true);

  const [markers, setMarkers] = useState([]);
  //const [nearLandmarks, setNearLandmarks] = useState([]);
  const [allLandmarks, setAllLandmarks] = useState([]);

  const [intialRenderController, setInitialRenderController] = useState(false);

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.035,
  });
  const [cameraFocusPosition, setCameraFocusPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.035,
  });

  useEffect(async () => {
    if (intialRenderController == false) await requestLocationPermission();
    setInitialRenderController(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      async function updateMarkers() {
        await watchPosition();
        await getAllMarkers();
      }

      updateMarkers();

      return () => Geolocation.stopObserving();
    }, [navigation]),
  );

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log(granted);
      if (granted === 'granted') {
        await locateInitialLocation();
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
        setCameraFocusPosition(region);
        console.log('initial');
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
    watchIdCurrPosition = Geolocation.watchPosition(
      position => {
        let currPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.035,
        };
        console.log(currPosition);
        setCurrentPosition(currPosition);
      },
      error => console.error(error),
      {
        enableHighAccuracy: false,
        timeout: 100000,
        maximumAge: 0,
        distanceFilter: 0.5,
        useSignificantChanges: false,
      },
    );
  };

  const getAllMarkers = async () => {
    let accessToken = await AsyncStorage.getItem('@ACCESS_TOKEN');
    let response = await fetch(
      'https://exploreit.foema.com/landmarks/markers',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
          Host: 'exploreit.foema.com',
        },
      },
    );
    let json = await response.json();
    loadingText = 'Зареждаме картата...';
    setAllLandmarks(json.landmarks);
  };

  const loadLandmarkPage = item => {
    navigation.navigate('LandmarkPage', {item: item});
  };

  if (isLoading) {
    return <Loading action="Зареждаме картата..." />;
  }

  return (
    <View style={styles.mapContainer}>
      <VisitButton currPosition={currentPosition} />
      <MapView
        style={styles.map}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={cameraFocusPosition}>
        {allLandmarks.map(marker => (
          <Marker
            key={marker.id}
            pinColor={marker.isVisited ? 'darkgreen' : 'darkred'}
            coordinate={{
              latitude: parseFloat(marker.lat),
              longitude: parseFloat(marker.lon),
            }}
            title={marker.name}>
            <Callout onPress={() => loadLandmarkPage(marker)}>
              <View style={styles.calloutContainer}>
                <View style={styles.calloutRowContainer}>
                  <View style={styles.calloutTextWrapper}>
                    <Text style={styles.callOutMarkerName}>{marker.name}</Text>
                  </View>
                  <Text style={styles.callOutRatingText}>{marker.rating}</Text>
                  <Icon
                    style={styles.callOutRatingIcon}
                    name="star"
                    size={2 * vh}
                  />
                </View>
                <View style={styles.callOutMoreContainer}>
                  <Text style={styles.callOutMoreText}>Виж още</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
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

  calloutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutRowContainer: {
    width: 40 * vw,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  callOutRatingText: {
    fontSize: 2.4 * vh,
    color: '#C44242',
    marginRight: 0.5 * vw,
  },
  callOutRatingIcon: {
    color: '#E9DC17',
    fontSize: 20,
  },
  callOutMarkerName: {
    fontSize: 2 * vh,
    alignSelf: 'center',
    color: '#C44242',
    marginRight: 'auto',
  },
  callOutMoreContainer: {
    width: 28 * vw,
    marginTop: 1 * vh,
    height: 3 * vh,
    backgroundColor: '#C44242',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3 * vw,
  },
  callOutMoreText: {
    color: 'white',
  },
  calloutTextWrapper: {
    width: '70%',
    height: 'auto',
  },
});
