import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Post from '../../Components/Post';
import YourHeaderInfo from '../../Components/Profile/YourHeaderInfo';
import LottieView from 'lottie-react-native';
import { DOMAIN, LIMIT } from '../../store/constant';

function YourScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data, token, posts_userId, user } = route.params;
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    setIsLoading(true);
    fetch(
      `${DOMAIN}/api/photo/photo-targetuser?userId=${posts_userId}&limit=${LIMIT}&page=${pageIndex}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => response.json())
      .then(async (res) => {
        setPosts((posts) => [...posts, ...res.data]);
        setIsLoading(false);
      });
  };

  const renderHeader = (loginData) => (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        marginTop: -15,
        elevation: 15,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{loginData.full_name}</Text>
      <Text>Mô tả thêm:</Text>
      <Text>{loginData.description}</Text>
    </View>
  );

  const renderFooter = () => {
    {
      isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : null;
    }
  };

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
            renderItem={({ item }) => <Post post={item} userData={user} token={token} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader(data)}
            onEndReached={() => {
              setPageIndex(pageIndex + 1);
              handleGetData();
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter()}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default YourScreen;
