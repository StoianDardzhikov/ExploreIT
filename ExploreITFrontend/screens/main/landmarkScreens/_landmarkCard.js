import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {vh} from 'react-native-viewport-units';
import {useNavigation} from '@react-navigation/native';

export const LandmarkCard = item => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.item.name}</Text>
      <TouchableOpacity
        style={styles.itemTouchableOpacity}
        onPress={() => navigation.navigate('LandmarkPage', {item: item.item})}>
        <Text style={styles.itemTouchableOpacityText}>Още информация</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 30 * vh,
    width: '100%',
    backgroundColor: '#9ADEC9',
    marginBottom: 2 * vh,
    elevation: 6,
    alignItems: 'center',
  },
  itemName: {
    marginTop: 1 * vh,
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold',
  },
  itemTouchableOpacity: {
    width: '70%',
    height: '15%',
    marginTop: 'auto',
    marginBottom: 2 * vh,
    backgroundColor: '#9ADECF',
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTouchableOpacityText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
