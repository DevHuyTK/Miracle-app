import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { DOMAIN } from '../../store/constant';

export default function HeaderInfo({ totalData, navigation, user_info }) {

  const userFollow = user_info?.follower_list?.length;
  const userFollowing = user_info?.following_list?.length;
  
  return (
    <View>
      <View backgroundColor="#fff">
        <View style={{ paddingTop: 10, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              {user_info?.avatar ? (
                <Avatar
                  size="large"
                  rounded
                  source={{
                    uri: `${DOMAIN}/${user_info.avatar}`,
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
                  <Text>{totalData?.length}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>Bài viết</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: 'black' }}>{userFollow}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>Người theo dõi</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: 'black' }}>{userFollowing}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>Đang theo dõi</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 10 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AccDetail')}
                  style={{
                    flex: 3,
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 30,
                    borderColor: '#2B92E4',
                    borderWidth: 1,
                    borderRadius: 6,
                  }}
                >
                  <Text>Sửa thông tin cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 30,
                    borderColor: '#2B92E4',
                    borderWidth: 1,
                    borderRadius: 6,
                  }}
                >
                  <Icon name="settings" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
