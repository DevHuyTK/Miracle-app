import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DOMAIN } from '../../store/constant';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import mime from 'mime';
import { getMatchingListAccount } from '../../store/Actions/AccountActions';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

function ChangeAvatar({ navigation, ...props }) {
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [errorText, setErrorText] = useState('');

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImagePath(result);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImagePath(result);
    }
  };

  const newImageUri = 'file:///' + pickedImagePath.uri?.split('file:/').join('');

  const data = new FormData();
  data.append('avatar', {
    name: pickedImagePath.uri?.split('/').pop(),
    type: mime.getType(newImageUri),
    uri: newImageUri,
  });

  const handleUploadAvatar = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    fetch(`${DOMAIN}/api/user/upload-avatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
      body: data,
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.status === 1) {
          await props.getMatchingList(token);
          setStatus(res.message);
          navigation.navigate('Account');
          setLoading(false);
        } else {
          setErrorText(res.message);
          setLoading(false);
        }
      });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <View style={styles.header}>
          <View style={styles.left}>
            <Icon
              name="keyboard-backspace"
              style="material"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.leftText}>C???p nh???t ???nh ?????i di???n</Text>
          </View>
          <View style={styles.right}>
            {pickedImagePath ? (
              <TouchableOpacity style={styles.topPostButton} onPress={() => handleUploadAvatar()}>
                {loading ? (
                  <ActivityIndicator size={35} color="#fff" />
                ) : (
                  <Text style={{ color: '#fff', fontSize: 16, padding: 10 }}>????ng</Text>
                )}
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => showImagePicker()} style={styles.butonSelect}>
            <Text style={styles.buttonText}>Ch???n ???nh</Text>
            <Icon
              name="keyboard-arrow-right"
              style="material"
              size={34}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Divider width={1} />
          <TouchableOpacity onPress={() => openCamera()} style={styles.butonSelect}>
            <Text style={styles.buttonText}>M??? camera</Text>
            <Icon
              name="keyboard-arrow-right"
              style="material"
              size={34}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Divider width={1} />
        </View>

        <View style={styles.imageContainer}>
          {pickedImagePath !== '' && (
            <Image source={{ uri: pickedImagePath.uri }} style={styles.image} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  butonSelect: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
  },

  header: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  leftText: {
    marginLeft: 15,
    fontSize: 20,
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  topPostButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d88ff',
    height: 30,
    borderRadius: 8,
  },
  topPostText: {
    color: '#fff',
    fontSize: 15,
    padding: 12,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatar);
