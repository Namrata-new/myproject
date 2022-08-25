import React,{useState,useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import axios from "axios"; 
import { Avatar } from "@react-native-material/core";
import { Chip } from "@react-native-material/core";
import { Ionicons } from '@expo/vector-icons'; 

const MyTripStatus = () => {
  const user = JSON.parse(localStorage.getItem('LoginUser'));
  const [mytrips, setMytrip] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/trips")
    .then((response) => {
      const data = response.data;
      setMytrip(data);
   
    });
   
  }, []);
  return (
    <View style={styles.container}>
      <Text>MyTripStatus</Text>
    </View>
  )
}

export default MyTripStatus;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  }
})