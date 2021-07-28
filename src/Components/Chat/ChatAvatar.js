import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import {DOMAIN} from '../../store/constant'


function ChatAvatar({ name, avatar, onPress }) {
  return (
    <TouchableOpacity style={styles.avatar} onPress={onPress}>
      {avatar ? (
        <Avatar
          size="medium"
          rounded
          source={{
            uri: `${DOMAIN}/${avatar}`,
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
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 75,
    height: 100,
    margin: 8,
  },
  image: {
    borderRadius: 200,
    overflow: 'hidden',
    width: 75,
    height: 75,
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    position: 'relative',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ChatAvatar;
