import React,{useEffect,useState} from 'react';
import { StyleSheet, View, Text, Button,TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Box ,Input} from "native-base";
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome5 } from '@expo/vector-icons'; 
const PatientForm = ({ navigation, route }) => {
    const [values,setValues]= useState({
       reason:'',
       healthissue:'',
       prevhistory:'',
       currmedications:'',
       pastmedications:'',
       labtestperformed:'',
       report:'',
       reportname:''
    })
    useEffect(() => {
      console.log(route.params)
    }, []);
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        setValues({...values, reportname: result.file.name ,report: result.uri});
        console.log(result.uri);
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
       if(!values.reason.trim() || !values.healthissue.trim() || !values.prevhistory.trim() ) return updateError("Required  Field",setError)
      
       return true;
   
    }
  
    const submitData=()=>{
      if(isValidForm()){
        console.log("submitData")
        console.log(values)
        navigation.navigate('Payment Form',{slot:route.params,patientform:values})
      }
     
    }
    const alertMessage=()=>{
      alert(error)
    }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Fill The Information</Text>
    <NativeBaseProvider>
      <Box style={styles.form}> 
        <View style={styles.input}>
          <Text fontSize="md">Reason of booking appointment</Text>
          <Input placeholder="Reason of booking appointment" value={values.reason} onChangeText={(value) => handleOnChangeText(value,'reason')}/>
        </View>
        <View style={styles.input}>
          <Text fontSize="md">More details about the presenting complaint</Text>
          <Input placeholder="Provide Details such as duration of the health issue" value={values.healthissue} onChangeText={(value) => handleOnChangeText(value,'healthissue')}/>
        </View>
        <View style={styles.input}>
          <Text fontSize="md">Previous history of the same issue (if any)</Text>
          <Input placeholder="Anwser" value={values.prevhistory} onChangeText={(value) => handleOnChangeText(value,'prevhistory')}/>
        </View>

        <View style={styles.input}>
          <Text fontSize="md">Current medications</Text>
          <Input placeholder="Anwser" value={values.currmedications} onChangeText={(value) => handleOnChangeText(value,'currmedications')}/>
        </View> 
        <View style={styles.input}>
          <Text fontSize="md">Past medications of the same issue</Text>
          <Input placeholder="Anwser" value={values.pastmedications} onChangeText={(value) => handleOnChangeText(value,'pastmedications')}/>
        </View>
        <View style={styles.input}>
          <Text fontSize="md">Lab tests performed</Text>
          <Input placeholder="Anwser" value={values.labtestperformed} onChangeText={(value) => handleOnChangeText(value,'labtestperformed')}/>
        </View>
        <View style={styles.input}>
        <TouchableOpacity onPress={pickDocument}  style={styles.appButtonContainer}>
           <Text style={styles.appButtonText}><FontAwesome5 name="file-upload" size={18}  /> Upload Medical Report</Text>
        </TouchableOpacity >
       
        </View>
        {values.reportname}
        
        <View style={styles.button}>
        <TouchableOpacity  >
          <Button
            title="Save"
            color="red"
            onPress={submitData}
          />
        </TouchableOpacity>
        </View>
       

        {error ? alertMessage() :null}
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
   color:'#fff',
   alignSelf:'center',
   justifyContent:'center',
   fontSize:20,
   fontWeight:'bold'
  },
  form:{
    width:'100%',
    backgroundColor:'#fff',
    marginTop:10,
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
  }
});

export default PatientForm;