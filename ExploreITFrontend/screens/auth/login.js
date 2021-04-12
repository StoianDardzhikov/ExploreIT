/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../AuthContext';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

export const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../android/resources/backgrounds/background.png')}
        style={styles.backgroundImage}>
        <View style={styles.formContainer}>
          <View style={styles.iconContainer}>
            <Icon style={styles.userIcon} name="user" size={50} color="#000" />
          </View>
          <View style={styles.textInputContainer}>
            <Icon name="envelope" size={20} color="#000" />
            <TextInput
              placeholder="e-поща..."
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={username => {
                setUsername({value: username});
              }}></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Icon name="key" size={20} color="#000" />
            <TextInput
              placeholder="парола..."
              placeholderTextColor="gray"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={password => {
                setPassword({value: password});
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              signIn({username, password});
            }}>
            <Text style={styles.loginBtnText}>Влез</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: 8 * vw,
    paddingTop: 20 * vw,
    backgroundColor: 'white',
    elevation: 6,
    marginBottom: 5 * vh,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    top: -5 * vh,
    width: 20 * vw,
    height: 20 * vw,
    borderRadius: (30 * vw) / 2,
  },
  userIcon: {
    position: 'relative',
  },
  logo: {
    marginTop: 10 * vh,
    width: 33 * vh,
    height: 33 * vh,
  },
  textInput: {
    backgroundColor: 'white',
    width: 70 * vw,
    height: 8 * vh,
    paddingLeft: 5 * vw,
    marginBottom: 1 * vh,
    backgroundColor: 'white',
    color: 'gray',
    borderBottomWidth: 0.1 * vh,
    borderBottomColor: 'gray',
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60 * vw,
    height: 17 * vw,
    marginTop: 4 * vh,
    borderRadius: (30 * vw) / 2,
    backgroundColor: '#97D8C4',
  },
  loginBtnText: {
    color: 'white',
    fontSize: 3 * vh,
  },
});
