import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Post from '../../../Components/Post';
import Header from '../../../Components/Header';
import { connect } from 'react-redux';
import Newfeeds from '../../../Components/Newfeeds';
import LottieView from 'lottie-react-native';
import {
  getAccountUserNewFeed,
  getAccountNewFeed,
  getMatchingListAccount,
} from '../../../store/Actions/AccountActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DOMAIN, LIMIT } from '../../../store/constant';

function Community({ navigation, ...props }) {
  const [token, setToken] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [newFeed, setNewFeed] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      props.getUserNewFeed({ token, pageIndex: 1 });
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    setUserInfo(props.user_info);
    setNewFeed(props.newfeed);
  }, [props.user_info, props.newfeed]);

  const doRefresh = async () => {
    setPageIndex(1);
    await props.getNewFeed({ token, pageIndex: 1 });
    setNewFeed(props.newfeed);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleGetPagination = async (pageIndex, token) => {
    setIsLoading(true);
    setPageIndex(pageIndex);
    const url = `${DOMAIN}/api/photo?limit=${LIMIT}&page=${pageIndex}&`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setNewFeed([...newFeed, ...res.data]);
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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header onNavigation={navigation} />
      <SafeAreaView style={{ flex: 2 }}>
        {userInfo !== [] ? (
          <FlatList
            data={newFeed?.sort((a, b) => a.created_at.localeCompare(b.created_at))}
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
                onNavigation={navigation}
                post={item}
                userData={userInfo}
                token={token}
                commentTotal={props.commentList}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Newfeeds onNavigation={navigation} userData={userInfo} />}
            onEndReached={async () => {
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
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  newfeed: state.account.newfeed,
  user_info: state.account.user_info,
  commentList: state.comment.commentList,
});

const mapDispatchToProps = (dispatch) => ({
  getUserNewFeed: (data) => {
    dispatch(getAccountUserNewFeed(data));
  },
  getNewFeed: (data) => {
    dispatch(getAccountNewFeed(data));
  },
  getUserInfo: (data) => {
    dispatch(getMatchingListAccount(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  React.memo(Community, (props, nextProps) => {
    if (props.newfeed !== nextProps.newfeed) {
      return false;
    }
    if (props.user_info !== nextProps.user_info) {
      return false;
    }
    return true;
  }),
);
