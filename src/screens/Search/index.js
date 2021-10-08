import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, TouchableHighlight, StyleSheet, FlatList, Alert } from 'react-native';
import { View, ActivityIndicator } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import { DOMAIN } from '../../store/constant';
import { ChangeDataContext } from '../../contexts/ChangeData';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Search({ navigation }) {
  let loading = false;
  const [user, setUser] = useState({});
  const [datas, setDatas] = useState([]);
  const [status, setStatus] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [text, setText] = useState('');
  const { isChanged, setIsChanged } = useContext(ChangeDataContext);

  const handleOnPress = async (item) => {
    const token = await AsyncStorage.getItem('token');
    fetch(`${DOMAIN}/api/photo/photo-targetuser?userId=${item._id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        navigation.navigate('YourScreen', {
          data: item,
          token,
          posts: res.data,
          user,
        });
      });
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
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, [!isChanged]);

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

  renderHeader = () => {
    return (
      <SafeAreaView style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
        <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor="#999"
            activeOpacity={0.5}
            style={styles.btnBack}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="chevron-left" color="black" size={30} />
          </TouchableHighlight>
        </View>
        <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>
          <SearchBar
            placeholder="Search"
            style={{ borderRadius: 16 }}
            containerStyle={{
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: 16,
              borderBottomColor: '#fff',
              borderTopColor: '#fff',
            }}
            lightTheme
            round
            onChangeText={(text) => searchFunction(text)}
            autoCorrect={false}
            value={text}
          />
        </View>
      </SafeAreaView>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
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
                <ListItem.Title style={{ fontWeight: 'bold' }}>
                  {item.full_name ? item.full_name : item.username}
                </ListItem.Title>
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
  btnBack: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
  },
});

export default Search;
