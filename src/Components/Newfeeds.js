import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DOMAIN } from '../store/constant';
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

export default function Newfeeds({ onNavigation, userData }) {
  return (
    <View style={{ width: '100%', height: 100, backgroundColor: '#fff', marginBottom: 10 }}>
      <View
        style={{
          width: '100%',
          height: '60%',
          flexDirection: 'row',
          paddingLeft: 15,
          alignItems: 'center',
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
        }}
      >
        <TouchableOpacity onPress={() => onNavigation.navigate('Personal')}>
          {userData.avatar ? (
            <Avatar
              size="medium"
              rounded
              source={{
                uri: `${DOMAIN}/${userData.avatar}`,
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
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNavigation.navigate('CreatePost', { userData })}
          style={{ width: '80%', marginLeft: 10, borderRadius: 10, paddingLeft: 6 }}
        >
          <Text style={{ color: 'gray', fontSize: 20 }}>Bạn đang nghĩ gì vậy?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => onNavigation.navigate('ImagePicker', { userData })}
        style={{
          width: '100%',
          height: '40%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
        }}
      >
        <FontAwesome name="image" color="green" size={25} />
        <Text style={{ color: 'black', marginLeft: 10, fontSize: 20 }}>Ảnh</Text>
      </TouchableOpacity>
    </View>
  );
}
