import React, { useState, useEffect ,useCallback} from 'react';
import { Button, View, Alert, Text,StyleSheet,ScrollView,TouchableOpacity,} from 'react-native';
import { NativeBaseProvider, Box ,Input,Modal} from "native-base";
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome5 } from '@expo/vector-icons'; 
import axios from "axios";

const GetDia = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
      getData();
    });
    const getData=()=>{
    axios.get("http://localhost:3001/Idiagnosed")
    .then((response) => {
       if(response.data.length === 0){
        let count=response.data.length+1;
        setPid(count);
       
       }else {
        setPid(response.data.length + 1)
       }
       
    });
    }
    const [pid,setPid] = useState('');
    const [userInfo, setUserInfo]= useState({
      id:'',
      firstName:'',
      lastName:'',
      emailAddress:'',
      diseaseSym:'',
      contactNo:'',
      address:'',
      country:'',
      state:'',
      pincode:'',
      result:'',
      fileName:''
    })
    const handleOnChangeText =(value,fieldName)=>{
      setUserInfo({...userInfo, [fieldName]: value });
     
    };
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        setUserInfo({...userInfo, fileName: result.file.name ,result: result.uri});
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
      if(!userInfo.firstName.trim() && !userInfo.lastName.trim() && !userInfo.emailAddress.trim()) return updateError("Required all Field",setError)
      if(!userInfo.firstName.trim() || userInfo.firstName.length <3 )return updateError('Invalid First Name !',setError)
      if(!userInfo.lastName.trim() || userInfo.lastName.length < 3)return updateError('Invalid Last Name !' ,setError)
      if(!userInfo.diseaseSym.trim()) return updateError('Enter Disease Sym !' ,setError)
      if(!isValidMobile(userInfo.contactNo))return updateError('Invalid Mobile No !' ,setError)
      if(!userInfo.address.trim())return updateError('Enter Address!' ,setError)
      if(!userInfo.country.trim())return updateError('Enter Country !' ,setError)
      if(!userInfo.state.trim())return updateError('Enter State !' ,setError)
      if(!userInfo.pincode.trim())return updateError('Enter Pincode !' ,setError)
      if(!userInfo.result.trim())return updateError('Enter the Report !' ,setError)
      if(!isValidEmail(userInfo.emailAddress))return updateError("Invalid email",setError)
      
      return true;
     
    }
    const PData={
      id:pid,
      firstName:userInfo.firstName,
      lastName:userInfo.lastName,
      emailAddress:userInfo.emailAddress,
      diseaseSym:userInfo.diseaseSym,
      contactNo:userInfo.contactNo,
      address:userInfo.address,
      country:userInfo.country,
      state:userInfo.state,
      pincode:userInfo.pincode,
      result:userInfo.result,
      fileName:userInfo.fileName
    }
    const handleSave=()=>{
      if(isValidForm()){
        axios.post('http://localhost:3001/Idiagnosed',PData)
        .then(()=>{
          console.log("success")
        });
        setShowModal(true)

      }


    }
   
    const onClose=()=>{
      setUserInfo(
        {...userInfo,
          firstName:'',
          lastName:'',
          emailAddress:'',
          diseasesym:'',
          contactNo:'',
          address:'',
          country:'',
          state:'',
          pincode:'',
          result:'',
          fileName:''
        });
        setShowModal(false)
    }
    
   return (
    <View style={styles.container}>
         <Text style={styles.headerText}> Fill The Information</Text>
    <NativeBaseProvider>
     
      <Box style={styles.form}> 
       {error ? <Text style={{color:'red',textAlign:'center'}}>{error}</Text>:null}
        <View style={styles.input}>
          <Text fontSize="md">First Name</Text>
          <Input placeholder="First Name" value={userInfo.firstName} onChangeText={(value) => handleOnChangeText(value,'firstName')}/>
        </View>
        <View style={styles.input}>
          <Text fontSize="md">Last Name</Text>
          <Input placeholder="Last Name" value={userInfo.lastName} onChangeText={(value) => handleOnChangeText(value,'lastName')}/>
        </View>

        <View style={styles.input}>
          <Text fontSize="md">Diseases Symptoms</Text>
          <Input placeholder="Diseases Symptoms" value={userInfo.diseaseSym} onChangeText={(value) => handleOnChangeText(value,'diseaseSym')}/>
        </View> 
        <View style={styles.input}>
          <Text fontSize="md">Email Address</Text>
          <Input placeholder="Email Address" value={userInfo.emailAddress} onChangeText={(value) => handleOnChangeText(value,'emailAddress')}/>
        </View>
        <View style={styles.input}>
          <Text fontSize="md">Contact No</Text>
          <Input placeholder="Contact No" value={userInfo.contactNo} onChangeText={(value) => handleOnChangeText(value,'contactNo')}/>
        </View>
        <View style={styles.input}>
          <Text fontSize="md">Address</Text>
          <Input placeholder="Address" value={userInfo.address} onChangeText={(value) => handleOnChangeText(value,'address')}/>
        </View>
        <View style={styles.input}>
          <Text fontSize="md">Country</Text>
          <Input placeholder="Country" value={userInfo.country} onChangeText={(value) => handleOnChangeText(value,'country')}/>
        </View>
        <View style={styles.input}>
          <Text fontSize="md">State</Text>
          <Input placeholder="State" value={userInfo.state} onChangeText={(value) => handleOnChangeText(value,'state')}/>
        </View>
       
        <View style={styles.input}>
          <Text fontSize="md">Pincode</Text>
          <Input placeholder="Pincode" value={userInfo.pincode} onChangeText={(value) => handleOnChangeText(value,'pincode')}/>
        </View>
        <View style={styles.input}>
        <TouchableOpacity onPress={pickDocument}  style={styles.appButtonContainer}>
           <Text style={styles.appButtonText}><FontAwesome5 name="file-upload" size={18}  /> Upload Medical Report</Text>
        </TouchableOpacity >
       
        </View>
        {userInfo.fileName}
        <View style={styles.input}>
        <TouchableOpacity>
          <Button
            title="Save"
            color="red"
            onPress={handleSave}
          />
        </TouchableOpacity>
        </View>

      </Box>
     
      <Modal isOpen={showModal} onClose={() => onClose()}>
        <Modal.Content maxWidth="100%">
          <Modal.CloseButton />
          <Modal.Header>Success</Modal.Header>
          <Modal.Body>
            Patient Record Save Successfully !
          </Modal.Body>
        
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
   
    </View>
      
   )
};
export default GetDia;
const styles = StyleSheet.create({
   container:{
    backgroundColor:'#004d61',
    padding:20,
    alignContent:'center',
    justifyContent:'center'
   },
   headerText:{
     color:'#fff',
     alignSelf:'center',
     justifyContent:'center',
     fontSize:20,
     fontWeight:'bold'
   },
   form:{
      width:'100%',
      backgroundColor:'#fff',
      marginTop:20,
      alignSelf:'center',
      padding:20
   },
   input:{
    marginBottom:10,
   },
   view:{
      backgroundColor:'skyblue',
      height:50,
      margin:10,
      alignItems:'center',
     justifyContent:'center',
     flex:1
      
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
  
   },
 }); 