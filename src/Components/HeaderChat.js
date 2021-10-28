import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { AntDesign } from 'react-native-vector-icons';

const logo = require('../../assets/Miracle.png');

export default function HeaderChat({ onNavigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      <TouchableOpacity style={styles.imageBox} onPress={() => onNavigation.navigate('Community')}>
        <Image source={logo} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnSearch}
          onPress={() => onNavigation.navigate('SearchChat')}
        >
          <AntDesign name="form" color="black" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  imageBox: {
    width: '50%',
    justifyContent: 'center',
    paddingLeft: 0,
  },
  image: {
    width: '50%',
    height: '50%',
  },
  logoContainer: {
    width: '50%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  btnContainer: {
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  btnSearch: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
