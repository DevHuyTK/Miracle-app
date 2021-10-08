import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, ImageBackground } from 'react-native';
import ChatAvatar from '../../../Components/Chat/ChatAvatar';
import ChatLine from '../../../Components/Chat/ChatLine';
import HeaderChat from '../../../Components/HeaderChat';
import { ChangeDataContext } from '../../../contexts/ChangeData';
import socketIOClient from 'socket.io-client';
import { DOMAIN } from '../../../store/constant';
import { connect } from 'react-redux';
import { getAllAccount } from '../../../store/Actions/AccountActions';

const chatEmpty = require('../../../../assets/Chatnone.png');

function Chat(props) {
  const socket = socketIOClient(DOMAIN);
  const [user, setUser] = useState({});
  const [chatList, setChatList] = useState([]);
  const [matchingList, setMatchingList] = useState([]);
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
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, [!isChanged]);

  // useEffect(async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   fetch(`${DOMAIN}/api/user`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(async (res) => {
  //       setMatchingList(res.data.matching_list);
  //       setIsChanged(!isChanged);
  //     });
  // }, []);

  // useEffect(async () => {
  //   setChatList(matchingList.filter((item) => item.had_message === true));
  // }, [isChanged]);

  const handleOnPress = async (item) => {
    const token = await AsyncStorage.getItem('token');
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
        props.navigation.navigate('ChatBox', {
          data: item,
          token,
          chat: res.data,
          user,
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
          {props.alluser.map((item, index) => {
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
                message={item.message.message}
                onPress={() => handleOnPress(item)}
                isUserSending={item.message.user_post._id === user._id}
                isSeen={item.message.is_seen}
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
    color: '#fe1c15',
  },
});

const mapStateToProps = (state) => ({
  alluser: state.account.alluser,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: (data) => {
      dispatch(getAllAccount(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
