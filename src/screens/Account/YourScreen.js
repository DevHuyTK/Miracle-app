import React from 'react';
import { View, FlatList, Text } from 'react-native';
import Post from '../../Components/Post';
import YourHeaderInfo from '../../Components/Profile/YourHeaderInfo';

function YourScreen({ navigation, route }) {
  const { data, token, posts, user } = route.params;

  const renderHeader = (loginData) => (
    <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'white', marginTop: -15}}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{loginData.full_name}</Text>
      <Text>Mô tả thêm:</Text>
      <Text>{loginData.description}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <YourHeaderInfo userData={data} navigation={navigation} token={token} user={user} posts={posts} />
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post post={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader(data)}
        />
      </View>
    </View>
  );
}

export default YourScreen;
