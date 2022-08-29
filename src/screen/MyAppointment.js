import React,{useEffect,useState} from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity,Image,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import axios from "axios"; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Chip } from "@react-native-material/core";
import { MaterialIcons } from '@expo/vector-icons'; 
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons'; 

const MyAppointment = ({ navigation, route }) => {
  const user = JSON.parse(localStorage.getItem('LoginUser'));
  const [myappt, setMyappt] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [id, setID] = useState('');
  
  
  
  useEffect(() => {
    axios.get("http://localhost:3001/appointments")
    .then((response) => {
      const data = response.data;
      setMyappt(data);
     
      // // setMyappt(myappt.filter(myappt => myappt.pid !== user.id));
     
      // {response.data.map((value,key)=>{
      //   if(value.pid === user.id ){
      //     // setCart([...myappt, value]);
      //     setMyappt((myappt)=>[...myappt,value]);
          
      //   }
      //   // setMyappt(myappt.filter(myappt => myappt.pid === user.id));
      // })}
     
    });
   
  }, []);
  const filterData = myappt.filter( data => {
    // if(number.country === route.params.destination && number.specialization.includes(route.params.department || search.length > 1)){
    //   return number.country ===  route.params.destination && number.specialization.includes(route.params.department) && Object.values(number).join('').toLowerCase().includes(search.toLowerCase());
      
    // }
    if(data.pid === user.id){
      // console.log(data);  
      return data.pid===user.id;
    }
   
    // if(route.params.doctorid){
    //   return data.id===route.params.doctorid;
    // }
    // if(data.specialization.includes(route.params.department) || search.length > 1){
    //   return data.specialization.includes(route.params.department)&& Object.values(data).join('').toLowerCase().includes(search.toLowerCase());
    // }
    // if(data.hospitalname === route.params.hospitalname && data.hospitalid === route.params.id || search.length > 1 ){
    //   return data.hospitalname === route.params.hospitalname && data.hospitalid === route.params.id && Object.values(data).join('').toLowerCase().includes(search.toLowerCase());
    // }
   
  })
  
  const handleDelete=(id)=>{
    setID(id)
    setModalVisible(!isModalVisible);
    
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const deleteAppt = () => {
    axios.delete(`http://localhost:3001/appointments/${id}`)  
      .then(res => {  
        // console.log(res);  
        // console.log(res.data);  
        setMyappt(myappt.filter(myappt => myappt.id !== id));
        setModalVisible(!isModalVisible);
    })  
  };
  return (
    <SafeAreaView style={{backgroundColor:'#fff',flex:1}}>
       {filterData.map(data =>
          <View key={data.id}>
          <View style={styles.view}>
             <View style={[styles.container, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "row"
              }]}>
                <View style={{ flex: 3, padding:20,alignItems:'center' }} >
                   <Image source={{uri:data.drimage}} style={{ width: 80,height: 80,borderRadius:50 }}/>
                   <TouchableOpacity style={styles.rate} onPress={()=>navigation.navigate('Doctors',{doctorid:data.doctorid})}>
                      <Text style={{alignSelf:'center'}}><FontAwesome5 name="info-circle" size={24} color="green" /></Text>
                   </TouchableOpacity>
                </View>
                <View style={{ flex: 6, padding:20,alignItems:'center' }} >
                   <View style={{width:156,paddingLeft:10}} >
                   <Text style={{fontWeight:'bold',color:'#413E3E',marginBottom:8}}>Appointment Date</Text>
                   <View style={{width:100,}} >
                   <Chip variant="outlined" color='#00C0F0'>
                    <Text style={{textAlign:'center',fontWeight:200,color:'#00C0F0'}}>{data.appointmentdate}</Text>
                   </Chip>
                   </View>
                   <Text style={{fontWeight:'bold',color:'#413E3E',marginBottom:8}}>Appointment Time</Text>
                   <View >
                  
                    <Text style={{textAlign:'center',fontWeight:200,color:'#00C0F0'}}>{data.slottime}</Text>
                 
                   </View>
                  
                  
                   <Text style={{fontWeight:'bold',color:'#413E3E',marginTop:8,marginBottom:8}}>Booking Date</Text>
                   <View style={{width:200,}} >
                   <Text style={{fontSize:16}}>{data.bookingdate}</Text>
                   </View>
                  
                   <View style={{width:100,alignItems:'center',marginTop:10}}>
                    {data.adminstatus === 'Pending' && <Chip variant="outlined" color="green">
                   <MaterialIcons name="pending" size={14} color="green" />
                   <Text style={{textAlign:'center',fontWeight:200,color:'#413E3E'}}> {data.adminstatus}</Text>
                   </Chip>}
                   {data.adminstatus === 'Confirm' && <Chip variant="outlined" color="#8601AF" >
                   <Ionicons name="checkmark-done-circle-sharp" size={14} color="#8601AF"  />
                   <Text style={{textAlign:'center',fontWeight:'bold',color:"#8601AF"}}> {data.adminstatus}</Text>
                   </Chip>}
                   {data.adminstatus === 'Cancel' && <Chip variant="outlined" color="red" >
                   <MaterialIcons name="cancel" size={14} color="red" />
                   <Text style={{textAlign:'center',fontWeight:'bold',color:"red"}}> {data.adminstatus}</Text>
                   </Chip>}  
                   </View>               
                   </View>
                
                </View>
                <View style={{ flex: 3, padding:20,alignItems:'center' }} >
                  <Text style={{color:'#00C0F0',fontWeight:'bold',fontSize:18}}><FontAwesome name="rupee" size={16} color="#00C0F0" />{data.apptamount}</Text>
                </View>
                
             </View>
           
             <View style={[styles.btncontainer, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "row"
              }]}>
                <View style={{ flex: 6, padding:14,alignItems:'center' }} >
                 <TouchableOpacity >
                   <Text style={styles.text1}>View Details</Text>
                 </TouchableOpacity>
                </View>
                <View style={{ backgroundColor:'#F94892',flex: 6, padding:14,alignItems:'center', borderLeftColor:'#D0D0D0', borderLeftWidth: 1, }} >
                 <TouchableOpacity onPress={()=>handleDelete(data.id)}>
                   <Text style={styles.text2} >Delete</Text>
                 </TouchableOpacity>
                </View>
             
             </View>
          </View>
         </View>
         )
        }
     <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <View style={{padding:6,borderRadius:40,marginTop:-60,backgroundColor:'#fff',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
          <MaterialIcons name="delete" size={60} color="red" />
          
          </View>
          <Text style={{fontSize:24,fontWeight:'bold',marginBottom:20,color:'#413E3E'}}>Are you sure?</Text>
          <View style={{flex:1,alignItems:"center"}}>
            <Text style={{textAlign:'center'}}>Do you really want to delete these appointment?</Text>
          </View>
          
          <Text style={styles.modalText}>This process can't be undone</Text>
      
        <View >
        <View style={styles.parent}>
          <TouchableOpacity style={styles.cancelbtn} onPress={toggleModal}>
            <Text style={{color:'#fff',alignSelf:'center',justifyContent:'center'}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.deletebtn} onPress={deleteAppt}>
            <Text style={{color:'#fff'}}>Delete</Text>
          </TouchableOpacity>
         
        </View>
        </View>
          {/* <Button title="Ok" onPress={toggleModal} /> */}
        </View>
     </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view:{
    margin:8, 
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
    width:80,
    
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
  btncontainer:{
    backgroundColor:'#fff',
    borderTopColor:'#D0D0D0',
    borderTopWidth: 1,
    
  },
  text1:{
    color:'#F94892',
    textTransform:'uppercase',
    fontWeight:'bold'
  },
  text2:{
    color:'#fff',
    textTransform:'uppercase',
    fontWeight:'bold'
 },
 modal:{
  backgroundColor:'#fff',
  paddingTop:20,
  paddingBottom:20,
  alignItems:'center',
  borderRadius:20
},
modalText:{
  fontSize:16,
  fontWeight:400,
},
cancelbtn:{
  backgroundColor:'gray',
  width: '60%',
  marginRight:10,
  padding:10,
  marginTop:20,
  alignItems:"center",
  justifyContent:"center",
},
deletebtn:{
  backgroundColor: 'red',
  width: '60%',
  padding:10,
  marginTop:20,
  alignItems:"center",
  justifyContent:"center",
  // backgroundColor:"red",
  // alignItems:"center",
  // padding:20,
  // justifyContent:"center",
  // marginTop:20
},
parent: {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-around",

},
  
});

export default MyAppointment;
