import React,{useEffect , useState} from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import axios from "axios"; 
import { Button } from "@react-native-material/core";
import { HStack } from "@react-native-material/core";


const MyTrips = () => {
   const user = JSON.parse(localStorage.getItem('LoginUser'));
   const [mytrips, setMytrip] = useState([]);
   const [showDetails, setShowDetails] = useState(true);
   useEffect(() => {
      axios.get("http://localhost:3001/trips")
      .then((response) => {
        const data = response.data;
        setMytrip(data);
     
      });
     
   }, []);
   const filterData = mytrips.filter( data => {
    if(data.pid === user.id && data.packagestatus === "Yes"){
      return data.pid===user.id && data.packagestatus === "Yes";
    }
 
   })
  return (
    <SafeAreaView style={{backgroundColor:'#fff',flex:1}}>
     {filterData.map(data =>
      <View key={data.id}>
        <View style={styles.view}>
          <View style={[styles.container, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "row"
              }]}>
                <View style={{ flex: 1, padding:20,alignItems:'center'}} >
                  <Text style={{color:'#413E3E',fontWeight:'400',fontSize:18}}>Trip Id - {data.id} -<Text style={{color:'#8601AF',fontWeight:'bold'}}>{data.selectpackage} Package</Text> Treatment With - 

                  <Text style={{color:"#00C0F0"}}>{data.doctorname}</Text> Date Starting From -<Text style={{color:'#00C0F0'}}>{data.fromdate}</Text>  To <Text style={{color:'#00C0F0'}}>{data.todate}</Text></Text>
                </View>
                
          </View>
          
          <View style={showDetails && {display:'none'}}>
            <View style={styles.details}>
         
            <HStack m={4} spacing={6}>
              <View style={{ width: 200, height: 40}} >
                <Text style={styles.heading}>Hospital Name</Text>
                
              </View>
              <View style={{flex:1,height: 40}} >
                <Text>{data.hospitalname}</Text>
              </View>
             
            </HStack>
            <HStack m={4} spacing={6}>
              <View style={{ width: 200, height: 40}} >
                <Text style={styles.heading}>Package Name</Text>
                
              </View>
            
              <View style={{ flex:1, height: 40}} >
                <Text>{data.selectpackage}</Text>
              </View>
             
            </HStack>
            <HStack m={4} spacing={6}>
              <View style={{ width: 200, height: 40}} >
                <Text style={styles.heading}>Treatment Charges</Text>
                
              </View>
              <View style={{ flex:1, height: 40}} >
                <Text>{data.htc}</Text>
              </View>
             
            </HStack>
            <HStack m={4} spacing={6}>
              <View style={{ width: 200, height: 40}} >
                <Text style={styles.heading}>EHF-Service Charges</Text>
                
              </View>
              <View style={{ flex:1, height: 40}} >
                <Text>{data.hhfsc}</Text>
              </View>
             
            </HStack>
            <HStack m={4} spacing={6}>
              <View style={{ width: 200, height: 40}} >
                <Text style={styles.heading}>Package Description</Text>
                
              </View>
              <View style={{ flex:1, height: 40}} >
                <Text>{data.pd}</Text>
              </View>
             
            </HStack>
            <HStack m={4} spacing={6}>
              <View style={{ width: 200, height: 40}} >
                <Text style={styles.heading}>Payment Type</Text>
                
              </View>
              <View style={{ flex:1, height: 40}} >
                <Text>{data.paymenttype}</Text>
              </View>
             
            </HStack>
            <HStack m={4} spacing={6}>
              <View style={{ width: 200, height: 40}} >
                <Text style={styles.heading}>Paid Amount</Text>
                
              </View>
              <View style={{ flex:1, height: 40}} >
                <Text>{data.ehfpa}</Text>
              </View>
             
            </HStack>
            <HStack m={4} spacing={6}>
              <View style={{ width: 200, height: 40}} >
                <Text style={styles.heading}>Payment Status</Text>
                
              </View>
              <View style={{ flex:1, height: 40}} >
                <Text>{data.paymentstatus}</Text>
              </View>
             
            </HStack>
            </View>
          </View>
          {showDetails ? <Button title="View Details" color='#F94892' tintColor="#fff" onPress={()=>setShowDetails(!showDetails)}/>: <Button title="Hide Details" color='#F94892' tintColor="#fff" onPress={()=>setShowDetails(!showDetails)}/>}
         
 
        </View>  
      </View>
       )
      }
      
    </SafeAreaView>
  )
}

export default MyTrips

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
   
  },
  view:{
    margin:8, 
    boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',
   
  },
  details:{
    margin:8, 
    boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    flex:1,
    padding:10
    
  },
  heading:{
    color:'#413E3E',
    fontWeight:"bold"
  }
})