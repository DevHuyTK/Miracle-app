import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons, FontAwesome } from 'react-native-vector-icons';
import { Avatar, Icon } from 'react-native-elements';
import CommentLine from '../../Components/CommentLine';

const Comment = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tempus tortor. Phasellus viverra et ante id tincidunt. Sed efficitur est eu elit tristique, et pulvinar eros sodales',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tempus tortor. ',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tempus tortor. Phasellus viverra et ante id tincidunt.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tempus tortor. Phasellus viverra et ante id tincidunt.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tempus tortor. Phasellus viverra et ante id tincidunt.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tempus tortor. Phasellus viverra et ante id tincidunt.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tempus tortor. Phasellus viverra et ante id tincidunt.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tempus tortor. Phasellus viverra et ante id tincidunt.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tempus tortor. Phasellus viverra et ante id tincidunt.',
];

export default function CommentInteract({ navigation, ...props }) {
  const userData = 0;
  const scrollView = useRef();
  const [comment, setComment] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView
        style={{
          flexDirection: 'row',
          height: '8%',
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          paddingVertical: 5,
        }}
      >
        <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor="#999"
            activeOpacity={0.5}
            style={styles.btnBack}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="chevron-left" color="black" size={30} />
          </TouchableHighlight>
        </View>
        <Text style={{ fontSize: 20, paddingLeft: 6, alignSelf: 'center' }}>Bình luận</Text>
      </SafeAreaView>
      <FlatList
        data={Comment}
        keyExtractor={(item, index) => String(index)}
        ref={scrollView}
        style={{ paddingHorizontal: 15, paddingVertical: 5, height: '84%', width: '100%' }}
        renderItem={({ item }) => <CommentLine data={item} onNavigation={navigation} />}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd({ animated: true })}
      />
      <View style={styles.commentInputBar}>
        {userData !== 0 ? (
          <Avatar
            size="medium"
            rounded
            source={{
              uri: ``,
            }}
            containerStyle={{ backgroundColor: 'gray', height: '90%', width:'15%' }}
            onPress={() => navigation.navigate('AccDetail')}
          />
        ) : (
          <Avatar
            size="medium"
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            containerStyle={{ backgroundColor: 'gray', height: '100%', width:'15%' }}
            onPress={() => navigation.navigate('AccDetail')}
          />
        )}
        <TextInput
          multiline={true}
          scrollEnabled={true}
          placeholder="Hãy Viết gì đó"
          style={styles.input}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  btnBack: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  commentInputBar: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    height: '8%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
  },
  input: {
    width: '80%',
    height: '90%',
    textAlignVertical: 'center',
    paddingLeft: 9,
    marginLeft: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 15,
  },
});
