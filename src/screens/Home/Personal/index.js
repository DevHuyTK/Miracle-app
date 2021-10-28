import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../../Components/Header';
import Post from '../../../Components/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChangeDataContext } from '../../../contexts/ChangeData';

import { connect } from 'react-redux';
import HeaderInfo from '../../../Components/Profile/HeaderInfo';

function Personal(props) {
  const [loginData, setLoginData] = useState({});
  const { isChanged, setIsChanged } = useContext(ChangeDataContext);

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
  }, [!isChanged]);

  const renderHeader = (loginData) => (
    <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'white', marginTop: -15}}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{loginData.full_name}</Text>
      <Text>Mô tả thêm:</Text>
      <Text>{loginData.description}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header onNavigation={props.navigation}></Header>
      <HeaderInfo
        userData={loginData}
        totalData={props.usernewfeed}
        navigation={props.navigation}
      />
      <View style={{ flex: 2 }}>
        <FlatList
          data={props.usernewfeed}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Post post={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader(loginData)}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  usernewfeed: state.account.usernewfeed,
});

export default connect(mapStateToProps)(Personal);
