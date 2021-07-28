//Library - Of course!
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { DOMAIN } from '../../../store/constant';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';

const img = require('../../../../assets/logo.png');
const pickerStyle = {
  inputIOS: {
    width: '90%',
    backgroundColor: '#FFF',
    fontWeight: '500',
    color: '#666',
    height: 50,
    marginBottom: 25,
    borderRadius: 50,
    marginLeft: 20,
    paddingHorizontal: 20,
  },
  inputAndroid: {
    width: '90%',
    backgroundColor: "#FFF",
    color: '#fff',
    height: 50,
    marginBottom: 25,
    borderRadius: 50,
    marginLeft: 20,
    paddingHorizontal: 20,
  }
};
//This's what u see (_ _")
function Register({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  console.log(gender);
  
  const handleOnPress = () => {
    setLoading(true);
    fetch(`${DOMAIN}/api/user/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: fullName,
        username: userName,
        password,
        gender,
        confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.status === 1) {
          setTimeout(() => {
            navigation.navigate('Login');
          }, 1000);
          setStatus([res.message, true]);
          setUserName("");
          setGender("");
          setFullName("");
          setPassword("");
          setConfirmPassword("");
          setLoading(false);
        } else {
          setStatus([res.message, false]);
          setPassword("");
          setConfirmPassword("");
          setLoading(false);
        }
      });
  };

  return (
    <View>
      <TouchableOpacity style={styles.titleView} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.title}>Trở về</Text>
      </TouchableOpacity>
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
          onChangeText={(value) => setUserName(value)}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Tên hiển thị"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={fullName}
          onChangeText={(value) => setFullName(value)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Mật khẩu"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
        />
        <RNPickerSelect
          placeholder={{
            label: 'Lựa chọn giới tính...',
            value: null,
          }}
          style={pickerStyle}
          onValueChange={(value) => {
            setGender(value);
          }}
          value={gender}
          items={[
            { label: 'Nam', value: 1 },
            { label: 'Nữ', value: 0 },
          ]}
        />
        <TouchableOpacity style={styles.button2} onPress={handleOnPress}>
          {loading ? (
            <ActivityIndicator size={35} color="#fff" />
          ) : (
            <Text style={styles.buttonText2}>ĐĂNG KÝ</Text>
          )}
        </TouchableOpacity>
        <View>
          <Text style={styles.error}>{status[0]}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

//Style - Like CSS bro :)
const styles = StyleSheet.create({
  error: {
    marginTop: 10,
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
    marginBottom: 50,
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
    borderWidth: 2,
    borderColor: '#FFF',
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default Register;
