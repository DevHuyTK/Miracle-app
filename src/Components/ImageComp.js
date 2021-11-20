import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import {DOMAIN} from '../store/constant'

const { width } = Dimensions.get('window');
const height = width;

function ImageComp({ images }) {
  const [active, setActive] = useState(0);
  const scrollViewRef = useRef(null);
  const change = ({ nativeEvent }) => {
    const slide = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  };

  const goForward = () => {
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({ x: width * (active + 1) });
    }
  };

  const goBackward = () => {
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({ x: width * (active - 1) });
    }
  };

  if (Array.isArray(images)) {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={(event) => change(event)}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          ref={scrollViewRef}
        >
          {images.map((image, index) => (
            <Image key={index} source={{ uri: `${DOMAIN}/${image}`}} style={styles.image} />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {images.map((i, k) => (
            <Entypo
              key={k}
              style={k === active ? styles.pagingActiveText : styles.pagingText}
              name="dot-single"
            ></Entypo>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          {active === 0 ? (
            <View style={{ width: 30, height: 50, alignItems: 'center' }} />
          ) : (
            <TouchableOpacity
              onPress={() => goBackward()}
              style={{ width: 30, height: 50, alignItems: 'center' }}
            >
              <FontAwesome name="chevron-left" color="#fff" style={styles.left} />
            </TouchableOpacity>
          )}
          {active === images.length - 1 ? (
            <View style={{ width: 30, height: 50, alignItems: 'center' }} />
          ) : (
            <TouchableOpacity
              onPress={() => goForward()}
              style={{ width: 30, height: 50, alignItems: 'center' }}
            >
              <FontAwesome name="chevron-right" color="#fff" style={styles.right} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  if (images === null || images === '' || images === [] ) {
    return null;
  }

  return <Image source={{ uri: images }} style={styles.image} />;
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  scroll: {
    width: width,
    height: height,
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  pagingText: {
    fontSize: width / 15,
    color: '#888',
    margin: 3,
  },
  pagingActiveText: {
    fontSize: width / 15,
    color: '#fff',
    margin: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: width,
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  left: {
    fontSize: 30,
    opacity: 0.4,
  },
  right: {
    fontSize: 30,
    opacity: 0.4,
  },
});

export default ImageComp;
