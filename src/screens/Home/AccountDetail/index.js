import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Avatar, ListItem, Icon, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DOMAIN } from '../../../store/constant';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { getMatchingListAccount } from '../../../store/Actions/AccountActions';

const { width } = Dimensions.get('window');

const pickerStyle = {
  inputIOS: {
    paddingTop: 14,
    paddingHorizontal: 10,
    paddingBottom: 12,
    fontSize: 17,
    color: '#000',
  },
  inputAndroid: {
    width: '90%',
    backgroundColor: '#FFF',
    fontWeight: '700',
    fontSize: 20,
    color: '#000',
    height: 50,
    marginBottom: 25,
    borderRadius: 50,
    marginLeft: 20,
    paddingHorizontal: 20,
  },
};
//This's what u see (_ _")
function accDetail({ navigation, ...props }) {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setAddress(props.user_info.address),
      setPhone(props.user_info.phone),
      setEmail(props.user_info.email),
      setGender(props.user_info.gender),
      setAge(props.user_info.age),
      setFullName(props.user_info.full_name);
    setDescription(props.user_info.description);
  }, []);

  const handleUpdateInfo = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    const data = {
      phone,
      full_name: fullName,
      age,
      address,
      email,
      description,
      gender,
    };
    fetch(`${DOMAIN}/api/user/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.status === 1) {
          await props.getMatchingList(token);
          await navigation.navigate('Account');
          setLoading(false);
        } else {
          setStatus(res.message);
          await Alert.alert(res.message);
          setLoading(false);
        }
      });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Icon
            name="keyboard-backspace"
            style="material"
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.leftText}>Thông tin người dùng</Text>
        </View>
      </View>
      <View style={styles.settingView}>
        <Text style={styles.titleSetting}>Thiết lập tài khoản</Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItem}>
            <View style={styles.flexBox}>
              <Text style={styles.itemText}>Họ và tên</Text>
            </View>
            <View style={styles.flexBox}>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Nhập họ và tên"
                placeholderTextColor="#666"
                autoCapitalize="none"
                name="fullName"
                onChangeText={(event) => {
                  setFullName(event);
                }}
                value={fullName}
              />
            </View>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.flexBox}>
              <Text style={styles.itemText}>Địa chỉ</Text>
            </View>
            <View style={styles.flexBox}>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Nhập địa chỉ"
                placeholderTextColor="#666"
                autoCapitalize="none"
                name="address"
                onChangeText={(event) => {
                  setAddress(event);
                }}
                value={address}
              />
            </View>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.flexBox}>
              <Text style={styles.itemText}>Số điện thoại</Text>
            </View>
            <View style={styles.flexBox}>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#666"
                autoCapitalize="none"
                onChangeText={(value) => {
                  setPhone(value);
                }}
                value={phone}
              />
            </View>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.flexBox}>
              <Text style={styles.itemText}>Tuổi</Text>
            </View>
            <View style={styles.flexBox}>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Nhập số tuổi"
                placeholderTextColor="#666"
                autoCapitalize="none"
                onChangeText={(value) => {
                  setAge(value);
                }}
                value={age}
              />
            </View>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.flexBox}>
              <Text style={styles.itemText}>Email</Text>
            </View>
            <View style={styles.flexBox}>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Nhập email"
                placeholderTextColor="#666"
                autoCapitalize="none"
                name="email"
                onChangeText={(event) => {
                  setEmail(event);
                }}
                value={email}
              />
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.itemText}>Thêm mô tả</Text>
            </View>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Hãy viết gì đó"
                placeholderTextColor="grey"
                numberOfLines={20}
                multiline={true}
                autoCapitalize="none"
                name="description"
                onChangeText={(event) => {
                  setDescription(event);
                }}
                value={description}
              />
            </View>
          </View>
        </View>
        <Text style={styles.noteText}>
          Số điện thoại và Email đã xác minh giúp bảo mật tài khoản của bạn
        </Text>
        <View style={styles.settingBox}>
          <View style={styles.settingItem}>
            <View style={styles.flexBox}>
              <Text style={styles.itemText}>Giới tính hiển thị</Text>
            </View>
            <View style={styles.flexBox2}>
              <RNPickerSelect
                style={pickerStyle}
                onValueChange={(value) => {
                  setGender(value);
                }}
                value={gender}
                items={[
                  { label: 'Nam', value: 0 },
                  { label: 'Nữ', value: 1 },
                ]}
              ></RNPickerSelect>
            </View>
          </View>
        </View>
        <View style={styles.settingBox}>
          <View style={styles.settingItemBorder}>
            <Text style={styles.itemText}>Chính sách và quyền riêng tư</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Giấy phép</Text>
          </View>
        </View>
        <Text style={styles.titleSetting}></Text>
        <TouchableOpacity style={styles.settingBox} onPress={() => handleUpdateInfo()}>
          {loading ? (
            <ActivityIndicator size={35} color="#000" />
          ) : (
            <View style={styles.settingItem}>
              <Text
                style={{
                  fontSize: 17,
                  lineHeight: 50,
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                Sửa thông tin
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const mapStateToProps = (state) => ({
  user_info: state.account.user_info,
});

const mapDispatchToProps = (dispatch) => ({
  getMatchingList: (data) => {
    dispatch(getMatchingListAccount(data));
  },
});

//Style - Like CSS bro :)
const styles = StyleSheet.create({
  flexBox: {
    width: '45%',
  },
  flexBox2: {
    width: '52%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    width: '70%',
  },
  leftText: {
    marginLeft: 15,
    fontSize: 20,
  },
  settingView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#efedf3',
  },
  textAreaContainer: {
    borderColor: '#dddddd',
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  vip: {
    width: '100%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  vipBox: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  icon: {
    marginTop: 5,
  },
  vipIcon: {
    width: 35,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  vipIconText: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  vipText: {
    color: '#999',
    fontWeight: 'bold',
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
  },
  titleSetting: {
    fontSize: 15,
    color: '#666',
    marginHorizontal: 20,
    paddingVertical: 10,
    textTransform: 'uppercase',
  },
  input: {
    height: 50,
    fontSize: 16,
  },
  select: {
    backgroundColor: 'red',
  },
  settingBox: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    marginBottom: 20,
    elevation: 15,
  },
  settingItemBorder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingItemBorderRange: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  noteText: {
    color: '#666',
    fontSize: 13,
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: -10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 50,
  },
  itemText: {
    fontSize: 17,
    lineHeight: 50,
  },
  itemTextRange: {
    height: 50,
    lineHeight: 50,
    textAlign: 'right',
    fontSize: 17,
    width: '50%',
    color: '#666',
  },
  inputRange: {
    width: '100%',
    height: 40,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(accDetail);
