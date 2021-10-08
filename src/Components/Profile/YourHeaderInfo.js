import React from 'react';
import { Avatar, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import socketIOClient from 'socket.io-client';
import { DOMAIN } from '../../store/constant';

export default function YourHeaderInfo({ userData, navigation, token, user, posts }) {
  const socket = socketIOClient(DOMAIN);

  const handleFollow = async (userData) => {
    socket.emit('follow-user', {
      token: token,
      userId: userData._id,
    });
    socket.on('follow-user-response', (userData) => {
      console.log(userData, 'a');
      // setMatchingList(userData.userData)
    });
  };
  const handleOnPress = async (item) => {
      console.log(item);
    fetch(`${DOMAIN}/api/chat?userId=${item._id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        socket.emit('join', {
          token: token,
          userIds: [item._id],
        });
        navigation.navigate('ChatBox', {
          data: item,
          token,
          chat: res.data,
          user,
        });
      });
  };
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.left}>
          <Icon
            name="keyboard-backspace"
            style="material"
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.leftText}>{userData.username}</Text>
        </View>
      </View>
      <View backgroundColor="#fff">
        <View style={{ paddingTop: 10, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              {userData.avatar ? (
                <Avatar
                  size="large"
                  rounded
                  source={{
                    uri: `${DOMAIN}/${userData.avatar}`,
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
            <View style={{ flex: 3 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text>{Object.keys(posts).length}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>Bài viết</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text>{Object.keys(userData?.follower_list).length}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>Người theo dõi</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text>{Object.keys(userData?.following_list).length}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>Đang theo dõi</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 10 }}>
            <TouchableOpacity
              onPress={() => handleFollow(userData)}
              style={{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                borderColor: '#2B92E4',
                borderWidth: 1,
                borderRadius: 6,
              }}
            >
              {user.following_list.find((item) => item.user_id.toString() == userData._id) ? (
                <Text>Hủy theo dõi</Text>
              ) : (
                <Text>Theo dõi</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOnPress(userData)}
              style={{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                borderColor: '#2B92E4',
                borderWidth: 1,
                borderRadius: 6,
              }}
            >
              <Text>Nhắn tin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
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
});
