import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity,TextInput,Text,StyleSheet,ScrollView,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import axios from "axios";
const DoctorScreen = ({ navigation,route }) => {
  const [search ,setSearch]= useState('');
  const [doctorsData ,setDoctorsData]= useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/doctors`)
     .then(res => {
        const data = res.data;
        setDoctorsData(data);
    })
    console.log(route.params)
  }, []);
  const filterData = doctorsData.filter( data => {
    // if(number.country === route.params.destination && number.specialization.includes(route.params.department || search.length > 1)){
    //   return number.country ===  route.params.destination && number.specialization.includes(route.params.department) && Object.values(number).join('').toLowerCase().includes(search.toLowerCase());
      
    // }
    if(route.params.doctorid){
      return data.id===route.params.doctorid;
    }
    if(data.specialization.includes(route.params.department) || search.length > 1){
      return data.specialization.includes(route.params.department)&& Object.values(data).join('').toLowerCase().includes(search.toLowerCase());
    }
    if(data.hospitalname === route.params.hospitalname && data.hospitalid === route.params.id || search.length > 1 ){
      return data.hospitalname === route.params.hospitalname && data.hospitalid === route.params.id && Object.values(data).join('').toLowerCase().includes(search.toLowerCase());
    }
   
  })
   return (
      <ScrollView style={{backgroundImage: 'linear-gradient(to right top, #004d61, #226b84, #3e8baa, #5aabd0, #77cdf9)'}}>
       <View style={{ justifyContent: 'center',padding:10,alignItems:'center', backgroundImage: 'linear-gradient(to right top, #004d61, #015974, #086687, #15739b, #257faf)',height:80}}>
        <View style={styles.sectionStyle}>  
          <TextInput
            style={{flex: 1,borderRadius: 25,padding:10}}
            placeholder="Search Doctors"
            onChangeText={newText => setSearch(newText)}
            value={search}
          />
          <FontAwesome style={styles.imageStyle} name="search" size={20} color="#413e3e" />
        </View>
      </View>
      {filterData.map(doctors =>
        <View key={doctors.id}>
         <View style={styles.view}>
            <View style={[styles.container, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 3, padding:20,alignItems:'center' }} >
                  <Image source={{uri:doctors.profilepic}} style={{ width: 80,height: 80,borderRadius:50 }}/>
                  <View style={styles.rate}>
                     <Text ><AntDesign name="star" size={16} color="#ffa534" />{doctors.rating}</Text>
                  </View>
               </View>
               <View style={{ flex: 6, padding:20,alignItems:'center' }} >
                  <View style={{width:156,paddingLeft:10}} >
                  <Text style={styles.drname}>{doctors.doctorname}</Text>
                  <Text style={{color:'#00C0F0',fontWeight:'bold',fontSize:16}}>{doctors.biography}</Text>
                  <Text style={{fontSize:14,fontWeight:'bold',color:'#413e3e'}}>{doctors.specialization} </Text>
                  <Text style={{fontSize:14,color:'#413e3e'}}>{doctors.address}</Text>
                  </View>
               </View>
               <View style={{ flex: 3, padding:20,alignItems:'center' }} >
                 <Text style={{color:'#00C0F0',fontWeight:'bold',fontSize:18}}><FontAwesome name="rupee" size={16} color="#00C0F0" />{doctors.remoteconfees}</Text>
               </View>
               
            </View>
          
            <View style={[styles.btncontainer, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 6, padding:14,alignItems:'center' }} >
                <TouchableOpacity  onPress={() =>navigation.navigate('Doctor Profile', doctors)}>
                  <Text style={styles.btnProfileText}>View Profile</Text>
                </TouchableOpacity>
               </View>
               <View style={{ flex: 6, padding:14,alignItems:'center', borderLeftColor:'#D0D0D0', borderLeftWidth: 1, }} >
                <TouchableOpacity onPress={() =>navigation.navigate('Select Date', {hospitalid:doctors.hospitalid,doctor:doctors})} >
                  <Text style={styles.btnBookText} >Book Now</Text>
                </TouchableOpacity>
               </View>
            
            </View>
         </View>
        </View>
       )
      }
      
      </ScrollView>
      
   )
};
export default DoctorScreen;
const styles = StyleSheet.create({
   view:{
     margin:8, 
     flex:1,
     boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'
   },
   container: {
      backgroundColor:'#fff',
   },
   rate : {
     backgroundColor:'#fff',
     boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
     padding:4,
     borderRadius:20,
     marginTop:-10,
     width:60,
     alignItems:'center'
   },
   text: {
     color:'red',
     alignItems:'center',
     justifyContent:'center',

   },
   drname:{
      color:'#413e3e',
      fontWeight:'bold',
      fontSize:16
   },
   btncontainer:{
    backgroundColor:'#fff',
    borderTopColor:'#D0D0D0',
    borderTopWidth: 1,
    
   },
   btnProfileText:{
      color:'#ffa534',
      textTransform:'uppercase',
      fontWeight:'bold'
   },
   btnBookText:{
      color:'#00C0F0',
      textTransform:'uppercase',
      fontWeight:'bold'
   },
   sectionStyle: {
     flexDirection: 'row',
     justifyContent: 'right',
     alignItems: 'right',
     backgroundColor: '#FFF',
     height: 40,
     width:'100%',
     borderRadius: 25,
     margin: 10,
     
   },
   imageStyle: {
     resizeMode: 'stretch',
     alignItems: 'left',
     marginTop:10,
     marginRight:10
   },
});