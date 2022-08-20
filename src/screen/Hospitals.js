import React, { useState, useEffect } from 'react';
import { Button, View, TouchableOpacity,TextInput, Text,StyleSheet,ScrollView,Image} from 'react-native';
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons'; 

const Hospitals = ({ navigation ,route}) => {
  const [search ,setSearch]= useState('');
  const [hospitalData ,setHospitalData]= useState([]);
  console.log(route.params)
  console.log(search)
  useEffect(() => {
    axios.get(`http://localhost:3001/hospitals`)
     .then(res => {
        const data = res.data;
        setHospitalData(data) 
    })
   
  }, []);
   const filterData = hospitalData.filter(data => {
      if(data.country === route.params.destination && data.specialization.includes(route.params.department || search.length > 1)){
        return data.country ===  route.params.destination && data.specialization.includes(route.params.department) && Object.values(data).join('').toLowerCase().includes(search.toLowerCase());
        
      }
     
   })
    return (
     <ScrollView style={{backgroundImage: 'linear-gradient(to right top, #004d61, #226b84, #3e8baa, #5aabd0, #77cdf9)'}}>
      <View style={{ justifyContent: 'center',padding:10,alignItems:'center', backgroundImage: 'linear-gradient(to right top, #004d61, #015974, #086687, #15739b, #257faf)',height:80}}>
        <View style={styles.sectionStyle}>
          <TextInput
            style={{flex: 1,borderRadius: 25,padding:10}}
            placeholder="Search Hospitals"
            onChangeText={newText => setSearch(newText)}
            value={search}
          />
          <FontAwesome style={styles.imageStyle} name="search" size={20} color="#413e3e" />
          
        </View>
      </View>
       
      
        {filterData.map(hospital =>
          <View key={hospital.id}>
            <View style={styles.view}>
            <View style={[styles.container, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 3, padding:20,alignItems:'center'}} >
               <Image source={{uri:hospital.hospitalimage}} style={{ width: 80,height: 80 }}/>
              
               </View>
               <View style={{ flex: 10, padding:20,alignItems:'center'}} >
                 <View  style={{width:220,paddingLeft:10}}>
                   <Text style={{fontSize:16,fontWeight:'bold',color:'#413e3e'}}>{hospital.hospitalname}</Text>
                   <Text style={{fontSize:14,fontWeight:'bold',color:'#00C0F0'}}>{hospital.specialization}</Text>
                   <Text style={{fontSize:12,fontWeight:'bold',color:'#413e3e'}}>{hospital.website}</Text>
                   <Text>{hospital.city}</Text>
                 </View>
                  
               </View>
            </View>
            <View style={[styles.btncontainer, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 6, padding:14,alignItems:'center' }} >
                <TouchableOpacity  onPress={() =>navigation.navigate('Hospitals Profile',hospital )} >
                  <Text style={styles.btnProfileText}>View Hospital</Text>
                </TouchableOpacity>
               </View>
               <View style={{ flex: 6, padding:14,alignItems:'center', borderLeftColor:'#D0D0D0', borderLeftWidth: 1, }} >
                <TouchableOpacity onPress={() =>navigation.navigate('Doctors',hospital)} >
                  <Text style={styles.btnDoctorText} >View Doctors</Text>
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
export default Hospitals;
const styles = StyleSheet.create({
  view:{
    margin:8, 
    flex:1,
    boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',
   
  },
  container: {
    backgroundColor:'#fff',  
  },
  btncontainer:{
    backgroundColor:'#fff',
    borderTopColor:'#D0D0D0',
    borderTopWidth: 1,
    
  },
  btnProfileText:{
    color:'#ffa534',
    textTransform:'uppercase',
    fontWeight:'bold',
    alignSelf:'center'
  },
  btnDoctorText:{
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