import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setImage } from './../store/Actions/ImageGridAction';

const { width } = Dimensions.get('window');

function ImagesGrid(props) {
  const countFrom = 5;
  const imagesToShow = [...props.imageGrid];

  if (countFrom && props.imageGrid.length > countFrom) {
    imagesToShow.length = countFrom;
  }

  const clickEventListener = () => {
    Alert.alert('Alert', 'image clicked');
  };

  const deleteHandle = (index) => {
    var delImage = props.imageGrid.splice(index, 1);
    var newImages = props.imageGrid.filter((item) => item !== delImage);
    console.log(props.imageGrid);
    props.setImageGrid(newImages);
  };

  const renderOne = () => {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent1]}
          onPress={() => clickEventListener()}
        >
          <Image style={styles.image} source={{ uri: props.imageGrid[0] }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.delButton} onPress={() => deleteHandle(0)}>
          <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.8 }} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTwo = () => {
    const conditionalRender =
      [3, 4].includes(props.imageGrid.length) || (props.imageGrid.length > +countFrom && [3, 4].includes(+countFrom));

    return (
      <View style={styles.row}>
        <View style={styles.imageContainer1}>
          <TouchableOpacity
            style={[styles.imageContent, styles.imageContent1]}
            onPress={() => clickEventListener()}
          >
            <Image
              style={styles.image}
              source={{ uri: conditionalRender ? props.imageGrid[1] : props.imageGrid[0] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delButton}
            onPress={() => deleteHandle(conditionalRender ? 1 : 0)}
          >
            <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.8 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer1}>
          <TouchableOpacity
            style={[styles.imageContent, styles.imageContent1]}
            onPress={() => clickEventListener()}
          >
            <Image
              style={styles.image}
              source={{ uri: conditionalRender ? props.imageGrid[2] : props.imageGrid[1] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delButton}
            onPress={() => deleteHandle(conditionalRender ? 2 : 1)}
          >
            <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.8 }} />
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
          <Image style={styles.image} source={{ uri: props.imageGrid[props.imageGrid.length - 1] }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.delButton} onPress={() => deleteHandle(props.imageGrid.length - 1)}>
          <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.8 }} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCountOverlay = (more) => {
    const extra = props.imageGrid.length - (countFrom && countFrom > 5 ? 5 : countFrom);
    const conditionalRender =
    props.imageGrid.length == 4 || (props.imageGrid.length > +countFrom && +countFrom == 4);
    return (
      <TouchableOpacity
        style={[styles.imageContent, styles.imageContent2]}
        onPress={() => clickEventListener()}
      >
        <Image
          style={styles.image}
          source={{ uri: conditionalRender ? props.imageGrid[3] : props.imageGrid[4] }}
        />
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
      !countFrom || countFrom > 5 || (props.imageGrid.length > countFrom && [4, 5].includes(+countFrom))
        ? renderCountOverlay(true)
        : renderOverlay();
    const conditionalRender =
    props.imageGrid.length == 4 || (props.imageGrid.length > +countFrom && +countFrom == 4);

    return (
      <View style={styles.row}>
        <View style={styles.imageContainer2}>
          <TouchableOpacity
            style={[styles.imageContent, styles.imageContent1]}
            onPress={() => clickEventListener()}
          >
            <Image
              style={styles.image}
              source={{ uri: conditionalRender ? props.imageGrid[1] : props.imageGrid[2] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delButton}
            onPress={() => deleteHandle(conditionalRender ? 1 : 2)}
          >
            <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.8 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer2}>
          <TouchableOpacity
            style={[styles.imageContent, styles.imageContent1]}
            onPress={() => clickEventListener()}
          >
            <Image
              style={styles.image}
              source={{ uri: conditionalRender ? props.imageGrid[2] : props.imageGrid[3] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delButton}
            onPress={() => deleteHandle(conditionalRender ? 2 : 3)}
          >
            <Feather name="x-circle" color="white" size={width / 12} style={{ opacity: 0.8 }} />
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

const mapStateToProps = (state) => ({
  imageGrid: state.ImagesGridReducers,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setImageGrid: (payload) => {
      dispatch(setImage(payload));
    }
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ImagesGrid);
