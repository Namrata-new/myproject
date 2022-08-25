import React,{useState,useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import axios from "axios"; 
import { Avatar } from "@react-native-material/core";
import { Chip } from "@react-native-material/core";
import { Ionicons } from '@expo/vector-icons'; 

const MyItinerary = ({ navigation }) => {
  const user = JSON.parse(localStorage.getItem('LoginUser'));
  const [myitinerary, setMyitinerary] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/itinerary")
    .then((response) => {
      const data = response.data;
      setMyitinerary(data);
   
    });
   
  }, []);
  const filterData = myitinerary.filter( data => {
  
    if(data.pid === user.id){
      // console.log(data);  
      return data.pid===user.id;
    }
 
  })
  return (
    <SafeAreaView style={{backgroundColor:'#fff',flex:1}}>
      {filterData.map(data =>
      <View key={data.id}>
        <View style={styles.view}>
          <View style={[styles.container, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "row"
              }]}>
                <View style={{ flex: 2, padding:20,alignItems:'center'}} >
                  <Avatar label={data.pid} color="#EEEBDD" />
                </View>
                <View style={{ flex: 6,paddingTop:20}} >
            <Text style={{color:'#413E3E',marginBottom:8,color:'#D75281',fontSize:18,fontWeight:'bold'}}>{data.firstname} {data.lastname}</Text>
            <Text style={{color:'#413E3E',marginBottom:8}}><Ionicons name="call" size={18} color="#413E3E" />  {data.contactno} </Text>
            <Text style={{fontWeight:'bold',color:'#413E3E',marginBottom:8}}>Itinerary Date</Text>
            <View style={{width:100}}>
            <Chip variant="outlined" color='#00C0F0'>
              <Text style={{textAlign:'center',fontWeight:200,color:'#00C0F0'}}>{data.itinerarydate}</Text>
            </Chip>
            </View>
            <Text style={{fontWeight:'bold',color:'#413E3E',marginBottom:8,marginTop:8}}>Itinerary Event</Text>
            <Text style={{color:'#413E3E',marginBottom:8}}>{data.eventdetails}</Text>
          
          </View>
          </View>
         
 
        </View>  
      </View>
       )
      }
      
     
    </SafeAreaView>
  );
};
export default MyItinerary;
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
   
  },
  view:{
    margin:8, 
    boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',
   
  },
});


