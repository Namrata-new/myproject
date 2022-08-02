import React, { useState } from 'react';
import { SafeAreaView,TouchableOpacity, Button,View, Alert, Text,StyleSheet,TextInput,Image } from 'react-native';

 
const HospitalsProfile = ({ navigation ,route}) => {
  
   
   return (
    <View style={styles.container}>
        <View style={styles.profile}  >
         <Image source={{uri: require('../assets/hospital.jpg')}} style={{ width:260,height:260,flex:1 }}/>
        
            <View >
                {/* <Text style={{fontWeight:'bold',fontSize:18,color:'#413e3e'}}>{route.params.data.drname}</Text>
                <Text>{route.params.data.spe}</Text>
                <Text>{route.params.data.bio}</Text>*/}
                <Text>{route.params.data}</Text> 
            </View>
        </View>
       <Text></Text>
    </View>
     
   );
};
export default HospitalsProfile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile:{
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        padding:20,
        
    }
})