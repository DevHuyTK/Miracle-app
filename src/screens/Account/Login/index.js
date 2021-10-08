import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  LogBox,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DOMAIN } from '../../../store/constant';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import {getAccountNewFeed, getAccountUserNewFeed, getAllAccount} from '../../../store/Actions/AccountActions'

const img = require('../../../../assets/logo.png');

//This's what u see (_ _")
function Login(props) {
  const [userName, serUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleLogin = () => {
    setLoading(true);
    fetch(`${DOMAIN}/api/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.status === 1) {
          await AsyncStorage.setItem('token', res.token);
          await AsyncStorage.setItem('user', JSON.stringify(res.user));
          props.getNewFeed(res.token);
          props.getUserNewFeed(res.token);
          props.getAllUser();
          setStatus('');
          serUserName('');
          setPassword('');
          setLoading(false);
          props.navigation.navigate('Home');
        } else {
          setStatus(res.message);
          setPassword('');
          // await Alert.alert(res.message);
          setLoading(false);
        }
      });
  };
  const handleOnChangeUserName = (value) => {
    serUserName(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleChangeStack = () => {
    props.navigation.navigate('Signup2');
  };

  LogBox.ignoreAllLogs(true);

  return (
    <LinearGradient colors={['#2B92E4', '#6FC7E1']} style={styles.login}>
      <View style={styles.logo}>
        <ImageBackground source={img} style={styles.image} />
        <Text style={styles.logoText}>miracle</Text>
      </View>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Tên đăng nhập"
        placeholderTextColor="#666"
        autoCapitalize="none"
        value={userName}
        onChangeText={(value) => handleOnChangeUserName(value)}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Mật khẩu"
        placeholderTextColor="#666"
        autoCapitalize="none"
        value={password}
        onChangeText={(value) => handleOnChangePassword(value)}
      />
      <TouchableOpacity style={styles.button2} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size={35} color="#fff" />
        ) : (
          <Text style={styles.buttonText3}>ĐĂNG NHẬP</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDK} onPress={handleChangeStack}>
        <Text style={styles.buttonText2}>Chưa có tài khoản đăng ký ngay</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.error}>{status}</Text>
      </View>
    </LinearGradient>
  );
}
const mapStateToProps = (state) => ({
  newfeed: state.account.newfeed,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getNewFeed: (data) => {
      dispatch(getAccountNewFeed(data));
    },
    getUserNewFeed: (data) => {
      dispatch(getAccountUserNewFeed(data));
    },
    getAllUser: (data) => {
      dispatch(getAllAccount(data));
    },
  };
};

//Style - Like CSS bro :)
const styles = StyleSheet.create({
  error: {
    width: '100%',
    textAlign: 'center',
    color: '#F9476C',
    fontSize: 17,
    fontWeight: '700',
  },
  titleView: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
    height: 50,
    width: '100%',
    zIndex: 99999,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    lineHeight: 50,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  login: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  logoText: {
    fontSize: 56,
    color: '#FFF',
    fontWeight: 'bold',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  input: {
    width: '90%',
    backgroundColor: '#FFF',
    height: 50,
    marginBottom: 25,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  button2: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  buttonText2: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 16,
  },
  buttonText3: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 18,
  },
  buttonDK: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#FFF',
    marginVertical: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
