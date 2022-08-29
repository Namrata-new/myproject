import React from 'react';
import { View,Text,StyleSheet,Image } from 'react-native';

 
const DoctorProfile = ({ navigation ,route}) => {
   const user = JSON.parse(localStorage.getItem('LoginUser'));
   console.log(route.params)
   return (
    <View style={styles.container}>
        <View style={styles.profile}  >
           <Image source={{uri:route.params.profilepic}} style={{ width:260,height:260,flex:1 }}/>

         
            <View >
                <Text style={{fontWeight:'bold',fontSize:18,color:'#413e3e',alignSelf:'center'}}>{route.params.doctorname}</Text>
                <Text>{route.params.specialization}</Text>
                <Text>{route.params.biography}</Text>
                <Text>{route.params.address}</Text>
            </View>
        </View>
       <Text></Text>
    </View>
     
   );
};
export default DoctorProfile;
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