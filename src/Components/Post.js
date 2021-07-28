import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import ImageComp from './ImageComp';

const { width } = Dimensions.get('window');

export default function Post({ post }) {
  const [isLiked, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const onLikePressed = () => {
    const amount = isLiked ? -1 : 1;
    setLikesCount(likesCount + amount);

    setIsLike(!isLiked);
  };

  return (
    <View style={{ marginVertical: 10, backgroundColor: '#fff', width: width }}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Avatar
            size="medium"
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            containerStyle={{ backgroundColor: 'gray' }}
          />
          <Text style={styles.userName}>{post.userName}</Text>
        </View>
        <View style={styles.right}>
          <Icon name="more-vert" type="material" color="gray" />
        </View>
      </View>
      <View style={styles.caption}>
        <Text style={{ fontSize: 18 }}>{post.caption}</Text>
      </View>
      <ImageComp images={post.images} />
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
          <Text style={{ fontSize: 16, color: 'gray' }}>{post.postAgo}</Text>
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
