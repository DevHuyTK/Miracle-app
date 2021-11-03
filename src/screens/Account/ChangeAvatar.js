import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Button, SafeAreaView, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DOMAIN } from '../../store/constant';
import { ChangeDataContext } from '../../contexts/ChangeData';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function ChangeAvatar({ navigation }) {
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [errorText, setErrorText] = useState('');
  const { isChanged, setIsChanged } = useContext(ChangeDataContext);

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
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

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  };

  const createFormData = (imageFile) => {
    const data = new FormData();
    data.append('photo', {
      name: imageFile.fileName,
      type: imageFile.type,
      uri: Platform.OS === 'ios' ? imageFile.uri.replace('file://', '') : imageFile.uri,
    });

    return data;
  };

  const handleUploadAvatar = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    fetch(`${DOMAIN}/api/user/upload-avatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: createFormData(imageFile),
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.status === 1) {
          setStatus(res.message);
          setTimeout(() => {
            navigation.navigate('Account');
          }, 1000);
          setLoading(false);
          setIsChanged(!isChanged);
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
            <Text style={styles.leftText}>Cập nhật ảnh đại diện</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity style={styles.topPostButton}>
              <Text style={styles.topPostText}>Đăng</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={showImagePicker} style={styles.butonSelect}>
            <Text style={styles.buttonText}>Chọn ảnh</Text>
            <Icon
              name="keyboard-arrow-right"
              style="material"
              size={34}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Divider width={1} />
          <TouchableOpacity onPress={openCamera} style={styles.butonSelect}>
            <Text style={styles.buttonText}>Mở camera</Text>
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
            <Image source={{ uri: pickedImagePath }} style={styles.image} />
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
    marginTop: 20
  },
  image: {
    width: 400,
    height: 300,
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
