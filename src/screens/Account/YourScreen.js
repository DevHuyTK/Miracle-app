import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import Post from '../../Components/Post';
import YourHeaderInfo from '../../Components/Profile/YourHeaderInfo';
import LottieView from 'lottie-react-native';
import { DOMAIN } from '../../store/constant';

function YourScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data, token, posts_userId, user } = route.params;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${DOMAIN}/api/photo/photo-targetuser?userId=${posts_userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        setPosts(res.data);
        setIsLoading(false);
      });
  }, []);


  const renderHeader = (loginData) => (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        marginTop: -15,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{loginData.full_name}</Text>
      <Text>Mô tả thêm:</Text>
      <Text>{loginData.description}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <YourHeaderInfo
          navigation={navigation}
          token={token}
          userData={data}
          posts={posts}
          user={user}
        />
        {isLoading ? (
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
            data={posts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Post post={item} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader(data)}
          />
        )}
      </View>
    </View>
  );
}

export default YourScreen;
