import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../../Components/Header';

function Personal({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Header onNavigation={navigation}></Header>
      <Text>Personal</Text>
    </View>
  );
}

export default Personal;
