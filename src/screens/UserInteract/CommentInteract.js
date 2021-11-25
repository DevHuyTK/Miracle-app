import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons, FontAwesome } from 'react-native-vector-icons';
import { Avatar, Icon } from 'react-native-elements';
import CommentLine from '../../Components/CommentLine';
import socketIOClient from 'socket.io-client';
import { DOMAIN } from '../../store/constant';
import LottieView from 'lottie-react-native';

export default function CommentInteract({ navigation, route }) {
  const scrollView = useRef();
  const socket = socketIOClient(DOMAIN);
  const { token, postId, userData } = route.params;
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    getCommentList();
    setIsFetching(false);
  }, [!commentList]);

  useEffect(() => {
    socket.on('user-comment-response', (data) => {
      setIsLoading(false);
      setCommentList((prevState) => [...prevState, data.data]);
    });
  }, []);

  // console.log(commentList);

  const handleOnPress = () => {
    if (comment.trim().length > 0) {
      setIsLoading(true);
      socket.emit('user-comment', {
        token,
        postId,
        comment,
      });
      setComment('');
    } else {
      Alert.alert('Bạn chưa nhập bình luận');
    }
  };

  const getCommentList = () => {
    setIsFetching(true);
    const url = `${DOMAIN}/api/post/get-comments/${postId}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setCommentList(res.data.comments);
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetching(false);
      });
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView
        style={{
          flexDirection: 'row',
          height: '10%',
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          paddingVertical: 5,
        }}
      >
        <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor="#999"
            activeOpacity={0.5}
            style={styles.btnBack}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="chevron-left" color="black" size={30} />
          </TouchableHighlight>
        </View>
        <Text style={{ fontSize: 20, paddingLeft: 6, alignSelf: 'center' }}>Bình luận</Text>
      </SafeAreaView>
      {isFetching ? (
        <LottieView
          autoPlay
          loop
          speed={0.6}
          style={{
            height: 100,
            alignSelf: 'center',
          }}
          source={require('../../../assets/Animations/8311-loading.json')}
        />
      ) : (
        <FlatList
          data={commentList}
          keyExtractor={(item, index) => String(index)}
          ref={scrollView}
          style={{ paddingHorizontal: 15, paddingVertical: 5, height: '80%', width: '100%' }}
          renderItem={({ item }) => <CommentLine data={item} onNavigation={navigation} />}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollView.current.scrollToEnd({ animated: true })}
        />
      )}
      <View style={styles.commentInputBar}>
        {userData?.avatar ? (
          <Avatar
            size="medium"
            rounded
            source={{
              uri: `${DOMAIN}/${userData?.avatar}`,
            }}
          />
        ) : (
          <Avatar
            size="medium"
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            containerStyle={{ backgroundColor: 'gray' }}
          />
        )}
        <TextInput
          multiline={true}
          scrollEnabled={true}
          placeholder="Hãy Viết gì đó"
          style={styles.input}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={styles.iconInput} onPress={() => handleOnPress()}>
          {isLoading ? (
            <ActivityIndicator size={30} color="#000" style={styles.loading} />
          ) : (
            <Icon size={36} name="send" type="Ionicons" color="#2acaea" />
          )}
        </TouchableOpacity>
      </View>

      {commentList?.length === 0 && (
        <View>
          <Text style={styles.noneComment}>Chưa có bình luận nào</Text>
        </View>
      )}
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  btnBack: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  commentInputBar: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    height: '10%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
  },
  input: {
    width: '75%',
    height: '90%',
    textAlignVertical: 'center',
    paddingLeft: 9,
    marginLeft: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 15,
  },
  iconInput: {
    marginLeft: 3,
  },
  noneComment: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 10,
  },
});
