import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import ImageComp from './ImageComp';
import { DOMAIN } from '../store/constant';
import { ChangeDataContext } from '../contexts/ChangeData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Post({ post, onNavigation, userData }) {
  const [isLiked, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const { isChanged, setIsChanged } = useContext(ChangeDataContext);

  const onLikePressed = () => {
    const amount = isLiked ? -1 : 1;
    setLikesCount(likesCount + amount);

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
    <View style={{ marginVertical: 10, backgroundColor: '#fff', width: width }}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={() => {
            post.user_id === userData._id ? onNavigation.navigate('Personal') : handleOnPress(post);
          }} style={styles.left}>
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
        <View style={styles.likeIcons}>
          <Icon
            size={30}
            name={isLiked ? 'thumbs-up' : 'thumbs-o-up'}
            type="font-awesome"
            color="#267ea6"
            onPress={() => onLikePressed()}
          />
          <Text style={{ marginLeft: 6, fontSize: 16 }}>{likesCount}</Text>
        </View>
        <View style={styles.postAgo}>
          <Text style={{ fontSize: 16, color: 'gray' }}>{post?.postAgo}</Text>
        </View>
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
    padding: 16,
  },
  footer: {
    margin: 6,
  },
  likeIcons: {
    flexDirection: 'row',
    paddingLeft: 6,
    alignItems: 'center',
  },
  postAgo: {
    paddingLeft: 6,
    paddingTop: 5,
    justifyContent: 'center',
  },
});
