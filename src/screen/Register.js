import React ,{useState,useEffect }from 'react';
import { SafeAreaView,TouchableOpacity, Button,View, Alert, Text,StyleSheet,TextInput,Picker, Platform, StatusBar } from 'react-native';
import DatePicker from '@dietime/react-native-date-picker';
import { FontAwesome } from '@expo/vector-icons'; 
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";

const Register = ({ navigation }) => {
  var Tdate = new Date();
  const date = ('0' + Tdate.getDate()).slice(-2);
  const month = ('0' + (Tdate.getMonth() + 1)).slice(-2);
  const year = Tdate.getFullYear();
  const hours = ('0' + Tdate.getHours()).slice(-2);
  const minutes = ('0' + Tdate.getMinutes()).slice(-2);
  const seconds = ('0' + Tdate.getSeconds()).slice(-2);
  const tDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  const [Syear,setSYear] = useState(Tdate.getFullYear()-400);
  const [Eyear,setEYear] = useState(Tdate.getFullYear()+58);
  const [pid,setPid] = useState('');
  const [firstName ,setFirstName] = useState('');
  const [lastName ,setLastName] = useState('');
  const [email ,setEmail] = useState('');
  const [contactNo ,setContactNo] = useState('');
  const [gender ,setGender] = useState('Gender');
  const [password ,setPassword] = useState('');
  const [country ,setCountry] = useState('');
  const [address,setAddress] = useState('');
  const [profilePic ,setProfilePic] = useState('');
  const [profilePicName ,setProfilePicName] = useState('');
  const [birthdate, setBirthDate] = useState(new Date());
  const [birthday, setBirthDay] = useState(new Date());
  const [error,setError]=useState('');
  
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result)
    setProfilePic(result.uri);
    setProfilePicName(result.file.name);
  
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
  const isValidForm=()=>{
      if(!firstName.trim() && !lastName.trim() && !email.trim()) return updateError("Required all Field",setError)
      if(!firstName.trim() || firstName.length <3 )return updateError('Invalid First Name !',setError)
      if(!lastName.trim() || lastName.length < 3)return updateError('Invalid Last Name !' ,setError)
      if(!password.trim()) return updateError('Enter Password !' ,setError)
      if(gender === 'Gender' ) return updateError('Select Gender !' ,setError)
      if(!isValidMobile(contactNo))return updateError('Invalid Mobile No !' ,setError)
      if(!address.trim())return updateError('Enter Address!' ,setError)
      if(!country.trim())return updateError('Enter Country !' ,setError)
      if(!profilePic.trim())return updateError('Upload Profile Pic !' ,setError)
      if(!isValidEmail(email))return updateError("Invalid email",setError)
      
      return true;
     
  }
  useEffect(() => {
    getData();
  });
  const getData=()=>{
    axios.get("http://localhost:3001/Register")
     .then((response) => {
      console.log(response)
     if(response.data.length === 0){
      let count=response.data.length+1;
      setPid(count);
     
     }else {
      let data=response.data[response.data.length - 1];
      setPid(data.id+1)
     }
    });
  }
  const RegisterData={
    id:pid,
    firstName:firstName,
    lastName:lastName,
    email:email,
    contactNo:contactNo,
    gender:gender,
    password:password,
    country:country,
    address:address,
    profilePic:profilePic,
    profilePicName:profilePicName,
    birthDate:birthday,
    registerDate:tDateTime,
   
  }
  const handleSave=()=>{
    
      if(isValidForm()){
        axios.post('http://localhost:3001/Register',RegisterData)
        .then(()=>{
          console.log("success")
          console.log(RegisterData)
          alert("Record Save SuccessFully !");
          onClose();
          navigation.navigate('PatientLogin');
        });
        
       
        
      }


  }
  const handleGet=()=>{
    console.log("success")
  }
  const onClose=()=>{
    setFirstName('');
    setLastName('');
    setEmail('');
    setContactNo('');
    setGender('Gender');
    setPassword('');
    setCountry('');
    setAddress('');
    setProfilePic('');
    setProfilePicName('');
  
  }
  const onDateChange=(date)=>{
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
 
    const today = yyyy + '-' + mm + '-' + dd;
    setBirthDay(today)
   
  }
   return (
    <View style = {styles.container}>
      <Text style={styles.text} >Patient Register </Text>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="First Name..." 
            placeholderTextColor="#A9A9A9"
            onChangeText={newText => setFirstName(newText)}
            value={firstName}
            // onChangeText={text => this.setState({email:text})}
            />
            
      </View>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Last Name..." 
            placeholderTextColor="#A9A9A9"
            onChangeText={newText => setLastName(newText)}
            value={lastName}
            // onChangeText={text => this.setState({email:text})}
            />
            
      </View>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#A9A9A9"
            onChangeText={newText => setEmail(newText)}
            value={email}
            // onChangeText={text => this.setState({email:text})}
            />
            
      </View>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Contact..." 
            placeholderTextColor="#A9A9A9"
            onChangeText={newText => setContactNo(newText)}
            value={contactNo}
            // onChangeText={text => this.setState({email:text})}
            />
            
      </View>
      <View style={styles.inputView} >
          <Picker style={styles.picker}  selectedValue={gender} onValueChange={(itemValue, itemIndex) => setGender(itemValue)} >
            <Picker.Item style={styles.pickerItem} label="Gender" value="Gender.."/>
            <Picker.Item style={styles.pickerItem} label="Male" value="Male"/>
            <Picker.Item style={styles.pickerItem} label="Female" value="Female"/>
            <Picker.Item style={styles.pickerItem} label="Other" value="Other"/>
          </Picker>
            
      </View>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            secureTextEntry={true}
            placeholder="Password..." 
            placeholderTextColor="#A9A9A9"
            onChangeText={newText => setPassword(newText)}
            value={password}
            // onChangeText={text => this.setState({email:text})}
            />
            
      </View>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Country..." 
            placeholderTextColor="#A9A9A9"
            onChangeText={newText => setCountry(newText)}
            value={country}
            // onChangeText={text => this.setState({email:text})}
            />
            
      </View>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Address..." 
            placeholderTextColor="#A9A9A9"
            onChangeText={newText => setAddress(newText)}
            value={address}
            // onChangeText={text => this.setState({email:text})}
            />
            
      </View>
      <TouchableOpacity onPress={pickDocument}  style={styles.appButtonContainer}>
           <Text style={styles.appButtonText}><FontAwesome name="photo" size={18} /> Upload Profile Photo</Text>
      </TouchableOpacity >
      <Text>{profilePicName}</Text>
      <View style={{width:'100%',padding:20,marginTop:-20}} >
      <Text style={{color:'#A9A9A9',alignSelf:'center',paddingTop:20}}>{birthdate ? "Birth Date :" + birthdate.toDateString() : "Select Birth Date..."}</Text>
        <DatePicker
          startYear={Syear}
          endYear={Eyear}
          value={birthdate}
          onChange={(value) => onDateChange(value)}
          format="yyyy-mm-dd"
          width='100%'
          markColor='#A9A9A9'
          fadeColor='#fff'
          textColor="#fff"
        />   
      </View>
      
      {error ? <Text style={{color:'red',textAlign:'center'}}>{error}</Text>:null}
            
      <TouchableOpacity style={styles.loginBtn} onPress={handleSave} >
          <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
   
    </View>
   );
};
export default Register;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputView:{
    width:"80%",
    backgroundColor:"#F5F5F5",
    borderRadius:25,
    height:50,
    marginBottom:12,
    justifyContent:"center",
   
  },
  inputText:{
    borderRadius:25,
    height:50,
    padding:20,
    color:'#A9A9A9'
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#004d61",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:5,
    marginBottom:40,
  },
  loginText:{
   color:"#fff",
   fontWeight:'bold'

  },
  picker:{
    borderRadius:25,
    height:50,
    paddingLeft:16,
    paddingRight:16,
    backgroundColor:"#F5F5F5",
    borderColor:'#F5F5F5',
    color:'#A9A9A9'
  },
 
  text: {
    color:'red',
    fontSize: '30px',
    fontWeight:'bold',
    marginBottom:20
   },
   appButtonContainer: {
    elevation: 8,
    backgroundColor: "#004d61",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom:20,
    width:'80%'
   },
   appButtonText: {
    color: "#fff",
    alignSelf: "center",
  
   },
  
 
 });
 