import React, {useEffect,useState} from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button,TextInput,TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

const PaymentScreen = ({ navigation }) => {
  const [values,setValues]= useState({
    email:'',
    cardholdername:'',
    cardholderno:'',
    mmyy:'',
    cvc:'',
    amount:''
  })
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
    }
  }
  const alertMessage=()=>{
    alert(error)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View  style={styles.logo}> <MaterialIcons  style={ {marginTop:20}}name="payment" size={60} color="#fff" /></View>
      <View style={styles.card}> 
       <View style={{marginTop:44}}>
         
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
          />
         
         </View>
         <View style={{alignItems:'center',marginTop:40}}>
            <TouchableOpacity style={styles.paymentbutton} onPress={submitPayment} >
              <Text style={styles.paymentText}>Payment</Text>
            </TouchableOpacity>
         </View>
         {error ? alertMessage() :null}
       </View> 

      </View>
      
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
    height:460,
    marginTop:-44,
    padding:10,
    
  },
  logo:{
    width: 100,
    height: 100,
    borderRadius: 180 / 2,
    backgroundColor: 'red',
    boxShadow:' rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    alignItems:'center'
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
    borderColor: 'gray', borderWidth: 1,
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
  }
});

export default PaymentScreen;