import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Post from '../../../Components/Post';
import Header from '../../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChangeDataContext } from '../../../contexts/ChangeData';
import { connect } from 'react-redux';
import Newfeeds from '../../../Components/Newfeeds';
import LottieView from 'lottie-react-native';

function Community({ navigation, ...props }) {
  const [loginData, setLoginData] = useState({});
  const { isChanged, setIsChanged } = useContext(ChangeDataContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
      .then((data) => setLoginData(data))
      .catch((error) => console.log(error));
  }, [!isChanged]);

  return (
    <View style={{ flex: 1 }}>
      <Header onNavigation={navigation} />
      <SafeAreaView style={{ flex: 2 }}>
        {props?.newfeed ? (
          <FlatList
            data={Object.values(props.newfeed)}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Post onNavigation={navigation} post={item} userData={loginData} />
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Newfeeds onNavigation={navigation} userData={loginData} />}
          />
        ) : (
          <LottieView
            autoPlay
            loop
            speed={0.6}
            style={{
              height: 100,
              alignSelf: 'center',
            }}
            source={require('../../../../assets/Animations/8311-loading.json')}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  newfeed: state.account.newfeed,
});

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  body: {
    backgroundColor: '#fff',
  },
  highlight: {
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addPhotoTitle: {
    fontSize: 15,

    fontWeight: 'bold',
  },
  photoList: {
    height: 70,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  photo: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399cc',
  },
  photoIcon: {
    width: 50,
    height: 50,
  },
  addButtonContainer: {
    padding: 15,
    justifyContent: 'flex-end',
  },
  addButtonText: {
    color: '#0ff1ce',
    fontWeight: 'bold',
    fontSize: 48,
  },
});

export default connect(mapStateToProps)(Community);
