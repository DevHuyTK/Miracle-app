import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Post from '../../../Components/Post';
import Header from '../../../Components/Header';
import { connect } from 'react-redux';
import Newfeeds from '../../../Components/Newfeeds';
import LottieView from 'lottie-react-native';
import { getAccountUserNewFeed, getAccountNewFeed } from '../../../store/Actions/AccountActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Community({ navigation, ...props }) {
  const [token, setToken] = useState('');
  useEffect(() => {
    async function getUserInfo() {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      props.getUserNewFeed(token);
      props.getNewFeed(token);
    }
    getUserInfo();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header onNavigation={navigation} />
      <SafeAreaView style={{ flex: 2 }}>
        {props?.newfeed ? (
          <FlatList
            data={props.newfeed}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Post
                onNavigation={navigation}
                post={item}
                userData={props?.user_info}
                token={token}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Newfeeds onNavigation={navigation} userData={props?.user_info} />}
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
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Community);
