import React,{useState,useEffect} from 'react';
import { SafeAreaView,Button, View, Alert , Text,StyleSheet,CheckBox,TouchableOpacity} from 'react-native';
import { NativeBaseProvider, Box ,Input} from "native-base";
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome5 } from '@expo/vector-icons'; 
import axios from "axios";
import { Rating, AirbnbRating } from 'react-native-ratings';
import RadioForm from 'react-native-simple-radio-button';
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';
const FeedBack = () => {
    const [values,setValues]= useState({
        title:'',
        review:'',
    })
    const [rates,setRates]= useState('Yes');
    const [drintraction,setDrintraction]= useState('Yes');
    const [furtherTre,setFurtherTre]= useState('Yes');
    const [isSelected, setSelection] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    var radio_props = [
      {label: 'Yes', value: 'Yes' },
      {label: 'No', value: 'No' }
    ];
   
    const handleOnChangeText =(value,fieldName)=>{
        setValues({...values, [fieldName]: value });
       
    };
    const updateError =(error,stateUpdate)=>{
        stateUpdate(error);
        setTimeout(()=>{
          stateUpdate('')
        },2500)
    }
  
    const ratingCompleted=(rating)=> {
      setRates(rating);
    }
    const [error,setError]=useState('');
    const isValidForm=()=>{
      if(!values.title.trim() && !values.review.trim()) return updateError("Required all Field",setError)
      if(!values.title.trim())return updateError('Enter Title !',setError)
      if(!values.review.trim())return updateError('Enter Review !' ,setError)
      if(!isSelected) return updateError('Accept Terms!' ,setError)
      return true;
    }
    const data={
      title:values.title,
      review:values.review,
      drintraction:drintraction,
      furtherTre:furtherTre,
      isSelected:isSelected,
      rates:rates
    }
    const submitData=()=>{
      if(isValidForm()){
        setModalVisible(!isModalVisible);
      }
    }
    const alertMessage=()=>{
        alert(error)
    }
    const toggleModal = () => {
      console.log(data)
      setModalVisible(!isModalVisible);
    };
   
  return (
    <View style={styles.container}>
      <NativeBaseProvider>

       <Box style={styles.form}>
       
         <Text style={styles.headerText}> Give Your Feedback</Text>
         <View style={styles.input}>
         <Text fontSize="md" >Review</Text>
         <View style={{marginTop:-34}}>
         <AirbnbRating count={5} defaultRating={0} reviewSize={10} size={12} onFinishRating={ratingCompleted}/>
         </View>
         </View>
         <View style={styles.input}>
            <Text fontSize="md">Title of your review</Text>
            <Input placeholder="Title of your review" value={values.title} onChangeText={(value) => handleOnChangeText(value,'title')}/>
         </View>

         <View style={styles.input}>
            <Text fontSize="md">Your review</Text>
            <Input placeholder="Your review"  value={values.review} onChangeText={(value) => handleOnChangeText(value,'review')}/>
         </View> 
 
          <View style={styles.input}>
          
             <Text fontSize="md" style={{marginBottom:20}}>Were you satisfied with Doctors interaction & response to your queries?</Text>
             <RadioForm buttonSize={6} labelStyle={{ paddingRight:30,marginTop:-1}} radio_props={radio_props} initial={0} onPress={(value) => {setDrintraction(value)}} formHorizontal={true}/>
          </View>
          <View style={styles.input}>
         
             <Text fontSize="md" style={{marginBottom:20}}>Would you like to explore further treatment with the same doctor?</Text>
             <RadioForm buttonSize={6} labelStyle={{ paddingRight:30,marginTop:-1}} radio_props={radio_props} initial={0} onPress={(value) => {setFurtherTre(value)}} formHorizontal={true}/>
          </View>
   
          <View style={{  flexDirection: "row",marginBottom: 20,}}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={{marginTop:-2}} > I have read and accept <TouchableOpacity><Text style={{color:'red'}}>Terms & Conditions</Text></TouchableOpacity></Text>
          </View> 
          <View style={styles.button}>
           <TouchableOpacity >
             <Button title="Add Review" color="red" onPress={submitData}/>
           </TouchableOpacity>
          </View>
          {error ? alertMessage() :null}
       </Box>
      </NativeBaseProvider>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <View style={{marginTop:-50}}>
          <Ionicons name="checkmark-done-circle" size={80} color="green" />
          </View>
          <Text style={{fontSize:24,fontWeight:'bold',marginBottom:20}}>Awesome!</Text>
          <Text style={styles.modalText}>Your FeedBack has been saved.</Text>
         
          <TouchableOpacity style={styles.successbtn} onPress={toggleModal}>
              <Text style={{ color:"#fff",fontWeight:'bold'}}>OK</Text>
          </TouchableOpacity>
          {/* <Button title="Ok" onPress={toggleModal} /> */}
        </View>
      </Modal>
    </View>
  )
}

export default FeedBack;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor:'#004d61',
    padding:16,
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
  button:{
    marginTop:12
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

})