/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import Carousel from 'react-native-snap-carousel';
import {Loading} from '../../loading';
import MapViewDirections from 'react-native-maps-directions';
import {VisitButton} from './_visitButton';
import base64 from 'react-native-base64';
import {Rating, AirbnbRating} from 'react-native-ratings';

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
  const markerRef = useRef();

  const [isLoading, setIsLoading] = useState(true);

  const [isCarouselLifted, setIsCarouselLifted] = useState(true);

  const [markers, setMarkers] = useState([]);
  const [nearLandmarks, setNearLandmarks] = useState([]);
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

  const [directionMode, setDirectionMode] = useState('WALKING');

  useEffect(async () => {
    if (intialRenderController == false) await requestLocationPermission();
    setInitialRenderController(true);
    console.log('-=---');
    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  useEffect(async () => await getNearLandmarks(), [currentPosition]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (granted === 'granted') {
        await locateInitialLocation();
        await watchPosition();
        await getAllMarkers();
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
        setIsLoading(false);
        setCurrentPosition(region);
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
        setCurrentPosition(currPosition);
      },
      error => console.error(error),
      {
        enableHighAccuracy: false,
        timeout: 100000,
        maximumAge: 0,
        distanceFilter: 1,
        useSignificantChanges: true,
      },
    );
  };

  const getNearLandmarks = async () => {
    let accessToken = await AsyncStorage.getItem('@ACCESS_TOKEN');
    let response = await fetch('https://exploreit.foema.com/landmarks/near', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
        Host: 'exploreit.foema.com',
      },
      body: JSON.stringify({
        searchRadius: 10,
        lat: currentPosition.latitude,
        lon: currentPosition.longitude,
      }),
    });
    let json = await response.json();

    setNearLandmarks(json.landmarks);
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
    console.log(json);
    setAllLandmarks(json.landmarks);
  };

  const renderCarouselItem = ({item}) => {
    return (
      <View style={styles.carouselItemContainer}>
        <Image
          style={styles.carouselItemImage}
          source={{
            uri:
              'data:image/jpeg;base64,' + arrayBufferToBase64(item.image.data),
          }}
        />
        <View style={styles.carouselItemInfoContainer}>
          <Text style={styles.carouselItemText}>{item.name}</Text>
          <Text style={styles.carouselItemRating}>4.3</Text>
          <Icon
            name="star"
            size={2.5 * vh}
            style={styles.carouselItemStarIcon}
          />
        </View>
      </View>
    );
  };

  const arrayBufferToBase64 = buffer => {
    return base64.encodeFromByteArray(new Uint8Array(buffer));
  };

  const onCarouselItemChange = index => {
    let location = nearLandmarks[index];
    animateToRegion(location);

    let cameraFocusPosition = {
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon),
      latitudeDelta: 0.05,
      longitudeDelta: 0.035,
    };
    setCameraFocusPosition(cameraFocusPosition);
    markers[index].showCallout();
  };

  const animateToRegion = location => {
    mapRef.current.animateToRegion({
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon),
      latitudeDelta: 0.05,
      longitudeDelta: 0.035,
    });
  };

  const setDirectionModeFromChildren = mode => {
    setDirectionMode(mode);
  };

  const dropCarouselDown = () => {
    Animated.timing(carouselAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setIsCarouselLifted(false);
  };

  const liftCarouselUp = () => {
    Animated.timing(carouselAnim, {
      toValue: 6,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setIsCarouselLifted(true);
  };

  const yVal = carouselAnim.interpolate({
    inputRange: [0, 2, 3, 4, 5, 6],
    outputRange: [0, -3 * vh, 12 * vh, 25 * vh, 36 * vh, 34 * vh],
  });

  const carouselAnimStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  const loadLandmarkPage = item => {
    navigation.navigate('LandmarkPage', {item: item});
  };

  if (isLoading) {
    return <Loading />;
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
            coordinate={{
              latitude: parseFloat(marker.lat),
              longitude: parseFloat(marker.lon),
            }}
            title={marker.name}>
            <Callout onPress={() => loadLandmarkPage(marker)}>
              <View style={styles.calloutContainer}>
                <View style={styles.calloutRowContainer}>
                  <Text style={styles.callOutMarkerName}>{marker.name}</Text>
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
        {nearLandmarks.map((marker, index) => (
          <Marker
            key={marker.id}
            ref={markerRef => (markers[index] = markerRef)}
            coordinate={{
              latitude: parseFloat(marker.lat),
              longitude: parseFloat(marker.lon),
            }}
            title={marker.name}>
            <Callout>
              <Text>{marker.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Animated.View style={[styles.carouselAnimContainer, carouselAnimStyle]}>
        <TouchableOpacity
          style={styles.carouselButton}
          onPress={() =>
            isCarouselLifted ? dropCarouselDown() : liftCarouselUp()
          }>
          {!isCarouselLifted ? (
            <Icon name="angle-up" style={styles.carouselButtonTextLifted} />
          ) : (
            <Icon name="angle-up" style={styles.carouselButtonTextDropped} />
          )}
        </TouchableOpacity>
        <View style={styles.carouselContainer}>
          <Carousel
            containerCustomStyle={styles.carousel}
            ref={carousel}
            data={nearLandmarks}
            onSnapToItem={index => onCarouselItemChange(index)}
            renderItem={renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={80 * vw}
          />
        </View>
      </Animated.View>
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
  carouselAnimContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    width: '100%',
    height: 34 * vh,
    backgroundColor: 'white',
  },
  carouselButton: {
    width: 35 * vw,
    height: 4 * vh,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 3 * vw,
    borderTopRightRadius: 3 * vw,
  },
  carouselButtonTextLifted: {
    fontSize: 30,
    transform: [{rotate: '180deg'}],
    color: '#C44242',
  },
  carouselButtonTextDropped: {
    fontSize: 30,
    color: '#C44242',
  },
  carouselItemContainer: {
    marginTop: 2 * vh,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    elevation: 3,
  },
  carouselItemInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  carouselItemImage: {
    height: 25 * vh,
    width: 80 * vw,
  },
  carouselItemText: {
    color: 'black',
    fontSize: 26,
    padding: 1 * vw,
    marginLeft: 5 * vw,
  },
  carouselItemRating: {
    color: '#C44242',
    fontSize: 26,
    padding: 1 * vw,
    marginLeft: 'auto',
  },
  carouselItemStarIcon: {
    color: '#E9DC17',
    marginRight: 5 * vw,
  },
  calloutRowContainer: {
    width: 30 * vw,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  callOutRatingText: {
    fontSize: 20,
    color: '#C44242',
    marginRight: 1 * vw,
  },
  callOutRatingIcon: {
    color: '#E9DC17',
    fontSize: 20,
    marginRight: 1 * vh,
  },
  callOutMarkerName: {
    fontSize: 20,
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
});
