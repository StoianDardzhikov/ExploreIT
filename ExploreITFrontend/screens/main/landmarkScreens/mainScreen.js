import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StyleSheet, Text, View, FlatList} from 'react-native';
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
import {LandmarkCard} from './_landmarkCard';
import {Loading} from '../../loading';

export const MainScreen = ({navigation}) => {
  const [allLandmarks, setAllLandmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchAPI() {
        console.log('Fetching');
        await getAllLandmarks();
      }

      fetchAPI();
    }, [navigation]),
  );

  const getAllLandmarks = async () => {
    let accessToken = await AsyncStorage.getItem('@ACCESS_TOKEN');
    let response = await fetch('https://exploreit.foema.com/landmarks/list', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
        Host: 'exploreit.foema.com',
      },
    });
    let json = await response.json();
    setAllLandmarks(json.landmarks);
    setIsLoading(false);
  };

  const renderItem = ({item}) => {
    return <LandmarkCard item={item} />;
  };

  if (isLoading) return <Loading action="Зареждаме забележителностите..." />;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Забележителности</Text>
      </View>
      <FlatList
        data={allLandmarks}
        renderItem={renderItem}
        keyExtractor={landmark => landmark.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E8E8E8',
  },
  titleContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#C44242',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2 * vh,
    marginBottom: 2 * vh,
  },
  list: {
    width: '100%',
  },
});
