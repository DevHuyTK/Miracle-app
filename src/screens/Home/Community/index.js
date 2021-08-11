import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Button,
  Image,
  CameraRoll,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Post from '../../../Components/Post';
import Header from '../../../Components/Header';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { ChangeDataContext } from '../../../contexts/ChangeData';

import { DOMAIN } from '../../../store/constant';

function Community({ navigation }) {
  const [image, setImage] = useState(null);
  const [loginData, setLoginData] = useState({});
  const { isChanged, setIsChanged } = useContext(ChangeDataContext);

  const data = [
    {
      id: '123',
      userName: 'thang',
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
      userName: 'doanh',
      avatar: '',
      images: '',
      caption:
        'test post test post test post test post test post test post test post test post test post',
      likesCount: 11,
      postAgo: '12 phút trước',
    },
    {
      id: '789',
      userName: 'huy',
      avatar: '',
      images: 'https://i.imgur.com/UPrs1EWl.jpg',
      caption: 'test post',
      likesCount: 11,
      postAgo: '30 phút trước',
    },
  ];

  renderHeader = () => {
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
    );
  };

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

  return (
    <View style={{ flex: 1 }}>
      <Header onNavigation={navigation} />
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      <SafeAreaView style={{ flex: 2 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post post={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader()}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  body: {
    backgroundColor: '#fff',
  },
  highlight: {
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addPhotoTitle: {
    fontSize: 15,

    fontWeight: 'bold',
  },
  photoList: {
    height: 70,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  photo: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399cc',
  },
  photoIcon: {
    width: 50,
    height: 50,
  },
  addButtonContainer: {
    padding: 15,
    justifyContent: 'flex-end',
  },
  addButtonText: {
    color: '#0ff1ce',
    fontWeight: 'bold',
    fontSize: 48,
  },
});

export default Community;
