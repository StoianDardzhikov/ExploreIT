import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {vh, vw} from 'react-native-viewport-units';
import {useNavigation} from '@react-navigation/native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';

export const LandmarkCard = item => {
  const navigation = useNavigation();

  const [overallRating, setOverallRating] = useState(item.item.rating);
  const [userRating, setUserRating] = useState(3);
  const [rated, setRated] = useState(false);

  const ratingChanged = rating => {
    setUserRating(rating);
  };

  const sendRating = async () => {
    let accessToken = await AsyncStorage.getItem('@ACCESS_TOKEN');
    let response = await fetch('https://exploreit.foema.com/landmarks/rate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
        Host: 'exploreit.foema.com',
      },
      body: JSON.stringify({
        landmarkId: item.item.id,
        ratingValue: userRating,
      }),
    });
    let json = await response.json();
    setRated(true);
    setOverallRating(json.rating);
  };

  const arrayBufferToBase64 = buffer => {
    return base64.encodeFromByteArray(new Uint8Array(buffer));
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.rowMainInfoContainer}>
        <View style={styles.leftSideContainer}>
          <Image
            style={styles.img}
            source={{
              uri:
                'data:image/jpeg;base64,' +
                arrayBufferToBase64(item.item.image.data),
            }}
          />
        </View>
        <View style={styles.rightSideContainer}>
          <Text style={styles.itemName}>{item.item.name}</Text>
          <View style={styles.overallRatingContainer}>
            <Text style={styles.overallRatingText}>{overallRating}</Text>
            <Rating
              ratingCount={5}
              type="custom"
              startingValue={parseFloat(overallRating)}
              imageSize={24}
              ratingBackgroundColor="lightgray"
              tintColor="white"
              readonly={true}
            />
          </View>
          <TouchableOpacity
            style={styles.itemTouchableOpacity}
            onPress={() =>
              navigation.navigate('LandmarkPage', {item: item.item})
            }>
            <Text style={styles.itemTouchableOpacityText}>Още информация</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!rated && !item.item.isRated ? (
        <View style={styles.ratingContainer}>
          <Text style={styles.rateText}>Оцени</Text>
          <View style={styles.rowRatingContainer}>
            <AirbnbRating
              type="star"
              ratingCount={5}
              reviews={['', '', '', '', '']}
              reviewSize={0}
              showRating={false}
              size={25}
              showRating
              starContainerStyle={styles.starContainer}
              onFinishRating={ratingChanged}
            />
            <TouchableOpacity
              style={styles.sendRatingButton}
              onPress={() => sendRating()}>
              <Icon name="arrow-right" size={2.5 * vh} color="#D6AE0C" />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginBottom: 2 * vh,
    elevation: 6,
    alignItems: 'center',
    borderBottomRightRadius: 4 * vw,
    borderTopRightRadius: 4 * vw,
    elevation: 10,
  },
  rowMainInfoContainer: {
    flexDirection: 'row',
  },
  leftSideContainer: {
    width: '50%',
    height: 'auto',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: 19.2 * vh,
    resizeMode: 'cover',
  },
  rightSideContainer: {
    width: '50%',
    height: 'auto',
    alignItems: 'center',
  },
  itemName: {
    marginTop: 1 * vh,
    marginBottom: 2 * vh,
    fontSize: 2.2 * vh,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 1 * vw,
  },
  overallRatingContainer: {
    flexDirection: 'row',
  },
  overallRatingText: {
    marginRight: 1 * vh,
    fontSize: 2.2 * vh,
    color: '#C44242',
  },
  itemTouchableOpacity: {
    width: '90%',
    height: 7 * vw,
    marginTop: 2 * vh,
    marginBottom: 2 * vh,
    backgroundColor: '#C44242',
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTouchableOpacityText: {
    color: 'white',
    fontSize: 1.5 * vh,
    fontWeight: 'bold',
  },
  ratingContainer: {
    paddingBottom: 2 * vw,
    backgroundColor: '#EDF1CC',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  rateText: {
    fontSize: 3 * vh,
    color: '#DFCF27',
    fontWeight: 'bold',
  },
  rowRatingContainer: {
    flexDirection: 'row',
  },
  starContainer: {
    marginRight: 5 * vh,
  },
  sendRatingButton: {
    height: 4 * vh,
    width: 4 * vh,
    marginTop: 3 * vh,
    marginLeft: 3 * vh,
    backgroundColor: '#DFCF27',
    borderRadius: 100 * vh,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
