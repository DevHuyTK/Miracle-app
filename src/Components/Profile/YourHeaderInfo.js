import React, { useState, useEffect } from 'react';
import { Avatar, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import socketIOClient from 'socket.io-client';
import { DOMAIN } from '../../store/constant';
import { connect } from 'react-redux';
import { getMatchingListAccount } from '../../store/Actions/AccountActions';

function YourHeaderInfo({ navigation, token, userData, posts, ...props }) {
  const [isValid, setIsValid] = useState(false);
  const socket = socketIOClient(DOMAIN);

  const userFollow = userData?.follower_list?.length;
  const userFollowing = userData?.following_list?.length;

  useEffect(() => {
    userFollowIsValid();
  }, []);

  useEffect(() => {
    props.getMatchingList(token);
  }, [props.user_info]);

  const userFollowIsValid = async () => {
    if (props?.user_info?.following_list.find((item) => item.user_id.toString() == userData._id)) {
      return setIsValid(true);
    } else {
      return setIsValid(false);
    }
  };

  const onFollowPressed = (user) => {
    if (isValid === true) {
      handleUnFollow(user);
    } else {
      handleFollow(user);
    }
    setIsValid(!isValid);
  };

  const handleFollow = async (user) => {
    socket.emit('follow-user', {
      token: token,
      userId: user._id,
    });
    // socket.on('follow-user-response', (user) => {
    //   console.log(user, 'a');
    // });
  };
  const handleUnFollow = async (user) => {
    socket.emit('unfollow-user', {
      token: token,
      userId: user._id,
    });
    // socket.on('unfollow-user-response', (user) => {
    //   console.log(user, 'a');
    // });
  };

  const handleOnPress = async (item) => {
    fetch(`${DOMAIN}/api/chat/${item._id}`, {
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
          user: props.user_info,
        });
      });
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.left}>
          <Icon
            name="keyboard-backspace"
            style="material"
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.leftText}>{userData.username}</Text>
        </View>
      </View>
      <View backgroundColor="#fff">
        <View style={{ paddingTop: 10, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              {userData.avatar ? (
                <Avatar
                  size="large"
                  rounded
                  source={{
                    uri: `${DOMAIN}/${userData.avatar}`,
                  }}
                />
              ) : (
                <Avatar
                  size="large"
                  rounded
                  icon={{ name: 'user', type: 'font-awesome' }}
                  containerStyle={{ backgroundColor: 'gray' }}
                />
              )}
            </View>
            <View style={{ flex: 3 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text>{Object.keys(posts).length}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>Bài viết</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text>{userFollow}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>Người theo dõi</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text>{userFollowing}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>Đang theo dõi</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 10 }}>
            <TouchableOpacity
              onPress={() => onFollowPressed(userData)}
              style={{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                borderColor: '#2B92E4',
                borderWidth: 1,
                borderRadius: 6,
              }}
            >
              <Text>{isValid ? 'Hủy theo dõi' : 'Theo dõi'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOnPress(userData)}
              style={{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                borderColor: '#2B92E4',
                borderWidth: 1,
                borderRadius: 6,
              }}
            >
              <Text>Nhắn tin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    backgroundColor: 'white',
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
});
const mapStateToProps = (state) => {
  return {
    user_info: state.account.user_info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMatchingList: (data) => {
      dispatch(getMatchingListAccount(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourHeaderInfo);
