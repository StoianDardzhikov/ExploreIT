import React, {useState, useEffect} from 'react';
import base64 from 'react-native-base64';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {vh, vw} from 'react-native-viewport-units';
import {Rating, AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../../loading';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const LandmarkPage = ({route, navigation}) => {
  const {item} = route.params;

  const [landmark, setLandmark] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState();
  const [overallRating, setOverallRating] = useState(1);

  useEffect(async () => {
    let accessToken = await AsyncStorage.getItem('@ACCESS_TOKEN');
    let response = await fetch(
      'https://exploreit.foema.com/landmarks/' + item.id,
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
    setLandmark(json);
    setOverallRating(json.rating);
    setIsLoading(false);
  }, []);

  const arrayBufferToBase64 = buffer => {
    return base64.encodeFromByteArray(new Uint8Array(buffer));
  };

  if (isLoading) {
    return <Loading action="Зареждаме забележителността..." />;
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{
            uri:
              'data:image/jpeg;base64,' +
              arrayBufferToBase64(landmark.image.data),
          }}
        />
      </View>
      <View style={styles.ratingAndNavigationContainer}>
        <Text style={styles.overallRating}>{overallRating}</Text>
        <View style={styles.ratingColumnContainer}>
          <Rating
            ratingCount={5}
            type="custom"
            startingValue={parseFloat(overallRating)}
            imageSize={24}
            ratingBackgroundColor="lightgray"
            tintColor="white"
            readonly={true}
          />
          <Text style={styles.ratingsCount}>
            {landmark.ratingsCount} oценки
          </Text>
        </View>
        <TouchableOpacity
          style={styles.directionsButton}
          onPress={() =>
            navigation.navigate('LandmarkOnMap', {landmark: landmark})
          }>
          <Icon name="directions" size={6 * vh} style={styles.directionsIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.pageInfoContainer}>
        <Text style={styles.pageText}>{landmark.name}</Text>
        <Text style={styles.landmarkInfo}>{landmark.description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  pageInfoContainer: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    paddingLeft: 2 * vh,
    paddingRight: 2 * vh,
  },
  imgContainer: {
    backgroundColor: 'white',
    elevation: 10,
  },
  img: {
    width: '100%',
    height: 30 * vh,
    resizeMode: 'stretch',
  },
  pageText: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
  },
  landmarkInfo: {
    fontSize: 24,
    color: '#484848',
    textAlign: 'justify',
  },
  ratingAndNavigationContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 10 * vh,
  },
  overallRating: {
    fontSize: 40,
    color: '#C44242',
    marginRight: 2 * vh,
    marginLeft: 3 * vh,
  },
  ratingColumnContainer: {
    marginRight: 'auto',
  },
  ratingsCount: {
    fontSize: 15,
    marginLeft: 0.5 * vh,
  },
  directionsButton: {
    marginRight: 3 * vh,
  },
  directionsIcon: {
    color: '#C44242',
  },
});
