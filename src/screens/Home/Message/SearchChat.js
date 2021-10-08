import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Avatar, ListItem, SearchBar, Icon } from 'react-native-elements';
import { DOMAIN } from '../../../store/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socketIOClient from 'socket.io-client';

const { width } = Dimensions.get('window');

function SearchChat(props) {
  let loading = false;
  const socket = socketIOClient(DOMAIN);
  const [datas, setDatas] = useState([]);
  const [status, setStatus] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch(`${DOMAIN}/api/user/get-users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 1) {
          setDatas(res.data);
        } else {
          setStatus([res.message, false]);
        }
      });
  }, []);

  const handleOnPress = async (item) => {
    const token = await AsyncStorage.getItem('token');
    fetch(`${DOMAIN}/chat?userId=${item._id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        socket.emit('join', {
          token: token,
          userIds: [item._id],
        });
        navigation.navigate('ChatBox', {
          data: item,
          token,
          chat: res.data,
          user,
        });
      });
  };

  searchFunction = (text) => {
    let e = text.trim().toLowerCase();
    let filteredName = datas.filter((item) => item.full_name.toLowerCase().match(e));
    if (!e || e === '') {
      setSearchData([]);
      setText(text);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      setSearchData([]);
      setText(text);
    } else if (Array.isArray(filteredName)) {
      setSearchData(filteredName);
      setText(text);
    }
  };
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  renderHeader = () => {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.left}>
              <Icon
                name="keyboard-backspace"
                style="material"
                size={30}
                onPress={() => props.navigation.goBack()}
              />
              <Text style={styles.leftText}>Tạo cuộc trò chuyện</Text>
            </View>
          </View>
          <View>
            <SearchBar
              placeholder="Tìm kiếm ..."
              containerStyle={{
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: 16,
                borderBottomColor: '#fff',
                borderTopColor: '#fff',
              }}
              lightTheme
              onChangeText={(text) => searchFunction(text)}
              autoCorrect={false}
              value={text}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchData}
        renderItem={({ item, key }) => (
          <View>
            <ListItem key={key} onPress={() => handleOnPress(item)}>
              {item.avatar ? (
                <Avatar
                  size="medium"
                  rounded
                  source={{
                    uri: `${DOMAIN}/${item.avatar}`,
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
              {/* <Avatar rounded source={DOMAIN/item.avatar} /> */}
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>{item.full_name ? item.full_name : item.username}</ListItem.Title>
                <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="white" />
            </ListItem>
            <View
              style={{
                height: 1,
                width: '86%',
                backgroundColor: '#CED0CE',
                marginLeft: '14%',
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.email}
        ListHeaderComponent={renderHeader()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    width: '70%',
  },
  leftText: {
    marginLeft: 15,
    fontSize: 20,
  },
  right: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  topPostButton: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d88ff',
    height: 30,
    borderRadius: 8,
  },
  topPostText: {
    color: '#fff',
    fontSize: 15,
  },
});

export default SearchChat;
