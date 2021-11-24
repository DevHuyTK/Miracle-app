import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import {DOMAIN} from '../store/constant';

export default function CommentLine({ data, onNavigation }) {
  return (
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      {data?.avatar ? (
        <Avatar
          size="medium"
          rounded
          source={{
            uri: `${DOMAIN}/${data.avatar}`,
          }}
        />
      ) : (
        <Avatar
          size="medium"
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: 'gray' }}
          onPress={() => onNavigation.navigate('AccDetail')}
        />
      )}
      <View
        style={{
          flexDirection: 'column',
          maxwidth: '80%',
          marginLeft: 10,
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>
          {data.full_name ? data.full_name : data.username}
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: '#6FC7E1',
            borderRadius: 15,
          }}
        >
          {data.comment}
        </Text>
      </View>
    </View>
  );
}
