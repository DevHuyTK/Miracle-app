import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../../Components/Header';
import Post from '../../../Components/Post';
import { Avatar, Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChangeDataContext } from '../../../contexts/ChangeData';

function Personal({ navigation }) {
  const [loginData, setLoginData] = useState({});
  const { isChanged, setIsChanged } = useContext(ChangeDataContext);

  const data = [
    {
      id: '123',
      userName: 'thangcodedao',
      avatar: '',
      images: [
        'https://i.imgur.com/UYiroysl.jpg',
        'https://i.imgur.com/UPrs1EWl.jpg',
        'https://i.imgur.com/MABUbpDl.jpg',
        'https://i.imgur.com/KZsmUi2l.jpg',
        'https://i.imgur.com/2nCt3Sbl.jpg',
      ],
      caption: 'test post',
      likesCount: 11,
      postAgo: '6 phút trước',
    },
    {
      id: '456',
      userName: 'thangcodedao',
      avatar: '',
      images: '',
      caption:
        'test post test post test post test post test post test post test post test post test post',
      likesCount: 11,
      postAgo: '3 tiếng trước',
    },
    {
      id: '789',
      userName: 'thangcodedao',
      avatar: '',
      images: 'https://i.imgur.com/UPrs1EWl.jpg',
      caption: 'test post',
      likesCount: 11,
      postAgo: '5 ngày trước',
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
      .then((data) => setLoginData(data))
      .catch((error) => console.log(error));
  }, [isChanged]);

  renderHeader = () => {
    return (
      <View>
        <View backgroundColor="#fff">
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {loginData.avatar ? (
                  <Avatar
                    size="large"
                    rounded
                    source={{
                      uri: `${DOMAIN}/${loginData.avatar}`,
                    }}
                  />
                ) : (
                  <Avatar
                    size="large"
                    rounded
                    icon={{ name: 'user', type: 'font-awesome' }}
                    containerStyle={{ backgroundColor: 'gray' }}
                  />
                )}
              </View>
              <View style={{ flex: 3 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text>20</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>Bài viết</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text>205</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>Người theo dõi</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text>100</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>Đang theo dõi</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 10 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AccDetail')}
                    style={{
                      flex: 3,
                      marginLeft: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 30,
                      borderColor: '#2B92E4',
                      borderWidth: 1,
                      borderRadius: 6,
                    }}
                  >
                    <Text>Sửa thông tin cá nhân</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      marginLeft: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 30,
                      borderColor: '#2B92E4',
                      borderWidth: 1,
                      borderRadius: 6,
                    }}
                  >
                    <Icon name="settings" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{loginData.full_name}</Text>
              <Text>
                Description: blah blah blah blah blah blah blah blah blah blah blah blah blah blah
                blah blah blah blah blah blah blah blah blah blah
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', height: 100, backgroundColor: '#fff', marginVertical: 10 }}>
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
            {loginData.avatar ? (
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: `${DOMAIN}/${loginData.avatar}`,
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
            <TouchableOpacity
              onPress={() => navigation.navigate('CreatePost')}
              style={{ width: '80%', marginLeft: 10, borderRadius: 10, paddingLeft: 6 }}
            >
              <Text style={{ color: 'gray', fontSize: 20 }}>Bạn đang nghĩ gì vậy?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            // onPress={chooseImage}
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
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header onNavigation={navigation}></Header>
      <View style={{ flex: 2 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post post={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader()}
        />
      </View>
    </View>
  );
}

export default Personal;
