import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

function ImagesGrid({ data }) {
  const countFrom = 5;
  const [images, setImages] = useState(data);
  const imagesToShow = [...images];

  if (countFrom && images.length > countFrom) {
    imagesToShow.length = countFrom;
  }

  const clickEventListener = () => {
    Alert.alert('Alert', 'image clicked');
  };

  const deleteHandle = (index) => {
    // var delImage = images.splice(index, 1);
    // var newImages = images.filter((item) => item !== delImage);
    // setImages(newImages);
    Alert.alert('Alert', 'image deleted');
  };

  const renderOne = () => {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent1]}
          onPress={() => clickEventListener()}
        >
          <Image style={styles.image} source={{ uri: images[0] }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.delButton} onPress={() => deleteHandle(0)}>
          <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.5 }} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTwo = () => {
    const conditionalRender =
      [3, 4].includes(images.length) || (images.length > +countFrom && [3, 4].includes(+countFrom));

    return (
      <View style={styles.row}>
        <View style={styles.imageContainer1}>
          <TouchableOpacity
            style={[styles.imageContent, styles.imageContent1]}
            onPress={() => clickEventListener()}
          >
            <Image
              style={styles.image}
              source={{ uri: conditionalRender ? images[1] : images[0] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delButton}
            onPress={() => deleteHandle(conditionalRender ? 1 : 0)}
          >
            <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.5 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer1}>
          <TouchableOpacity
            style={[styles.imageContent, styles.imageContent1]}
            onPress={() => clickEventListener()}
          >
            <Image
              style={styles.image}
              source={{ uri: conditionalRender ? images[2] : images[1] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delButton}
            onPress={() => deleteHandle(conditionalRender ? 2 : 1)}
          >
            <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.5 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderOverlay = () => {
    return (
      <View style={styles.imageContainer2}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent1]}
          onPress={() => clickEventListener()}
        >
          <Image style={styles.image} source={{ uri: images[images.length - 1] }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.delButton} onPress={() => deleteHandle(images.length - 1)}>
          <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.5 }} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCountOverlay = (more) => {
    const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
    const conditionalRender = images.length == 4 || (images.length > +countFrom && +countFrom == 4);
    return (
      <TouchableOpacity
        style={[styles.imageContent, styles.imageContent2]}
        onPress={() => clickEventListener()}
      >
        <Image style={styles.image} source={{ uri: conditionalRender ? images[3] : images[4] }} />
        <View style={styles.overlayContent}>
          <View>
            <Text style={styles.count}>+{extra}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderThree = () => {
    const overlay =
      !countFrom || countFrom > 5 || (images.length > countFrom && [4, 5].includes(+countFrom))
        ? renderCountOverlay(true)
        : renderOverlay();
    const conditionalRender = images.length == 4 || (images.length > +countFrom && +countFrom == 4);

    return (
      <View style={styles.row}>
        <View style={styles.imageContainer2}>
          <TouchableOpacity
            style={[styles.imageContent, styles.imageContent1]}
            onPress={() => clickEventListener()}
          >
            <Image
              style={styles.image}
              source={{ uri: conditionalRender ? images[1] : images[2] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delButton}
            onPress={() => deleteHandle(conditionalRender ? 1 : 2)}
          >
            <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.5 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer2}>
          <TouchableOpacity
            style={[styles.imageContent, styles.imageContent1]}
            onPress={() => clickEventListener()}
          >
            <Image
              style={styles.image}
              source={{ uri: conditionalRender ? images[2] : images[3] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delButton}
            onPress={() => deleteHandle(conditionalRender ? 2 : 3)}
          >
            <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.5 }} />
          </TouchableOpacity>
        </View>
        {overlay}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {[1, 3, 4].includes(imagesToShow.length) && renderOne()}
      {imagesToShow.length >= 2 && imagesToShow.length != 4 && renderTwo()}
      {imagesToShow.length >= 4 && renderThree()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  imageContainer1: {
    width: '50%',
  },
  imageContainer2: {
    width: '33.33%',
  },
  imageContent: {
    borderWidth: 2,
    borderColor: '#fff',
    height: 100,
  },
  imageContent1: {
    width: '100%',
  },
  imageContent2: {
    width: '33.33%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  //overlay effect
  overlayContent: {
    flex: 1,
    position: 'absolute',
    zIndex: 100,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 25,
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 139, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  delButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width / 10,
    height: width / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImagesGrid;
