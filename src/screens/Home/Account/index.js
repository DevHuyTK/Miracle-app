import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../../Components/Header';
import { Avatar, ListItem, Icon, Input } from 'react-native-elements';
import AccountItem from '../../../Components/AccountItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DOMAIN } from '../../../store/constant';
import { connect } from 'react-redux';

function Account({ navigation, ...props }) {
  const setting = [
    {
      icon: 'settings',
      title: 'Cài đặt',
    },
    {
      icon: 'language',
      title: 'Ngôn ngữ',
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
      title: 'Báo cáo sự cố',
    },
  ];

  const handleLogout = async () => {
    navigation.navigate('Login');
    await AsyncStorage.removeItem('token');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header onNavigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            backgroundColor: '#fff',
            height: '16%',
            width: '100%',
            flexDirection: 'row',
            elevation: 15,
          }}
          onPress={() => {
            navigation.navigate('Avatar');
          }}
        >
          <View style={{ width: '35%', justifyContent: 'center', alignItems: 'center' }}>
            {props.user_info?.avatar ? (
              <Avatar
                size="large"
                rounded
                source={{
                  uri: `${DOMAIN}/${props.user_info?.avatar}`,
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
            <Text style={{ fontWeight: 'bold', fontSize: 26 }}>
              {props.user_info?.full_name ? props.user_info?.full_name : props.user_info?.username}
            </Text>
            <Text style={{ fontSize: 15 }}>{props.user_info?.email}</Text>
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
          parentTitle="Cài đặt & quyền riêng tư"
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
          parentTitle="Trợ giúp & hỗ trợ"
          list={help}
          onNavigation={navigation}
        />
        <ListItem.Accordion
          noIcon={true}
          style={{ marginVertical: 5, marginHorizontal: 15, borderRadius: 20 }}
          containerStyle={{ borderRadius: 20, elevation: 15 }}
          content={
            <>
              <Icon name="logout" size={30} />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>Đăng xuất</ListItem.Title>
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
            marginBottom: 60,
          }}
        />
      </ScrollView>
    </View>
  );
}
const mapStateToProps = (state) => ({
  user_info: state.account.user_info,
});

export default connect(mapStateToProps)(Account);
