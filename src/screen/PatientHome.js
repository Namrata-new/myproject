import React, { useState } from 'react';
import { SafeAreaView,TouchableOpacity, Button,View, Alert, Text,StyleSheet,TextInput,Image } from 'react-native';

 
const PatientHome = ({ navigation }) => {
   const user = JSON.parse(localStorage.getItem('LoginUser'));
   return (
    <View style = {styles.container}>
        <View style={styles.logoView}>
        <Image style={styles.logo}  source={{uri: require('../assets/logo.png')}}/>
        <Text style={styles.greettext} >Welcome {user.firstname} {user.lastname}</Text>

     <View  >
         <Text style={styles.text}> Help Us To Find You The Best </Text>
     </View>
     <View >
     <TouchableOpacity  style={styles.appButtonContainer} onPress={() => navigation.navigate('Already Diag')}>
       <Text style={styles.appButtonText}>Already Diagnosed</Text>
     </TouchableOpacity>
     <br/>
     <TouchableOpacity  style={styles.appButtonContainer}  onPress={() => navigation.navigate('Get_Diag')}>
       <Text style={styles.appButtonText}>Get Diagnosed</Text>
     </TouchableOpacity>
     
      {/* <Button title="Sign IN" titleStyle={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('PatientLogin')}/>
      <br/>
      <Button title="Sign Up" titleStyle={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('PatientRegister')}/> */}
     </View>
     </View>
    </View>
   );
};
export default PatientHome;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // background-image: linear-gradient(to right top, #f22e2f, #f84854, #f86174, #f57890, #ee8fa8);
        backgroundImage: 'linear-gradient(to right top, #f22e2f, #f84854, #f86174, #f57890, #ee8fa8)',
        alignItems: 'center',
        justifyContent: 'center',
        padding:20
    },
    logoView:{
      boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
      backgroundColor:'#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:20,
      padding:10
    },
    greettext: {
      color:'red',
      fontSize: '18px',
      fontWeight:'bold',
      marginBottom:20
    },
    text: {
        color:'rgb(101, 221, 239)',
        fontSize: '18px',
        fontWeight:'bold',
        marginBottom:20
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#004d61",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    logo: {
        width: 260,
        height: 60,
    },
   
    
 });
 