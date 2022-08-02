import React, { useState, useEffect } from 'react';
import { Button, View, TouchableOpacity,TextInput,Text,StyleSheet,ScrollView,Image} from 'react-native';
import axios from "axios";
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

const AboutScreen = ({ navigation }) => {
   
   const [items, setItems] = useState([]);
   const [search ,setSearch]= useState('');
   
   useEffect(() => {
   
      axios.get("http://localhost:3001/country_name")
      .then((response) => {
        
         setItems(response.data)
      });
   });
   const data={
       image:'../assets/doctor.jpg',
       rate:'4.5',
       drname:'Dr. Sunil Malhar',
       bio:'Md',
       spe:'Dentist',
       location:'Pune',
       fees:'30',
       description:'fhisdhfkcvmxcnkdfj'
   }
   return (
      <ScrollView>
       <View style={{ justifyContent: 'center',padding:10,alignItems:'center', backgroundImage: 'linear-gradient(to right top, #004d61, #015974, #086687, #15739b, #257faf)',height:80}}>
        <View style={styles.sectionStyle}>
          
          <TextInput
            style={{flex: 1,borderRadius: 25,}}
            placeholder="  Search Hospitals"
            onChangeText={newText => setSearch(newText)}
            value={search}
          />
          <FontAwesome style={styles.imageStyle} name="search" size={20} color="#413e3e" />
        </View>
      </View>
      <View style={styles.view}>
          <View style={[styles.container, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 3, padding:20,alignItems:'center' }} >
                  <Image source={{uri: require('../assets/doctor.jpg')}} style={{ width: 80, height: 80 ,borderRadius:50}}/>
                  <View style={styles.rate}>
                     <Text ><AntDesign name="star" size={16} color="#ffa534" /> 4.5</Text>
                  </View>
               </View>
               <View style={{ flex: 6, padding:20,alignItems:'center' }} >
                  <View style={{width:156,paddingLeft:10}} >
                  <Text style={styles.drname}> Dr. Sunil Malhar</Text>
                  <Text style={{color:'#00C0F0',fontWeight:'bold',fontSize:16}}> Md </Text>
                  <Text style={{fontSize:14,fontWeight:'bold',color:'#413e3e'}}> Dentist </Text>
                  <Text style={{fontSize:14,color:'#413e3e'}}> Pune </Text>
                  </View>
               </View>
               <View style={{ flex: 3, padding:20,alignItems:'center' }} >
                 <Text style={{color:'#00C0F0',fontWeight:'bold',fontSize:18}}><FontAwesome name="rupee" size={16} color="#00C0F0" /> 30 </Text>
               </View>
               
          </View>
          
          <View style={[styles.btncontainer, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 6, padding:14,alignItems:'center' }} >
                <TouchableOpacity  onPress={() =>navigation.navigate('Doctor Profile', {data: data,})}>
                  <Text style={styles.btnProfileText}>View Profile</Text>
                </TouchableOpacity>
               </View>
               <View style={{ flex: 6, padding:14,alignItems:'center', borderLeftColor:'#D0D0D0', borderLeftWidth: 1, }} >
                <TouchableOpacity  >
                  <Text style={styles.btnBookText} >Book Now</Text>
                </TouchableOpacity>
               </View>
            
          </View>
      </View>
      </ScrollView>
      
   )
};
export default AboutScreen;
const styles = StyleSheet.create({
   view:{
     margin:16, 
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