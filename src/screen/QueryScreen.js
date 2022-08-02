import React,{useState,useEffect} from 'react';
import { SafeAreaView,Button, View, Alert , Text,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import { NativeBaseProvider, Box ,Input,Modal} from "native-base";
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome5 } from '@expo/vector-icons'; 
import axios from "axios";
const QueryScreen = ({ navigation }) => {
    const [values,setValues]= useState({
      firstname:'',
      lastname:'',
      query:'',
      report:'',
      reportname:''

    })
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        setValues({...values, reportname: result.file.name ,report: result.uri});
        console.log(result.uri)
    };
    const handleOnChangeText =(value,fieldName)=>{
      setValues({...values, [fieldName]: value });
     
    };
    const updateError =(error,stateUpdate)=>{
      stateUpdate(error);
      setTimeout(()=>{
        stateUpdate('')
      },2500)
    }
  
    const [error,setError]=useState('');
    const isValidForm=()=>{
      if(!values.firstname.trim() && !values.lastname.trim() && !values.query.trim() && !values.report.trim()) return updateError("Required all Field",setError)
      if(!values.firstname.trim() || values.firstname.length <3 )return updateError('Invalid First Name !',setError)
      if(!values.lastname.trim() || values.lastname.length < 3)return updateError('Invalid Last Name !' ,setError)
      if(!values.query.trim()) return updateError('Enter Query !' ,setError)
      if(!values.report.trim()) return updateError('Upload Report !' ,setError)
      return true;
     
    }
    
   
    const submitData=()=>{
      if(isValidForm()){
        console.log("submitData")
        console.log(values)
      }
     

    }
    const alertMessage=()=>{
      alert(error)
    }
  
  return (
    <View style={styles.container}>
      
    <NativeBaseProvider>

      <Box style={styles.form}> 
       <Text style={styles.headerText}> Post Your Health Query Here</Text>
       <View style={styles.input}>
         <Text fontSize="md">Patient First Name</Text>
         <Input placeholder="Patient First Name" value={values.firstname} onChangeText={(value) => handleOnChangeText(value,'firstname')} />
       </View>
       <View style={styles.input}>
         <Text fontSize="md">Patient Last Name</Text>
         <Input placeholder="Patient Last Name" value={values.lastname} onChangeText={(value) => handleOnChangeText(value,'lastname')}/>
       </View>

       <View style={styles.input}>
         <Text fontSize="md">Query</Text>
         <Input placeholder="Query"  value={values.query} onChangeText={(value) => handleOnChangeText(value,'query')}/>
       </View> 
       
       <View style={styles.input}>
         <TouchableOpacity onPress={pickDocument}  style={styles.appButtonContainer}>
             <Text style={styles.appButtonText}><FontAwesome5 name="file-upload" size={18}  /> Upload Medical Report</Text>
         </TouchableOpacity >
       </View>
       {values.reportname}

       {error ? alertMessage() :null}
   <View style={styles.button}>
   <TouchableOpacity >
     <Button
       title="Save"
       color="red"
       onPress={submitData}
     />
   </TouchableOpacity>
   </View>
   
 </Box>


    </NativeBaseProvider>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    width:'100%',
    padding:16,
    backgroundColor:'#004d61',
  },
  headerText:{
   color:'red',
   alignSelf:'center',
   justifyContent:'center',
   fontSize:20,
   fontWeight:'bold',
   marginBottom:20
  },
  form:{
    width:'100%',
    backgroundColor:'#fff',
    marginTop:80,
    padding:20
  },
  input:{
   marginBottom:10,
  },
  view:{
    backgroundColor:'skyblue',
    height:50,
    margin:10,
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
  button:{
    marginTop:26
  },
  upload:{
    height:40,

  }
});

export default QueryScreen;
