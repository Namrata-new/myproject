import React, { useState, useEffect } from 'react';
import { Button, View, Alert, TouchableOpacity,Text,StyleSheet,ScrollView,Image} from 'react-native';
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
import { NativeBaseProvider, Box ,Input,Modal} from "native-base"; 
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

const PatientProfile = ({ navigation }) => {
   const user = JSON.parse(localStorage.getItem('LoginUser'));
   const [showEdit , setShowEdit] = useState(false);
   const onEditClick=()=>{
     setShowEdit(true);
   }
   const [values , setValues] = useState({
     id:user.id,
     firstname:user.firstname,
     lastname:user.lastname,
     email:user.email,
     contactno:user.contactno,
     gender:user.gender,
     password:user.password,
     country:user.country,
     address:user.address,
     profilepic:user.profilepic,
     profilepicname:user.profilepicname
   })
   const handleOnChangeText =(value,fieldName)=>{
    setValues({...values, [fieldName]: value });
   };
   const handleSave=()=>{
     const id= user.id;
     axios.put("http://localhost:3001/updateProfile",values).then((response)=>{
         alert("update ")
         axios.get("http://localhost:3001/Register").then((response)=>{
            {response.data.map((value)=>{
              if(value.id === id){
                localStorage.setItem('LoginUser', JSON.stringify(value));
              }
            })}
        //  localStorage.setItem('LoginUser', JSON.stringify(value));
        })
        //  localStorage.setItem('LoginUser', JSON.stringify(value));
     })
     
   }
   const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setValues({...values, profilepicname: result.file.name ,profilepic: result.uri});
   };
   return (
    // <View >
    //     {showEdit ?
    //     (
          // <View style={styles.container}>
          //   <NativeBaseProvider >
          //   <Box style={styles.form}> 
          //     <View style={styles.input} >
          //       <Text fontSize="md">First Name</Text>
          //       <Input placeholder="First Name" value={values.firstname} onChangeText={(value) => handleOnChangeText(value,'firstname')}/>
          //     </View>
          //     <View style={styles.input} >
          //       <Text fontSize="md">Last Name</Text>
          //       <Input placeholder="Last Name" value={values.lastname} onChangeText={(value) => handleOnChangeText(value,'lastname')}/>
          //     </View>
          //     <View style={styles.input} >
          //       <Text fontSize="md">Email Address</Text>
          //       <Input placeholder="Email Address" value={values.email} onChangeText={(value) => handleOnChangeText(value,'email')}/>
          //     </View>
          //     <View style={styles.input} >
          //       <Text fontSize="md">Contact No</Text>
          //       <Input placeholder="Contact No" value={values.contactno} onChangeText={(value) => handleOnChangeText(value,'contactno')}/>
          //     </View>
          //     <View style={styles.input} >
          //       <Text fontSize="md">Gender</Text>
          //       <Input placeholder="Gender" value={values.gender} onChangeText={(value) => handleOnChangeText(value,'gender')}/>
          //     </View>
          //     <View style={styles.input} >
          //       <Text fontSize="md">Password</Text>
          //       <Input placeholder="Password" value={values.password} onChangeText={(value) => handleOnChangeText(value,'password')}/>
          //     </View>
          //     <View style={styles.input} >
          //       <Text fontSize="md">Country</Text>
          //       <Input placeholder="Country" value={values.country} onChangeText={(value) => handleOnChangeText(value,'country')}/>
          //     </View>
          //     <View style={styles.input} >
          //       <Text fontSize="md">Address</Text>
          //       <Input placeholder="Address" value={values.address} onChangeText={(value) => handleOnChangeText(value,'address')}/>
          //     </View>
          //     <View style={styles.input}>
          //       <TouchableOpacity onPress={pickDocument}  style={styles.appButtonContainer}>
          //         <Text style={styles.appButtonText}><FontAwesome5 name="file-upload" size={18}  /> Upload Profile Pic</Text>
          //       </TouchableOpacity >
          //     </View>
          //     {values.profilepicname}
          //     <View >
          //     <TouchableOpacity>
          //       <Button
          //         title="Save"
          //         color="red"
          //         onPress={handleSave}
          //       />
          //     </TouchableOpacity>
          //     </View>
      
          //   </Box>
           
           
          // </NativeBaseProvider>
          // </View>
    //     ) :
    //     <View style={styles.firstcontainer}>
    //     <ScrollView  >
    //     <View  >
    //        <Image style={styles.logo} source={{uri: user.profilepic}}/>
    //     </View>
    //     <View style={styles.info}>
    //     <View style={styles.infomation}>
    //         <Text style={styles.label}>First Name :</Text>
    //         <Text>{user.firstname}</Text>
    //     </View>
    //     <View style={styles.infomation}>
    //         <Text style={styles.label}>Last Name :</Text>
    //         <Text>{user.lastname}</Text>
    //     </View>
    //     <View style={styles.infomation}>
    //         <Text style={styles.label}>Email Address :</Text>
    //         <Text>{user.email}</Text>
    //     </View>
    //     <View style={styles.infomation}>
    //         <Text style={styles.label}>Contact No :</Text>
    //         <Text>{user.contactno}</Text>
    //     </View>
    //     <View style={styles.infomation}>
    //         <Text style={styles.label}>Gender :</Text>
    //         <Text>{user.gender}</Text>
    //     </View>
    //     <View style={styles.infomation}>
    //         <Text style={styles.label}>Country :</Text>
    //         <Text>{user.country}</Text>
    //     </View>
    //     <View style={styles.infomation}>
    //         <Text style={styles.label}>Address :</Text>
    //         <Text>{user.address}</Text>
    //     </View>
    //     <View style={styles.view}>
    //         <TouchableOpacity  style={styles.appButtonContainer} onPress={onEditClick}>
    //         <Text style={styles.appButtonText}><Entypo name="edit" size={12} color="#fff" /> Edit</Text>
    //         </TouchableOpacity>
    //     </View>
       
    //     </View>
    //     </ScrollView>
    //     </View>}
    // </View>
    <View style = {styles.fcontainer}>
      {showEdit ?       
          <View style={styles.container}>
            <View style={{padding:0}}> 
             <Ionicons name="chevron-back-circle-sharp" size={24} color="#fff" onPress={()=>setShowEdit(false)} />
            </View>
            <NativeBaseProvider >
            <Box style={styles.form}> 
          
              <View style={styles.input} >
                <Text fontSize="md">First Name</Text>
                <Input placeholder="First Name" value={values.firstname} onChangeText={(value) => handleOnChangeText(value,'firstname')}/>
              </View>
              <View style={styles.input} >
                <Text fontSize="md">Last Name</Text>
                <Input placeholder="Last Name" value={values.lastname} onChangeText={(value) => handleOnChangeText(value,'lastname')}/>
              </View>
              <View style={styles.input} >
                <Text fontSize="md">Email Address</Text>
                <Input placeholder="Email Address" value={values.email} onChangeText={(value) => handleOnChangeText(value,'email')}/>
              </View>
              <View style={styles.input} >
                <Text fontSize="md">Contact No</Text>
                <Input placeholder="Contact No" value={values.contactno} onChangeText={(value) => handleOnChangeText(value,'contactno')}/>
              </View>
              <View style={styles.input} >
                <Text fontSize="md">Gender</Text>
                <Input placeholder="Gender" value={values.gender} onChangeText={(value) => handleOnChangeText(value,'gender')}/>
              </View>
              <View style={styles.input} >
                <Text fontSize="md">Password</Text>
                <Input placeholder="Password" value={values.password} onChangeText={(value) => handleOnChangeText(value,'password')}/>
              </View>
              <View style={styles.input} >
                <Text fontSize="md">Country</Text>
                <Input placeholder="Country" value={values.country} onChangeText={(value) => handleOnChangeText(value,'country')}/>
              </View>
              <View style={styles.input} >
                <Text fontSize="md">Address</Text>
                <Input placeholder="Address" value={values.address} onChangeText={(value) => handleOnChangeText(value,'address')}/>
              </View>
              <View style={styles.input}>
                <TouchableOpacity onPress={pickDocument}  style={styles.appButtonContainer}>
                  <Text style={styles.appButtonText}><FontAwesome5 name="file-upload" size={18}  /> Upload Profile Pic</Text>
                </TouchableOpacity >
              </View>
              {values.profilepicname}
              <View >
              <TouchableOpacity>
                <Button
                  title="Save"
                  color="red"
                  onPress={handleSave}
                />
              </TouchableOpacity>
              </View>
      
            </Box>
           
           
          </NativeBaseProvider>
          </View> : 
      <ScrollView > 
        <View style={{alignItems:'center'}}><Image style={styles.logo} source={{uri: user.profilepic}}/></View>
        <View>
           <View style={[styles.info, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 6,borderStyle: 'dotted',borderRightColor:'#D0D0D0', borderRightWidth: 1,}} >
                  <View style={{paddingLeft:14}}>
                    <Text style={styles.label}>First Name </Text>
                  </View>
                 
               </View>
               <View style={{ flex: 6 }} >
                  <View style={{paddingLeft:14}}>
                    <Text>{user.firstname}</Text>
                  </View>
                 
               </View>            
               
           </View>
           
           <View style={[styles.info, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 6,borderStyle: 'dotted',borderRightColor:'#D0D0D0', borderRightWidth: 1,}} >
                  <View style={{paddingLeft:14}}>
                   <Text style={styles.label}>Last Name :</Text>
                  </View>
               </View>
               <View style={{ flex: 6 }} >
                  <View style={{paddingLeft:14}}>
                    <Text>{user.lastname}</Text>
                  </View>
                  
               </View>            
               
           </View>
           <View style={[styles.info, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 6,borderStyle: 'dotted',borderRightColor:'#D0D0D0', borderRightWidth: 1,}} >
                 <View style={{paddingLeft:14}}>
                   <Text style={styles.label}>Email Address :</Text>
                 </View>
          
               </View>
               <View style={{ flex: 6}} >
                 <View style={{paddingLeft:14}}>
                   <Text>{user.email}</Text>
                 </View>
              
               </View>            
               
           </View>
           <View style={[styles.info, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 6,borderStyle: 'dotted',borderRightColor:'#D0D0D0', borderRightWidth: 1,}} >
                  <View style={{paddingLeft:14}}>
                     <Text style={styles.label}>Contact No :</Text>
                  </View>
               </View>
               <View style={{ flex: 6}} >
                  <View style={{paddingLeft:14}} >
                     <Text>{user.contactno}</Text>
                  </View>
              
               </View>            
               
           </View>
           <View style={[styles.info, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 6,borderStyle: 'dotted',borderRightColor:'#D0D0D0', borderRightWidth: 1,}} >
                 <View style={{paddingLeft:14}}>
                    <Text style={styles.label}>Gender :</Text>
                 </View>
               </View>
               <View style={{ flex: 6}} >
                 <View style={{paddingLeft:14}}>
                    <Text>{user.gender}</Text>
                 </View>
               
               </View>            
               
           </View>
           <View style={[styles.info, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 6,borderStyle: 'dotted',borderRightColor:'#D0D0D0', borderRightWidth: 1,}} >
                  <View style={{paddingLeft:14}}>
                     <Text style={styles.label}>Country :</Text>
                  </View>
               </View>
               <View style={{ flex: 6}} >
                  <View style={{paddingLeft:14}}>
                     <Text>{user.country}</Text>
                  </View>
              
               </View>            
               
           </View>
           <View style={[styles.info, {
               // Try setting `flexDirection` to `"row"`.
               flexDirection: "row"
             }]}>
               <View style={{ flex: 6,borderStyle: 'dotted',borderRightColor:'#D0D0D0', borderRightWidth: 1,}} >
                 <View style={{paddingLeft:14}}>
                   <Text style={styles.label}>Address :</Text> 
                 </View>
               
      
               </View>
               <View style={{ flex: 6}} >
                  <View style={{paddingLeft:14}}>
                     <Text>{user.address}</Text>
                  </View>
              
               </View>            
               
           </View>
           <View style={styles.view}>
               <TouchableOpacity  style={styles.appButtonContainer} onPress={onEditClick}>
                <Text style={styles.appButtonText}><Entypo name="edit" size={12} color="#fff" /> Edit</Text>
               </TouchableOpacity>
           </View>
        </View>
      </ScrollView>}
       
    </View>
    
   )
};
export default PatientProfile;
const styles = StyleSheet.create({
  fcontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  view:{
    //   backgroundColor:'skyblue',
    height:50,
    margin:10,
    alignItems:'center',
    justifyContent:'center',
    marginTop:20
      
  },
  info:{
    // backgroundColor:"#87CEEB",
    marginTop:20,
  
    backgroundColor:'#fff',
    
  },
  infomation:{
    alignItems:'center',
    flexDirection:"row",
    justifyContent:"space-around",
  },
  label: {
    color:'#413E3E',
    fontWeight:"bold",
    fontSize:14
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius:40
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
  form:{
    width:'100%',
    backgroundColor:'#fff',
    marginTop:0,
    alignSelf:'center',
    padding:20
  },
    container:{
        backgroundColor:'#004d61',
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:20,
        alignContent:'center',
        justifyContent:'center',
        flex:1
        
    },
    input:{
        marginBottom:10,
    },
 });