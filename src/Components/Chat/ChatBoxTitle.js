import React from 'react'
import { Icon } from 'react-native-gradient-icon'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native'
import { Avatar } from 'react-native-elements';
import {DOMAIN} from '../../store/constant'


function ChatBoxTitle({ onPress, avatar, name }) {
  return (
    <View style={styles.titleView}>
      <TouchableOpacity style={{ width: '10%' }} onPress={onPress}>
        <View>
          <Icon
            size={35}
            type="ionicon"
            name="chevron-back-outline"
            color="#a5a5a5"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.titleCenter}>
        <View style={styles.avatar}>
          {/* <ImageBackground
            source={avatar ? { uri: avatar } : img}
            style={styles.image}
          /> */}
          {avatar ? (
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: `${DOMAIN}/${avatar}`,
                }}
              />
            ) : (
              <Avatar
                size="medium"
                rounded
                icon={{ name: 'user', type: 'font-awesome' }}
                containerStyle={{ backgroundColor: 'gray' }}
              />
            )}
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.emptyTitle}></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyTitle: {
    width: '10%',
  },
  title: {
    textAlign: 'left',
    lineHeight: 50,
    fontSize: 18,
    fontWeight: '600',
    color: '#fe1c15',
  },
  titleCenter: {
    width: '80%',
    textAlign: 'center',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 65,
    overflow: 'hidden',
    borderRadius: 100,
  },
  image: {
    width: 40,
    height: 40,
  },
  name: {
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
})

export default ChatBoxTitle
