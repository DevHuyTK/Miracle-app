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

function Community({ navigation, ...props }) {
  const [token, setToken] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [newFeed, setNewFeed] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setILoading] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      setUserInfo(props.user_info);
      setNewFeed(props.newfeed);
      props.getUserNewFeed({ token, pageIndex: 1 });
    }
    getUserInfo();
  }, []);

  const doRefresh = async () => {
    setPageIndex(1);
    await props.getNewFeed({ token, pageIndex: 1 });
    setNewFeed(props.newfeed);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleGetData = async () => {
    setPageIndex(pageIndex + 1);
    props.getNewFeed({ token, pageIndex });
    setNewFeed((newFeed) => [...newFeed, ...props.newfeed]);
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
            data={newFeed}
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
              <Post onNavigation={navigation} post={item} userData={userInfo} token={token} />
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Newfeeds onNavigation={navigation} userData={userInfo} />}
            onEndReached={() => {
              handleGetData();
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
