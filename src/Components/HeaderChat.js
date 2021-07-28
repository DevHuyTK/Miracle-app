import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { AntDesign } from 'react-native-vector-icons';

export default function HeaderChat({ onNavigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      <View style={styles.logoContainer}>
        <Text>Miracle Logo</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnSearch} onPress={() => onNavigation.navigate('SearchChat')}>
          <AntDesign name="form" color="black" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
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
