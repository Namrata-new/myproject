import React, { useState ,useEffect} from 'react';
import { SafeAreaView,TouchableOpacity, Button,View, Alert, Text,StyleSheet,TextInput } from 'react-native';
import axios from "axios";

const Login = ({ navigation }) => {
  const [pid,setPid] = useState('');
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState('');
  const [error,setError]= useState('');
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
  useEffect(() => {
    getData();
  });
  const getData=()=>{
    axios.get("http://localhost:3001/Register")
     .then((response) => {
     if(response.data.length === 0){
      let count=response.data.length+1;
      setPid(count);
     
     }else {
      setPid(response.data.length + 1)
      
     }
     
    });
  }
  const isValidForm=()=>{
    if(!email.trim() && !passwords.trim()) return updateError("Required all Field",setError)
    if(!email.trim()) return updateError('Enter Email !' ,setError)
    if(!passwords.trim()) return updateError('Enter Password !' ,setError)
    if(!isValidEmail(email))return updateError("Invalid email",setError)
    
    return true;
   
  }
  const handleClick=()=>{
    if(isValidForm()){
      axios.get("http://localhost:3001/Register")
     .then((response) => {
         console.log(response.data) 
         var Tdate = new Date();
         const date = ('0' + Tdate.getDate()).slice(-2);
         const month = ('0' + (Tdate.getMonth() + 1)).slice(-2);
         const year = Tdate.getFullYear();
         const hours = ('0' + Tdate.getHours()).slice(-2);
         const minutes = ('0' + Tdate.getMinutes()).slice(-2);
         const seconds = ('0' + Tdate.getSeconds()).slice(-2);
         const tDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
         {response.data.map((value)=>{
          
           if(value.email === email && value.password === passwords){
              alert("Login SuccessFull !")
              // axios.post('http://localhost:3001/loginUser',{
              //   id:value.id,
              //   username:value.email,
              //   password:value.password,
              //   logindate: tDateTime,
              //   logoutdate: tDateTime,

              // })
              // .then(()=>{
              //   console.log("success")
              
              // });
              localStorage.setItem('LoginUser', JSON.stringify(value));
              navigation.navigate('Sidebar');
           }
         })}
     });
    }
    // if(email==='' && passwords===''){
    //   setError('Enter the email and Password')
    // }else if(email.length > 4 && passwords.length > 4){
    //   setError('')
    // }
    // else{
    //  navigation.navigate('Sidebar')
    // }
    
  }
   return (
    <View style = {styles.container}>
      <Text style={styles.text} >Patient Login </Text>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#A9A9A9"
            value={email}
            onChangeText={newText => setEmail(newText)}
          />
          
      </View>
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            secureTextEntry={true}
            placeholder="Password..." 
            placeholderTextColor="#A9A9A9"
            value={passwords}
            onChangeText={newText => setPasswords(newText)}
            // onChangeText={text => this.setState({email:text})}
          />    
      </View>
      <View >
        <Text style={styles.errorText} >{error} </Text>     
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleClick}>
          <Text style={styles.loginText}>SIGN IN</Text>
      </TouchableOpacity>
      <View >
        <Text >Forgot Password ? </Text>     
      </View>
   
    </View>
   );
};
export default Login;
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
    marginBottom:20,
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
    marginTop:20,
    marginBottom:10
  },
  loginText:{
   color:"#fff",
   fontWeight:'bold'

  },
  text: {
    color:'red',
    fontSize: '30px',
    fontWeight:'bold',
    marginBottom:20
   },
   errorText: {
    color:'red'
   }
  
 
});
 