import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableHighlight, StyleSheet, FlatList, Alert } from 'react-native';
import { View, ActivityIndicator } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import { DOMAIN } from '../../store/constant';

function Search({ navigation: { goBack } }) {
  let loading = false;
  const data = [
    {
      email: 'huy@gmail.com',
      title: 'Huy đang code API',
      subTitle: 'gánh team',
    },
    {
      email: 'doanh@gmail.com',
      title: 'Doanh đang viết đặc tả',
      subTitle: 'đọc khó hiểu vl :v',
    },
    {
      email: 'thang@gmail.com',
      title: 'Thắng đang code UI',
      subTitle: 'nghịch là chính :)',
    },
  ];
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
            onPress={() => goBack()}
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
            <ListItem key={key} onPress={() => Alert.alert('press')}>
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
                <ListItem.Title style={{ fontWeight: 'bold' }}>{item.full_name}</ListItem.Title>
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
