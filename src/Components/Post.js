import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import ImageComp from './ImageComp';
import { DOMAIN } from '../store/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socketIOClient from 'socket.io-client';

const { width } = Dimensions.get('window');

export default function Post({ post, onNavigation, userData, token, commentTotal }) {
  const [isLiked, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState(post.like_count?.length);
  const [commentCount, setCommentCount] = useState(post.comments?.length);
  const socket = socketIOClient(DOMAIN);
  const [tokenUser, setTokenUser] = useState('');

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      setTokenUser(token);
      userIsLike();
    }
    getToken();
  }, []);

  useEffect(() => {
    if (post._id === commentTotal.postId) {
      setCommentCount(commentTotal.commentTotal);
    }
  }, [commentTotal.commentTotal]);

  const userIsLike = async () => {
    if (post.like_count.find((item) => item.user_id.toString() == userData._id)) {
      return setIsLike(true);
    } else {
      return setIsLike(false);
    }
  };

  const handleLike = async (post) => {
    socket.emit('like-post', {
      token: token,
      postId: post._id,
    });
    socket.on('like-post-response', (post) => {
      console.log(post, 'a');
    });
  };
  const handleUnLike = async (post) => {
    socket.emit('unlike-post', {
      token: token,
      postId: post._id,
    });
    socket.on('unlike-post-response', (post) => {
      console.log(post, 'a');
    });
  };

  const onLikePressed = () => {
    const amount = isLiked ? -1 : 1;
    setLikesCount(likesCount + amount);
    if (amount === -1) {
      handleUnLike(post);
    } else {
      handleLike(post);
    }

    setIsLike(!isLiked);
  };

  const handleOnPress = async (item) => {
    const token = await AsyncStorage.getItem('token');
    const targetUserAPI = `${DOMAIN}/api/user/get-user?userId=${item.user_id}`;
    fetch(targetUserAPI, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        onNavigation.navigate('YourScreen', {
          data: res.data,
          token,
          posts_userId: item.user_id,
          user: userData,
        });
      });
  };

  return (
    <View style={{ marginVertical: 10, backgroundColor: '#fff', width: width, elevation: 15 }}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            onPress={() => {
              post.user_id === userData._id
                ? onNavigation.navigate('Personal')
                : handleOnPress(post);
            }}
            style={styles.left}
          >
            {post?.avatar ? (
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: `${DOMAIN}/${post?.avatar}`,
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
            <Text style={styles.userName}>
              {post?.full_name ? post?.full_name : post?.username}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <Icon name="more-vert" type="material" color="gray" />
        </View>
      </View>
      <View style={styles.caption}>
        <Text style={{ fontSize: 18 }}>{post?.title}</Text>
      </View>
      <ImageComp images={post?.photos} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeIcons} onPress={() => onLikePressed()}>
          <Icon
            size={30}
            name={isLiked ? 'thumbs-up' : 'thumbs-o-up'}
            type="font-awesome"
            color="#267ea6"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.likeIcons}
          onPress={() =>
            onNavigation.navigate('CommentInteract', {
              token,
              postId: post._id,
              userData: userData,
            })
          }
        >
          <Icon size={30} name={'comments'} type="font-awesome" color="#267ea6" />
        </TouchableOpacity>
      </View>
      <View style={styles.countNumber}>
        {/* <Text style={{ fontSize: 16, color: 'gray' }}>{post?.postAgo}</Text> */}
        <Text style={{ marginLeft: 6, fontSize: 16 }}>{likesCount} ng?????i ???? th??ch</Text>
        <Text style={{ marginLeft: 6, fontSize: 16 }}>{commentCount} b??nh lu???n</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
  },
  left: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  right: {
    marginRight: 5,
  },
  userName: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    color: '#3c3c3c',
  },
  caption: {
    padding: 14,
  },
  footer: {
    margin: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  likeIcons: {
    flexDirection: 'row',
    paddingLeft: 6,
    paddingRight: 10,
    alignItems: 'center',
  },
  postAgo: {
    paddingLeft: 6,
    paddingTop: 5,
    justifyContent: 'center',
  },
  countNumber: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
});
