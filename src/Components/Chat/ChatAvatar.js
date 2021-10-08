import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import {DOMAIN} from '../../store/constant'


const img = require('../../../assets/dinesh.jpg')

function ChatAvatar({ name, avatar, onPress }) {
  return (
    <TouchableOpacity style={styles.avatar} onPress={onPress}>
      
      <ImageBackground
        source={avatar ? { uri: `${DOMAIN}/${avatar}` } : img}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 65,
    height: 100,
    margin: 8,
  },
  image: {
    borderRadius: 200,
    overflow: 'hidden',
    width: 65,
    height: 65,
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ChatAvatar;
