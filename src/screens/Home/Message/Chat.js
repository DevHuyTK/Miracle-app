import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, ImageBackground } from 'react-native';
import ChatAvatar from '../../../Components/Chat/ChatAvatar';
import ChatLine from '../../../Components/Chat/ChatLine';
import HeaderChat from '../../../Components/HeaderChat';
import socketIOClient from 'socket.io-client';
import { DOMAIN } from '../../../store/constant';
import { connect } from 'react-redux';

const chatEmpty = require('../../../../assets/Chatnone.png');

function Chat(props) {
  const socket = socketIOClient(DOMAIN);
  const [chatList, setChatList] = useState([]);

  // socket.on('send-message-response', (data) => {
  //   console.log(data);
  //   setChatList(data.data);
  // });

  const getChatList = (token) => {
    fetch(`${DOMAIN}/api/user/matching_list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setChatList(res.data.matching_list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      getChatList(token);
    }
    getToken();
  }, []);

  // useEffect(() => {
  //   setChatList(props.user_info.matching_list.filter((item) => item.had_message === true));
  // }, []);

  const handleOnPress = async (item) => {
    console.log(item);
    const token = await AsyncStorage.getItem('token');
    fetch(`${DOMAIN}/api/chat/${item.user_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        socket.emit('join', {
          token: token,
          userIds: [item.user_id],
        });
        props.navigation.navigate('ChatBox', {
          data: item,
          token,
          chat: res.data,
          user: props.user_info,
        });
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderChat onNavigation={props.navigation} />
      <ScrollView
        style={styles.match}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.title}>Người bạn có thể đang quan tâm</Text>
        <ScrollView style={styles.newMatch} horizontal showsHorizontalScrollIndicator={false}>
          {props.user_info?.following_list?.map((item, index) => {
            return (
              <ChatAvatar
                key={index}
                name={item.full_name || item.username}
                avatar={item.avatar}
                onPress={() => handleOnPress(item)}
              />
            );
          })}
        </ScrollView>
        {chatList?.length > 0 && <Text style={styles.title}>Tin nhắn gần đây</Text>}
        <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
          {chatList?.map((item, index) => {
            return (
              <ChatLine
                key={index}
                name={item.full_name ? item.full_name : item.username}
                // message={item?.message.message}
                onPress={() => handleOnPress(item)}
                // isUserSending={item.message.user_post._id === user._id}
                // isSeen={item.message.is_seen}
                avatar={item.avatar}
              />
            );
          })}
        </ScrollView>
        {chatList.length === 0 && (
          <View style={styles.imageBox}>
            <ImageBackground source={chatEmpty} style={styles.image} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    width: '100%',
    // minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  noneText: {
    position: 'absolute',
    top: '50%',
  },
  image: {
    width: '100%',
    height: 500,
  },
  match: {
    backgroundColor: '#FFF',
    minHeight: '100%',
  },
  newMatch: {
    flexDirection: 'row',
    overflow: 'scroll',
    height: 110,
  },
  title: {
    margin: 8,
    fontWeight: '500',
    color: '#de6564',
  },
});

const mapStateToProps = (state) => ({
  user_info: state.account.user_info,
});

export default connect(mapStateToProps)(Chat);
