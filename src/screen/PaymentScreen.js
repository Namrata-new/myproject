import React, {useEffect,useState} from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button,TextInput,TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import Modal from "react-native-modal";
import axios from "axios";
import moment from 'moment';
const PaymentScreen = ({ navigation, route }) => {
  const user = JSON.parse(localStorage.getItem('LoginUser'));
  var Tdate = new Date();
  const date = ('0' + Tdate.getDate()).slice(-2);
  const month = ('0' + (Tdate.getMonth() + 1)).slice(-2);
  const year = Tdate.getFullYear();
  const hours = ('0' + Tdate.getHours()).slice(-2);
  const minutes = ('0' + Tdate.getMinutes()).slice(-2);
  const seconds = ('0' + Tdate.getSeconds()).slice(-2);
  const tDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  const [appid,setAppid] = useState('');
  const [values,setValues]= useState({
    email:'',
    cardholdername:'',
    cardholderno:'',
    mmyy:'',
    cvc:'',
    amount:route.params.slot.hospital.doctor.remoteconfees,
  })
  const [isModalVisible, setModalVisible] = useState(false);
  const pbirthDate=moment(user.birthdate).utc().format('YYYY-MM-DD');
  const ApptData={
    id:appid,
    //patientinfo
    firstName:user.firstname,
    lastName:user.lastname,
    gender:user.gender,
    birthdate:pbirthDate,
    pid:user.id,

    //apptdetails
    reason:route.params.patientform.reason,
    currmedications:route.params.patientform.currmedications,
    healthissue:route.params.patientform.healthissue,
    labtestperformed:route.params.patientform.labtestperformed,
    pastmedications:route.params.patientform.pastmedications,
    prevhistory:route.params.patientform.prevhistory,
    report:route.params.patientform.report,
    reportname:route.params.patientform.reportname,

    //appttime
    slottime:route.params.slot.slot,
    appointmentdate:route.params.slot.apptdate,
    bookingdate:tDateTime,

    //payementdetails
    paymentemailid:values.email,
    cardholdername:values.cardholdername,
    cardholderno:values.cardholderno,
    mmyy:values.mmyy,
    cvc:values.cvc,
    amount:values.amount,

    //id
    hospitalid:route.params.slot.hospital.hospitalid,
    doctorid:route.params.slot.hospital.doctor.id,

    //drinfo done
    doctorname:route.params.slot.hospital.doctor.doctorname,
    doctorimg:route.params.slot.hospital.doctor.profilepic,
    
    //status
    doctorstatus:'Pending',
    adminstatus:'Pending',
    status:'Pending',
    actions:'Cancel Appointment',
    resheduledate:'0000-00-00',
    resheduletime:'',
    reschedulereason:'',
    apptlink:'',
    cancelreason:'',
 
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
   
    axios.post('http://localhost:3001/appointments',ApptData)
        .then((res)=>{
          console.log(res)
          navigation.navigate('My Appointments')
    });
   
  };
  useEffect(() => {
    // console.log(route.params)
    getData();
  }, []);
  const getData=()=>{
  axios.get("http://localhost:3001/appointments")
  .then((response) => {
     if(response.data.length === 0){
      let count=response.data.length+1;
      setAppid(count);
     
     }else {
       let data=response.data[response.data.length - 1];
       setAppid(data.id+1)
     }
    // console.log(response.data)
   
    // console.log(response.data[response.data.length - 1])
     
  });
  }
  const handleOnChangeText =(value,fieldName)=>{
    setValues({...values, [fieldName]: value });

  };
  const updateError =(error,stateUpdate)=>{
    stateUpdate(error);
    setTimeout(()=>{
      stateUpdate('')
    },2500)
  }
  const isValidEmail=(value)=>{
    const regx=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regx.test(value)
  }
  const isValidMobile=(value)=>{
    const regx=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regx.test(value)
  }
  const [error,setError]=useState('');
  const isValidForm=()=>{
    if(!values.email.trim() && !values.cardholdername.trim() && !values.cardholderno.trim() && !values.cvc.trim() && !values.amount.trim() ) return updateError("Required all Field",setError)
    if(!isValidEmail(values.email))return updateError("Invalid email",setError)
    
    return true;
   
  }
  const submitPayment = ()=>{
    if(isValidForm()){
      console.log("submitData")
      console.log(values)
      setModalVisible(!isModalVisible);
      
    }
   
  }
  const alertMessage=()=>{
    alert(error)
  }
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.card}> 
       <View  style={styles.logo}> 
         <MaterialIcons  style={{marginTop:20,alignSelf:'center'}}name="payment" size={60} color="#fff" />
       </View>
     
         <View style={styles.sectionStyle}>
          
          <TextInput
            style={{flex: 1,borderRadius: 25,paddingLeft:10}}
            placeholder="Enter Card Holder Name"
            onChangeText={(value) => handleOnChangeText(value,'cardholdername')}
            value={values.cardholdername}
          
          />
          <Ionicons style={styles.imageStyle} name="person" size={20} color="#413e3e"/>
         </View>
         <View style={styles.sectionStyle}>
          
          <TextInput
            style={{flex: 1,borderRadius: 25,paddingLeft:10}}
            placeholder="Enter Email Address"
            onChangeText={(value) => handleOnChangeText(value,'email')}
            value={values.email}
          
          />
          <Entypo style={styles.imageStyle} name="email" size={20} color="#413e3e" />
         </View>
         <View style={styles.sectionStyle}>
          
          <TextInput
            style={{flex: 1,borderRadius: 25,paddingLeft:10}}
            placeholder="Enter the Card Number"
            onChangeText={(value) => handleOnChangeText(value,'cardholderno')}
            value={values.cardholderno}
          />
          <MaterialIcons style={styles.imageStyle} name="payment" size={20} color="#413e3e" />
         </View>
         <View style={styles.sectionStyle}>
          
          <TextInput
            style={{flex: 1,borderRadius: 25,paddingLeft:10}}
            placeholder="Enter the MM/YY"
            onChangeText={(value) => handleOnChangeText(value,'mmyy')}
            value={values.mmyy}
          
          />
         
         </View>
         <View style={styles.sectionStyle}>
          
          <TextInput
            style={{flex: 1,borderRadius: 25,paddingLeft:10}}
            placeholder="Enter the CVC"
            onChangeText={(value) => handleOnChangeText(value,'cvc')}
            value={values.cvc}
          
          />
         
         </View>
         <View style={styles.sectionStyle}>
          
          <TextInput
            style={{flex: 1,borderRadius: 25,paddingLeft:10}}
            placeholder="Payment Amount"
            onChangeText={(value) => handleOnChangeText(value,'amount')}
            value={values.amount}
            editable={false}
          />
         
         </View>
         <View style={{alignItems:'center',marginTop:40}}>
            <TouchableOpacity style={styles.paymentbutton} onPress={submitPayment} >
              <Text style={styles.paymentText}>Payment</Text>
            </TouchableOpacity>
         </View>
         <Text>{error ? alertMessage() :null}</Text>
       

      </View>
     
      {/* <Button title="Show modal" onPress={toggleModal} /> */}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <View style={{marginTop:-50}}>
          <Ionicons name="checkmark-done-circle" size={80} color="green" />
          </View>
          <Text style={{fontSize:24,fontWeight:'bold',marginBottom:20}}>Awesome!</Text>
          <Text style={styles.modalText}>Your Booking has been confirmed.</Text>
          <Text style={styles.modalText}>Check your Appointments for details.</Text>
          <TouchableOpacity style={styles.successbtn} onPress={toggleModal}>
              <Text style={styles.paymentText}>OK</Text>
          </TouchableOpacity>
          {/* <Button title="Ok" onPress={toggleModal} /> */}
        </View>
      </Modal>
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff',
    padding:20
  },
  card:{
    boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
    width:'90%',
    height:"auto",
    padding:20,
    borderRadius: 25,
    // background: rgb(238,174,202);
    backgroundColor: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
    
  },
  logo:{
    width: 100,
    height: 100,
    borderRadius: 180 / 2,
    boxShadow:' rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    alignSelf:'center',
    top:-40,
    backgroundImage: 'linear-gradient(to right top, #004d61, #015974, #086687, #15739b, #257faf)'
  },
  input:{
    padding:20,
    marginTop:20
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'right',
    alignItems: 'right',
    backgroundColor: '#FFF',
    height: 40,
    borderRadius: 25,
    marginTop:4,
    borderColor: '#fff', borderWidth: 1,
  },
  imageStyle: {
    resizeMode: 'stretch',
    alignItems: 'left',
    marginTop:10,
    marginRight:10
  },
  paymentbutton:{
    width:"100%",
    backgroundColor:"#004d61",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:5,
    marginBottom:40,
  },
  paymentText:{
    color:"#fff",
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
  successbtn:{
    width:"60%",
    backgroundColor:"green",
    alignItems:"center",
    height:38,
    justifyContent:"center",
    marginTop:20
  }
});

export default PaymentScreen;