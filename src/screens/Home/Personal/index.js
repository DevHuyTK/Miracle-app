import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import Header from '../../../Components/Header';
import Post from '../../../Components/Post';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderInfo from '../../../Components/Profile/HeaderInfo';
import {
  getAccountUserNewFeed,
  getMatchingListAccount,
} from '../../../store/Actions/AccountActions';
import LottieView from 'lottie-react-native';
import { DOMAIN, LIMIT } from '../../../store/constant';

function Personal({ ...props }) {
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState('');
  const [userNewFeed, setUserNewFeed] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      setUserNewFeed(props.usernewfeed);
      setUserInfo(props.user_info);
    }
    getToken();
  }, []);

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
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{loginData?.full_name}</Text>
      <Text>Mô tả thêm:</Text>
      <Text>{loginData?.description}</Text>
    </View>
  );

  const doRefresh = async () => {
    setPageIndex(1);
    await props.getUserNewFeed({ token, pageIndex: 1 });
    setUserNewFeed(props.usernewfeed);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleGetData = async () => {
    setPageIndex(pageIndex + 1);
    props.getUserNewFeed({ token, pageIndex });
    setUserNewFeed((userNewFeed) => [...userNewFeed, ...props.usernewfeed]);
  };

  const handleGetPagination = async (pageIndex, token) => {
    console.log('pageIndex', pageIndex);
    setIsLoading(true);
    setPageIndex(pageIndex);
    const url = `${DOMAIN}/api/photo/photo-user?limit=${LIMIT}&page=${pageIndex}`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setUserNewFeed([...userNewFeed, ...res.data]);
        setIsLoading(false);
      });
  };

  const renderFooter = () => {
    {
      isLoading ? (
        <View
          style={{
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LottieView
            autoPlay
            loop
            speed={0.6}
            style={{
              height: 100,
              alignSelf: 'center',
            }}
            source={require('../../../../assets/Animations/8311-loading.json')}
          />
        </View>
      ) : null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header onNavigation={props.navigation} />
      <HeaderInfo totalData={userNewFeed} navigation={props.navigation} user_info={userInfo} />
      <View style={{ flex: 2 }}>
        {userInfo !== [] ? (
          <FlatList
            data={userNewFeed?.sort((a, b) => a.created_at.localeCompare(b.created_at))}
            keyExtractor={(item, index) => String(index)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  doRefresh();
                }}
              />
            }
            renderItem={({ item }) => (
              <Post
                post={item}
                post={item}
                onNavigation={props.navigation}
                userData={userInfo}
                token={token}
                commentTotal={props.commentList}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader(userInfo)}
            onEndReached={() => {
              handleGetPagination(pageIndex + 1, token);
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter()}
          />
        ) : (
          <LottieView
            autoPlay
            loop
            speed={0.6}
            style={{
              height: 100,
              alignSelf: 'center',
            }}
            source={require('../../../../assets/Animations/8311-loading.json')}
          />
        )}
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  usernewfeed: state.account.usernewfeed,
  user_info: state.account.user_info,
  commentList: state.comment.commentList,
});

const mapDispatchToProps = (dispatch) => ({
  getUserNewFeed: (data) => {
    dispatch(getAccountUserNewFeed(data));
  },
  getUserInfo: (data) => {
    dispatch(getMatchingListAccount(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  React.memo(Personal, (props, nextProps) => {
    if (props.usernewfeed !== nextProps.usernewfeed) {
      return false;
    }
    if (props.user_info !== nextProps.user_info) {
      return false;
    }
    return true;
  }),
);
