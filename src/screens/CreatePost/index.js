import React, { useState, useMemo } from 'react';
import {
  TextInput,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar, Icon } from 'react-native-elements';
import ImagesGrid from '../../Components/ImageGrid';
import { DOMAIN } from '../../store/constant';

const { width } = Dimensions.get('window');

function CreatePost({ navigation, route }) {
  const { userData } = route.params;
  const [imageBrowserOpen, setImgeBrowserOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  if (imageBrowserOpen) {
    return (
      // <AssetsSelector
      //   Settings={widgetSettings}
      //   Errors={widgetErrors}
      //   Styles={widgetStyles}
      //   Navigator={widgetNavigator}
      //   // Resize={widgetResize} know how to use first , perform slower results.
      // />
      <></>
    );
  }

  const images = [
    'https://i.imgur.com/UYiroysl.jpg',
    'https://i.imgur.com/UPrs1EWl.jpg',
    'https://i.imgur.com/MABUbpDl.jpg',
    'https://i.imgur.com/KZsmUi2l.jpg',
    'https://i.imgur.com/2nCt3Sbl.jpg',
    'https://i.imgur.com/UYiroysl.jpg',
    'https://i.imgur.com/UPrs1EWl.jpg',
  ];
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.left}>
            <Icon
              name="keyboard-backspace"
              style="material"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.leftText}>Tạo bài viết</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity style={styles.topPostButton}>
              <Text style={styles.topPostText}>Đăng</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.userBar}>
          {userData.avatar ? (
            <Avatar
              size="medium"
              rounded
              source={{
                uri: `${DOMAIN}/${userData.avatar}`,
              }}
              onPress={() => navigation.navigate('AccDetail')}
            />
          ) : (
            <Avatar
              size="medium"
              rounded
              icon={{ name: 'user', type: 'font-awesome' }}
              containerStyle={{ backgroundColor: 'gray' }}
              onPress={() => navigation.navigate('AccDetail')}
            />
          )}
          <Text style={styles.userName}>{userData.full_name}</Text>
        </View>
        <TextInput
          multiline={true}
          scrollEnabled={true}
          placeholder="Bạn đang nghĩ gì vậy?"
          style={styles.input}
        />
        <ImagesGrid data={photos} />
        <TouchableOpacity style={styles.photoButton} onPress={() => setImgeBrowserOpen(true)}>
          <FontAwesome name="image" color="green" size={30} />
          <Text style={{ marginLeft: 10, fontSize: 18 }}>Ảnh</Text>
        </TouchableOpacity>
        <View style={styles.bottomPostContainer}>
          <TouchableOpacity style={styles.bottomPostButton}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Đăng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
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
  right: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  topPostButton: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d88ff',
    height: 30,
    borderRadius: 8,
  },
  topPostText: {
    color: '#fff',
    fontSize: 15,
  },
  userBar: {
    width: width,
    height: 60,
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 16,
  },
  input: {
    height: 100,
    marginTop: 15,
    textAlignVertical: 'top',
    paddingLeft: 16,
    fontSize: 20,
  },
  photoButton: {
    flexDirection: 'row',
    width: width,
    height: 50,
    alignItems: 'center',
    paddingLeft: 16,
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10,
    color: '#3c3c3c',
  },
  bottomPostContainer: {
    width: width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
  },
  bottomPostButton: {
    width: '90%',
    height: '70%',
    backgroundColor: '#2d88ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default CreatePost;
