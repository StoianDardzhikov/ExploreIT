import React, {useState, useEffect} from 'react';
import 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StyleSheet, Text, View, FlatList} from 'react-native';
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
import {LandmarkCard} from './_landmarkCard';

export const MainScreen = () => {
  const [allLandmarks, setAllLandmarks] = useState([]);

  useEffect(async () => {
    getAllLandmarks();
  }, []);

  const getAllLandmarks = async () => {
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
    setAllLandmarks(json.landmarks);
  };

  const renderItem = ({item}) => {
    return <LandmarkCard item={item} />;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Забележителности</Text>
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
    backgroundColor: '#BCEFDF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#07AC7A',
    marginTop: 2 * vh,
    marginBottom: 2 * vh,
  },
  list: {
    width: '100%',
  },
});
