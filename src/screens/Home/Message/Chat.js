
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState, useEffect } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  View,
} from 'react-native'
import ChatAvatar from '../../../Components/Chat/ChatAvatar'
import ChatLine from '../../../Components/Chat/ChatLine'
import HeaderChat from '../../../Components/HeaderChat'
import { ChangeDataContext } from '../../../contexts/ChangeData'
import socketIOClient from 'socket.io-client'
import {DOMAIN} from '../../../store/constant'

function Chat({ navigation }) {
  const socket = socketIOClient(DOMAIN)
  const [data, setData] = useState([])
  const [user, setUser] = useState({})
  const [chatList, setChatList] = useState([])
  const { isChanged, setIsChanged } = useContext(ChangeDataContext)
  
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
  }, [isChanged]);

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token')
    fetch(`${DOMAIN}/api/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        setIsChanged(!isChanged)
      })
  }, [])

  const handleOnPress = async (item) => {
    const token = await AsyncStorage.getItem('token')
    fetch(`${DOMAIN}/chat?userId=${item._id}`, {
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
        })
        navigation.navigate('ChatBox', {
          data: item,
          token,
          chat: res.data,
          user,
        })
      })
  }

  return (
    <View style={{flex: 1}}>
    <HeaderChat onNavigation={navigation}/>
    <ScrollView
      style={styles.match}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {data.length > 0 && <Text style={styles.title}>Tương hợp mới</Text>}
      {data.length > 0 && (
        <ScrollView
          style={styles.newMatch}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {data.map((item, index) => {
            return (
              <ChatAvatar
                key={index}
                name={item.full_name || item.username}
                avatar={item.avatar}
                onPress={() => handleOnPress(item)}
              />
            )
          })}
        </ScrollView>
      )}
      {chatList?.length > 0 && <Text style={styles.title}>Tin nhắn</Text>}
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
          )
        })}
      </ScrollView>
      {chatList.length === 0 && (
        <View style={styles.imageBox}>
          <Text style={styles.noneText}>Bạn chưa có cuộc trò chuyện nào!</Text>
        </View>
      )}
    </ScrollView>
    
    </View>
  )
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
})

export default Chat
