import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';

export default function ImagePicker({ navigation, route }) {
  const { userData } = route.params;
  const _getHeaderLoader = () => <ActivityIndicator size="small" color={'#0580FF'} />;

  const imagesCallback = (callback) => {
    navigation.setOptions({
      headerRight: () => _getHeaderLoader(),
    });

    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          const pPhoto = await _processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: 'image/jpg',
          });
        }
        navigation.navigate('CreatePost', { photos: cPhotos, userData });
      })
      .catch((e) => console.log(e));
  };

  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 1000 } }], {
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
    });
    return file;
  };

  const _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return (
      <TouchableOpacity title={'Next'} onPress={onSubmit}>
        <Text style={styles.topPostButton} onPress={onSubmit}>
          Chọn
        </Text>
      </TouchableOpacity>
    );
  };

  const updateHandler = (count, onSubmit) => {
    navigation.setOptions({
      title: `Đã chọn ${count}`,
      headerRight: () => _renderDoneButton(count, onSubmit),
    });
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

  return (
    <View style={[styles.flex, styles.container]}>
      <ImageBrowser
        max={4}
        onChange={(num, onSubmit)  => {
            updateHandler(num, onSubmit);
        }}
        callback={(callback) => {
            imagesCallback(callback)
        }}
        renderSelectedComponent={(num) => renderSelectedComponent(num)}
        emptyStayComponent={emptyStayComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topPostButton: {
    backgroundColor: '#2d88ff',
    borderRadius: 8,
    padding: 10,
    fontWeight: 'bold',
    marginRight:10,
    fontSize:16
  },
  flex: {
    flex: 1,
  },
  container: {
    position: 'relative',
  },
  emptyStay: {
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF',
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff',
  },
});
