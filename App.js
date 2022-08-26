import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import DoctorScreen from './src/screen/DoctorScreen';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import SideBar from './src/screen/SideBar';
import DoctorProfile from './src/screen/DoctorProfile';
import HospitalsProfile from './src/screen/HospitalsProfile';
import Hospitals from './src/screen/Hospitals';
import PatientForm from './src/screen/PatientForm';
import SelectDateTime from './src/screen/SelectDateTime';
import PaymentScreen from './src/screen/PaymentScreen';
import { Ionicons } from '@expo/vector-icons'; 
import AlreadyDia from './src/screen/AlreadyDia';
import GetDia from './src/screen/GetDia';
import FeedBack from './src/screen/FeedBack';
import QueryScreen from './src/screen/QueryScreen';
import Dates from './src/screen/Dates';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  >
         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="PatientLogin" component={Login} 
          options={{ 
         header: () => (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'space-between',
          height: 50,
          backgroundColor:'#004d61'
        }}>
        <TouchableOpacity
          style={{ alignSelf:'center',padding:10}}
          onPress={() =>navigation.navigate('Home')} 
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.container}><Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Patient Login</Text></View>
      </View>
      ),}}/>
         <Stack.Screen name="PatientRegister" component={Register} />
         <Stack.Screen name="Sidebar" component={SideBar} options={{ headerShown: false }}/>
         <Stack.Screen name="Doctor Profile" component={DoctorProfile} />
         <Stack.Screen name="Hospitals Profile" component={HospitalsProfile} />
         <Stack.Screen name="Doctors" component={DoctorScreen} />
         <Stack.Screen name="Hospitals" component={Hospitals} />
         <Stack.Screen name="Select Date" component={SelectDateTime} />
         <Stack.Screen name="Patient Form" component={PatientForm} />
         <Stack.Screen name="Payment Form" component={PaymentScreen} />
         <Stack.Screen name="Already Diag" component={AlreadyDia} />
         <Stack.Screen name="Get_Diag" component={GetDia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
