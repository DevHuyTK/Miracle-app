import React, { useState } from 'react';
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
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DOMAIN } from '../../../store/constant';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import {
  getMatchingListAccount,
  getAllAccount,
} from '../../../store/Actions/AccountActions';
import LottieView from 'lottie-react-native';

const img = require('../../../../assets/Miracle.png');

//This's what u see (_ _")
function Login({ navigation, ...props }) {
  const [userName, serUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [modelVisible, setModelVisible] = useState(false);

  const errorModel = () => {
    return (
      <TouchableOpacity style={styles.error} onPress={() => setModelVisible(false)}>
        <View style={styles.errorContainer}>
          <LottieView
            autoPlay
            loop={false}
            speed={1}
            style={{
              height: 150,
              alignSelf: 'center',
            }}
            source={require('../../../../assets/Animations/43899-false-animation.json')}
          />
          <Text style={styles.errorText}>{status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleLogin = () => {
    setLoading(true);
    fetch(`${DOMAIN}/api/user/login`, {
      method: 'POST',
      headers: {
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
          await props.getMatchingList(res.token);
          props.getAllUser();
          navigation.navigate('Home');
          setLoading(false);
          setStatus('');
          serUserName('');
          setPassword('');
        } else {
          setStatus(res.message);
          setModelVisible(true);
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
    navigation.navigate('Signup2');
  };

  LogBox.ignoreAllLogs(true);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient colors={['#2B92E4', '#6FC7E1']}>
          <View>
            <View style={styles.login}>
              <View style={styles.logo}>
                <ImageBackground source={img} style={styles.image} />
                {/* <Text style={styles.logoText}>iracle</Text> */}
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
            </View>
          </View>
          <Modal
            animationType="slide"
            visible={modelVisible}
            transparent={true}
            onRequestClose={() => {
              setModelVisible(false);
            }}
          >
            {errorModel()}
          </Modal>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  return {
    user_info: state.account.user_info,
    newfeed: state.account.newfeed,
    user_newfeed: state.account.user_newfeed,
    alluser: state.account.alluser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMatchingList: (data) => {
      dispatch(getMatchingListAccount(data));
    },
    getAllUser: (data) => {
      dispatch(getAllAccount(data));
    },
  };
};

//Style - Like CSS bro :)
const styles = StyleSheet.create({
  error: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    position: 'relative',
  },
  errorContainer: {
    backgroundColor: 'white',
    width: '50%',
    borderRadius: 50,
    position: 'absolute',
    left: '25%',
  },
  errorText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
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
    color: '#4ede79',
    fontWeight: 'bold',
  },
  image: {
    width: 125,
    height: 100,
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
