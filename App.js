import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import AboutScreen from './src/screen/AboutScreen';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import SideBar from './src/screen/SideBar';
import DoctorProfile from './src/screen/DoctorProfile';
import HospitalsProfile from './src/screen/HospitalsProfile';
import MyAppointment from './src/screen/MyAppointment';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  >
         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="PatientLogin" component={Login} />
         <Stack.Screen name="PatientRegister" component={Register} />
         <Stack.Screen name="Sidebar" component={SideBar} options={{ headerShown: false }}/>
         <Stack.Screen name="Doctor Profile" component={DoctorProfile} />
         <Stack.Screen name="Hospitals Profile" component={HospitalsProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
