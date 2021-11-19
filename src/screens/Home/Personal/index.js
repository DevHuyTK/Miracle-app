import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../../Components/Header';
import Post from '../../../Components/Post';
import { connect } from 'react-redux';
import HeaderInfo from '../../../Components/Profile/HeaderInfo';

function Personal(props) {
  const renderHeader = (loginData) => (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        marginTop: -15,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{loginData?.full_name}</Text>
      <Text>Mô tả thêm:</Text>
      <Text>{loginData?.description}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header onNavigation={props.navigation} />
      <HeaderInfo
        totalData={props.usernewfeed}
        navigation={props.navigation}
        user_info={props.user_info}
      />
      <View style={{ flex: 2 }}>
        <FlatList
          data={props.usernewfeed}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Post post={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader(props.user_info)}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  usernewfeed: state.account.usernewfeed,
  user_info: state.account.user_info,
});


export default connect(mapStateToProps)(Personal);
