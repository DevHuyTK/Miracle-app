import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons } from 'react-native-vector-icons';
import Signup2 from '../screens/Account/Signup-Step2';
import Login from '../screens/Account/Login';
import Chat from '../screens/Home/Message/Chat';
import ChatBox from '../screens/Home/Message/ChatBox';
import SearchChat from '../screens/Home/Message/SearchChat'
import Community from '../screens/Home/Community';
import Personal from '../screens/Home/Personal';
import Account from '../screens/Home/Account';
import Search from '../screens/Search';
import AccountDetails from '../screens/Home/AccountDetail';
import CreatePost from '../screens/CreatePost';
import ChangePassword from '../screens/Account/ChangePassword'
import AvatarScreen from '../screens/Account/AvatarScreen'
import { ChangeDataProvider } from '../contexts/ChangeData';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color, size }) => <FontAwesome name="group" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Personal"
        component={Personal}
        options={{
          tabBarLabel: 'Personal',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="message" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="menu" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <ChangeDataProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup2" component={Signup2} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="AccDetail" component={AccountDetails} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Avatar" component={AvatarScreen} />
          <Stack.Screen name="ChatBox" component={ChatBox} />
          <Stack.Screen name="SearchChat" component={SearchChat} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChangeDataProvider>
  );
}
