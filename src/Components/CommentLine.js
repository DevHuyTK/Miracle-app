import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

export default function CommentLine({ data, onNavigation }) {
  return (
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Avatar
        size="medium"
        rounded
        icon={{ name: 'user', type: 'font-awesome' }}
        containerStyle={{ backgroundColor: 'gray' }}
        onPress={() => onNavigation.navigate('AccDetail')}
      />
      <Text
        style={{
          width: '80%',
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginLeft: 10,
          backgroundColor: '#6FC7E1',
          borderRadius: 15,
        }}
      >
        {data}
      </Text>
    </View>
  );
}
