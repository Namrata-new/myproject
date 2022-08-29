import React, {useState,useEffect} from 'react';
import {View, Text,TouchableOpacity, StyleSheet,Picker} from 'react-native';
import axios from "axios";

const AlreadyDia = ({ navigation }) => {
  const [countryitems, setCountryItems] = useState([]);
  const [specitems, setSpecItems] = useState([]);
  const [department,setDepartment]=useState('');
  const [destination,setDestination]=useState('');
  const selectDept = (department) => {
    setDepartment(department);
  }
  const selectDesti = (destination) => {
    setDestination(destination);
  }
  useEffect(() => {
    axios.get(`http://localhost:3001/country_name`)
     .then(res => {
        const data = res.data;
        setCountryItems(data)
       
    })
    axios.get(`http://localhost:3001/specialization`)
      .then(res => {
        const data = res.data;
        setSpecItems(data)
    })
  }, []);
  const facility=()=>{
    if(department==='' && destination ===''){
      alert('Select Value');
    }else{
      navigation.navigate('Hospitals',{department: department,destination:destination})
    }
  }
  const doctors=()=>{
    if(department==='' && destination ===''){
      alert('Select Value');
    }else{
      navigation.navigate('Doctors',{department: department,destination:destination})
    }
  }
  return (
    <View  style={{backgroundColor:'#fff',flex:1}}>
   
    <View style={styles.topContainer}>
        <Text style={styles.topText}>
            Choose Department And Destination 
        </Text>
    </View>
    <View style={styles.container}>
     <Picker selectedValue = {department} onValueChange = {selectDept} style={styles.picker}>
     <Picker.Item label = "Select Department" value = "selectdept" />
     
     {specitems.map((item,index)=>{
        
         return(
          <Picker.Item  key={index}  label = {item.specialization} value = {item.specialization} />
         )
      })}
      
     </Picker>
     <Picker selectedValue = {destination} onValueChange = {selectDesti} style={styles.picker}>
        <Picker.Item label = "Select Destination" value = "selectdesti" />
        {countryitems.map((item,index)=>{
         return(
          <Picker.Item  key={index}  label = {item.country} value = {item.country} />
         )
      })}
     </Picker>
    </View>
    <View  style={styles.buttonContainer}>
     <TouchableOpacity  style={styles.appButtonContainer} onPress={facility}>
       <Text style={styles.appButtonText}>Search Facility</Text>
     </TouchableOpacity>
     <br/>
     <TouchableOpacity  style={styles.appButtonContainer}  onPress={doctors}>
       <Text style={styles.appButtonText}>Search Doctors</Text>
     </TouchableOpacity>
   
     </View>
   
    </View>
 
  );
};
export default AlreadyDia;
const styles = StyleSheet.create({
    topContainer:{
      height:260,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      backgroundColor:"#004d61",
      alignItems: 'center',
      justifyContent: 'center',
     
    },
    topText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:20
    },
    container: {
       margin:20
    },
    text: {
       fontSize: 30,
       alignSelf: 'center',
       color: 'red'
    },
    picker: {
       height:40,
       borderColor:'transparent',
       boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
       paddingRight:20,
       marginBottom:20
    },
    item:{
        color:'red'
    },
    buttonContainer:{
        
        flexDirection: "row",
        justifyContent: "space-around",
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
  
});