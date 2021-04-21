/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import 'react-native-vector-icons';
import {AuthContext} from '../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {vh, vw} from 'react-native-viewport-units';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

export const UserProfile = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const [visits, setVisits] = useState();
  const [username, setUsername] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      async function fetchAPI() {
        await getVisits();
      }

      fetchAPI();
    }, [navigation]),
  );

  const getVisits = async () => {
    let accessToken = await AsyncStorage.getItem('@ACCESS_TOKEN');
    let response = await fetch('https://exploreit.foema.com/users/visited', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
        Host: 'exploreit.foema.com',
      },
    });
    let json = await response.json();
    setVisits(json.visits);
    setUsername(json.username);
    setIsLoading(false);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.visitContainer}>
        <Icon
          name="map-marker-alt"
          size={3 * vh}
          color="darkred"
          style={styles.mapMarkerIcon}
        />
        <View>
          <Text style={styles.redVisitText}>{item.landmarkName}</Text>
          <View style={styles.itemTextWrapper}>
            <Text style={styles.blackVisitText}>Посетен на </Text>
            <Text style={styles.redVisitText}>
              {item.visitDate.day} {item.visitDate.month} {item.visitDate.year}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <Loading action="Зареждаме профила ви..." />;
  }
  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        <Icon name="user" size={4 * vh} color="black" />
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => signOut()}>
          <Icon name="sign-out-alt" size={3 * vh} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.overallVisitedContainer}>
        <Text style={styles.overallVisitedBlack}>
          Посетени забележителности
        </Text>
        <Text style={styles.overallVisitedRed}> {visits.length}</Text>
      </View>
      <FlatList
        data={visits}
        renderItem={renderItem}
        keyExtractor={visit => visit.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 2 * vh,
    paddingRight: 2 * vh,
    paddingTop: 1 * vw,
    paddingBottom: 1 * vw,
    alignItems: 'center',
    borderBottomWidth: 0.8 * vw,
    borderBottomColor: '#C44242',
  },
  signOutButton: {
    marginLeft: 'auto',
  },
  username: {
    marginLeft: 1 * vh,
    fontSize: 5 * vh,
    color: 'black',
    fontWeight: 'bold',
  },
  overallVisitedContainer: {
    flexDirection: 'row',
    marginTop: 2 * vh,
    marginBottom: 2 * vh,
    marginLeft: 2 * vh,
  },
  overallVisitedBlack: {
    fontSize: 2 * vh,
    color: 'black',
  },
  overallVisitedRed: {
    fontSize: 2 * vh,
    color: '#C44242',
    fontWeight: 'bold',
  },
  visitContainer: {
    alignItems: 'center',
    height: 7 * vh,
    flexDirection: 'row',
    borderBottomWidth: 0.5 * vw,
    borderBottomColor: 'gray',
    marginBottom: 2 * vh,
  },
  redVisitText: {
    color: '#C44242',
    fontWeight: 'bold',
  },
  blackVisitText: {
    color: 'black',
    fontWeight: 'bold',
  },
  list: {
    padding: 1 * vh,
    borderRadius: 2 * vw,
    borderWidth: 0.5 * vw,
    borderColor: 'lightgray',
    alignSelf: 'center',
    width: '95%',
  },
  mapMarkerIcon: {
    marginRight: 1 * vh,
  },
  itemTextWrapper: {
    flexDirection: 'row',
    width: '90%',
  },
});
