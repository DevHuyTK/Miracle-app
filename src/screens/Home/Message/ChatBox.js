import { StyleSheet, FlatList, View, Text, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import React, { useEffect, useState, useRef } from 'react';
import ChatBoxTitle from '../../../Components/Chat/ChatBoxTitle';
import ChatInput from '../../../Components/Chat/ChatInput';
import socketIOClient from 'socket.io-client';
import { DOMAIN } from '../../../store/constant';

const ChatBox = ({ navigation, route }) => {
  const socket = socketIOClient(DOMAIN);
  const scrollView = useRef();
  const { data, token, chat, user } = route.params;
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const { setMatchingList } = useContext(MatchingListContext)

  useEffect(() => {
    setChatList(chat);
  }, [!chat]);

  useEffect(() => {
    socket.emit('join', {
      token: token,
      userIds: [data.user_id || data._id],
    });
    socket.emit('seen-message', {
      token: token,
      userId: data.user_id || data._id,
    });
    socket.on('seen-message-response', (data) => {
      // console.log('a');
    });
    socket.on('send-message-response', (data) => {
      setLoading(false);
      setChatList((prevState) => [...prevState, data.data]);
    });
  }, []);

  const handleOnPress = () => {
    if (message.trim().length > 0) {
      setLoading(true);
      socket.emit('join', {
        token: token,
        userIds: [data.user_id || data._id],
      });
      socket.emit('send-message', {
        token: token,
        userId: data.user_id || data._id,
        message: message,
      });
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{
          backgroundColor: '#fff',
          marginTop: getStatusBarHeight(),
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          paddingBottom: 20,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ChatBoxTitle
          title={'Sửa thông tin'}
          onPress={() => navigation.navigate('Chat')}
          avatar={data?.avatar}
          name={data?.full_name}
        />
        <FlatList
          data={chatList}
          style={styles.chatBox}
          ref={scrollView}
          onContentSizeChange={() => scrollView.current.scrollToEnd({ animated: true })}
          keyExtractor={(item) => item?._id}
          renderItem={({ item, key }) => {
            const isUserSending = item?.user_id || item?._id === user._id;
            return (
              <View key={key} style={{ paddingBottom: 5 }}>
                <View style={styles.chat}>
                  <Text style={isUserSending ? styles.chatRight : styles.chatLeft}>
                    {item?.message}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <ChatInput
          loading={loading}
          message={message}
          onPress={() => handleOnPress()}
          onChange={(value) => setMessage(value)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  chatBox: {
    height: '79%',
    width: '100%',
  },
  chat: {
    height: 40,
    marginVertical: 5,
    width: '100%',
    padding: 10,
  },
  chatRight: {
    textAlign: 'right',
    height: 40,
    alignSelf: 'flex-end',
    backgroundColor: '#26a0fe',
    borderRadius: 15,
    overflow: 'hidden',
    minWidth: 50,
    textAlign: 'center',
    lineHeight: 40,
    paddingHorizontal: 10,
    color: '#FFF',
  },
  chatLeft: {
    textAlign: 'left',
    height: 40,
    alignSelf: 'flex-start',
    backgroundColor: '#dfdfe0',
    borderRadius: 15,
    minWidth: 60,
    overflow: 'hidden',
    textAlign: 'center',
    lineHeight: 40,
    paddingHorizontal: 10,
    color: '#000',
  },
});

export default ChatBox;
