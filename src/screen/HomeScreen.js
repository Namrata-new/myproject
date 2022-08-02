import * as React from 'react';
import { TouchableOpacity, Button,View, Alert, Text,StyleSheet , Image} from 'react-native';
const HomeScreen = ({ navigation }) => {
   return (
    <View style = {styles.container}>
       <Image style={styles.logo}  source={{uri: require('../assets/logo.png')}}/>
      <Text style={styles.text} >Welcome to App</Text>
      {/* <TouchableOpacity
         style={styles.signin}
       
        >
         <Text>Click me</Text>
      </TouchableOpacity> */}
      <View style={styles.signin}>
      <Button title="Sign IN" titleStyle={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('PatientLogin')}/>
      <br/>
      <Button title="Sign Up" titleStyle={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('PatientRegister')}/>
      </View>
   
    
      </View>
   );
};
export default HomeScreen;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
    color:'purple',
    fontSize: '24px',
    fontWeight:'bold',
    marginBottom:20
   },
   signin: {
      width:200,
      marginBottom:20,
      borderRadius:45
   },
   logo: {
      width: 260,
      height: 60,
  },
 
 });
 