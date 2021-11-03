import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../../Components/Header';
import { Avatar, ListItem, Icon, Input } from 'react-native-elements';
import AccountItem from '../../../Components/AccountItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DOMAIN } from '../../../store/constant';
import { ChangeDataContext } from '../../../contexts/ChangeData';

function Account({ navigation }) {
  const [loginData, setLoginData] = useState({});
  const { isChanged, setIsChanged } = useContext(ChangeDataContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
      .then((data) => setLoginData(data))
      .catch((error) => console.log(error));
  }, [isChanged]);

  const setting = [
    {
      icon: 'settings',
      title: 'Settings',
    },
    {
      icon: 'language',
      title: 'Languages',
    },
  ];
  const account = [
    {
      icon: 'list-alt',
      title: 'Cập nhật thông tin',
    },
    {
      icon: 'face',
      title: 'Cập nhật ảnh đại diện',
    },
    {
      icon: 'lock',
      title: 'Thay đổi mật khẩu',
    },
  ];

  const help = [
    {
      icon: 'report-problem',
      title: 'Report problem',
    },
  ];

  const handleLogout = async () => {
    navigation.navigate('Login');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header onNavigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            backgroundColor: '#fff',
            height: '16%',
            width: '100%',
            flexDirection: 'row',
          }}
          onPress={() => {
            navigation.navigate('Avatar');
          }}
        >
          <View style={{ width: '35%', justifyContent: 'center', alignItems: 'center' }}>
            {loginData.avatar ? (
              <Avatar
                size="large"
                rounded
                source={{
                  uri: `${DOMAIN}/${loginData.avatar}`,
                }}
              />
            ) : (
              <Avatar
                size="large"
                rounded
                icon={{ name: 'user', type: 'font-awesome' }}
                containerStyle={{ backgroundColor: 'gray' }}
              />
            )}
          </View>
          <View style={{ width: '65%', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 26 }}>{loginData.full_name}</Text>
            <Text style={{ fontSize: 16 }}>{loginData.email}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            width: '80%',
            backgroundColor: '#CED0CE',
            marginHorizontal: '10%',
            marginBottom: 10,
          }}
        />
        <AccountItem
          parentIcon="settings"
          parentTitle="Settings & Privacy"
          list={setting}
          onNavigation={navigation}
        />
        <AccountItem
          parentIcon="account-circle"
          parentTitle="Thay đổi thông tin tài khoản"
          list={account}
          onNavigation={navigation}
        />
        <AccountItem
          parentIcon="help-outline"
          parentTitle="Help & Support"
          list={help}
          onNavigation={navigation}
        />
        <ListItem.Accordion
          noIcon={true}
          style={{ marginVertical: 5, marginHorizontal: 15, borderRadius: 20 }}
          containerStyle={{ borderRadius: 20 }}
          content={
            <>
              <Icon name="logout" size={30} />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>Log out</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={false}
          onPress={() => handleLogout()}
        />
        <View
          style={{
            height: 20,
            marginHorizontal: '10%',
            marginBottom: 10,
          }}
        />
      </ScrollView>
    </View>
  );
}

export default Account;
