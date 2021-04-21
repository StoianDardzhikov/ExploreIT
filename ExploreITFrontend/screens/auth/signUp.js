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

export const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {signUp} = React.useContext(AuthContext);

  const checkValidUsername = username => {
    if (!username.value) {
      setUsernameError('Въведете име!');
      return false;
    } else if (username.value.length < 3) {
      setUsernameError('Името не трябва да е по-малко от 3 знака!');
      return false;
    } else if (username.value.length > 10) {
      setUsernameError('Името не трябва да е по-голямо от 10 знака!');
      return false;
    } else {
      setUsernameError(' ');
      return true;
    }
  };

  const checkValidPassword = password => {
    if (!password.value) {
      setPasswordError('Въведете парола!');
      return false;
    } else if (password.value.length < 5) {
      setPasswordError('Паролата не трябва да е по-малка от 5 знака!');
      return false;
    } else if (password.value.length > 20) {
      setPasswordError('Паролата не трябва да е по-голяма от 20 знака!');
      return false;
    } else {
      setPasswordError(' ');
      return true;
    }
  };

  const checkAldreadyInUseUsername = status => {
    if (status === 450) {
      setUsernameError('Вече има съществуващ профил с такова име!');
    } else setUsernameError(' ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.iconContainer}>
          <Icon style={styles.userIcon} name="user" size={50} color="#000" />
        </View>
        <View style={styles.textInputContainer}>
          <Icon name="user" size={20} color="#000" />
          <TextInput
            placeholder="име..."
            placeholderTextColor="gray"
            style={styles.textInput}
            onChangeText={username => {
              setUsername({value: username});
            }}></TextInput>
        </View>
        <View style={styles.errorWrapper}>
          <Text style={styles.errorText}>{usernameError}</Text>
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
        <View style={styles.errorWrapper}>
          <Text style={styles.errorText}>{passwordError}</Text>
        </View>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={async () => {
            let validUsername = checkValidUsername(username);
            let validPassword = checkValidPassword(password);
            if (validUsername && validPassword) {
              let status = await signUp({username, password});
              checkAldreadyInUseUsername(status);
            }
          }}>
          <Text style={styles.registerBtnText}>Регистрирай се</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5CFCF',
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
  registerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60 * vw,
    height: 17 * vw,
    marginTop: 4 * vh,
    borderRadius: (30 * vw) / 2,
    backgroundColor: '#C44242',
  },
  registerBtnText: {
    color: 'white',
    fontSize: 3 * vh,
  },
  errorWrapper: {
    width: 70 * vw,
  },
  errorText: {
    fontSize: 1.3 * vh,
    color: 'red',
  },
});
