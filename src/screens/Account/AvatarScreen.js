import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { DOMAIN } from '../../store/constant';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { connect } from 'react-redux';

function AvatarScreen({ navigation, ...props }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleView} onPress={() => navigation.goBack()}>
        <Icon
          name="keyboard-arrow-left"
          style="material"
          size={30}
          onPress={() => navigation.goBack()}
          color="white"
        />
        <Text style={styles.title}>Trở về</Text>
      </TouchableOpacity>
      {props.user_info.avatar ? (
        <Avatar
          source={{
            uri: `${DOMAIN}/${props.user_info.avatar}`,
          }}
          containerStyle={{ backgroundColor: 'gray' }}
          style={styles.avatar}
        />
      ) : (
        <Avatar
          size="xlarge"
          icon={{ name: 'user', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: 'gray' }}
          style={styles.avatar}
        />
      )}
      <Text style={styles.info}>{props.user_info.full_name ? props.user_info.full_name : props.user_info.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  avatar: {
    alignContent: 'center',
    justifyContent: 'center',
    width: 400,
    height: 400,
    position: 'absolute',
    top: 150,
  },
  info: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    position: 'absolute',
    bottom: 100,
    left: 20,
  },
  titleView: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 0,
    height: 50,
    width: '100%',
    zIndex: 99999,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    lineHeight: 50,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

const mapStateToProps = state => {
  return {
    user_info: state.account.user_info,
  };
};

export default AvatarScreen = connect(mapStateToProps)(AvatarScreen);
