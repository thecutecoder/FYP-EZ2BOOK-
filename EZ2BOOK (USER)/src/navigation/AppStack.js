import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
//import AddVenue from '../screens/addVenue';

import LoginUserScreen from '../screens/LoginUserScreen';
import SignUpUserScreen from '../screens/SignUpUserScreen';
import RoomDetailsScreen from '../screens/RoomDetailsScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import CreateBookingScreen from '../screens/CreateBookingScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function UserAuth() {
  return (
    <Stack.Navigator
    initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
    
    <Stack.Screen
    name="Login" 
    component={LoginUserScreen} 
  />
  <Stack.Screen
    name="Sign Up" 
    component={SignUpUserScreen}
  />

<Stack.Screen
    name="Room Details" 
    component={RoomDetailsScreen} 
  />

<Stack.Screen
    name="Update Profile" 
    component={UpdateProfileScreen} 
  />

<Stack.Screen
    name="Create Booking" 
    component={CreateBookingScreen} 
  />
   
  </Stack.Navigator>
  );
} 

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#00B8D4',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>

      <Drawer.Screen
        name ="Login2"
        component={UserAuth}
        options={{
          drawerLabel: () => null,
          drawerActiveBackgroundColor: () => null,
          title: null,
          drawerIcon: () => null
        }}
      /> 
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Booking History"
        component={BookingHistoryScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="mail-outline" size={22} color={color} />
          ),
        }}
      /> 
      {/*<Drawer.Screen
        name="Add Venue"
        component={AddVenue}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />*/}

    </Drawer.Navigator>

  );
};


export default AppStack;
