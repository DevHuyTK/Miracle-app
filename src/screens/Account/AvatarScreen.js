import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { ChangeDataContext } from '../../contexts/ChangeData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DOMAIN } from '../../store/constant';
import { getStatusBarHeight } from 'react-native-status-bar-height';

function AvatarScreen({ navigation }) {
  const { isChanged, setIsChanged } = useContext(ChangeDataContext);
  const [avatar, setAvatar] = useState('');
  const [fullName, setFullName] = useState('');

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
      .then((data) => {
        setAvatar(data.avatar);
        setFullName(data.full_name);
      })
      .catch((error) => console.log(error));
  }, [isChanged]);

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
      {avatar ? (
        <Avatar
          source={{
            uri: `${DOMAIN}/${avatar}`,
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
      <Text style={styles.info}>{fullName}</Text>
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

export default AvatarScreen;
