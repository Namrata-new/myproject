import React,{useEffect,useState} from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, TouchableOpacity,Pressable } from 'react-native';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import axios from "axios";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

const SelectDateTime = ({ navigation,route }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [slotsData ,setSlotsData]= useState([]);
    const [apptbookslot ,setApptBookSlot]= useState([]);
    const user = JSON.parse(localStorage.getItem('LoginUser'));
    useEffect(() => {
      axios.get(`http://localhost:3001/slots`)
       .then(res => {
          const data = res.data;
          setSlotsData(data) 
      })
     
    }, []);

    const handleChange = (e) => {
      setIsOpen(!isOpen);
      setStartDate(e);
     
    };
    const showSlot=()=>{
      const selectdate=format(startDate, "yyyy-MM-dd")
      
      axios.get(`http://localhost:3001/appointments`)
      .then(res => {
         const data = res.data;
         let arr = [];
         data.some(data => {
          if (data.appointmentdate === selectdate && data.hospitalid===route.params.hospitalid && data.doctorid===route.params.doctor.id && data.pid === user.id) {
            console.log(data.slottime)
            arr.push(data.slottime);
        
          }
        
         });
         setApptBookSlot(arr);
        //  setApptBookSlot(data) 
        // console.log(arr)
        //  console.log(data.some(data => data.id === 1));
     })
    
      setIsShow(true);
    }
    const handleClick = (e) => {
      e.preventDefault();
      setIsOpen(!isOpen);
      setIsShow(false);
    };
    const handleSlot =(slot)=>{
      const apptdate=format(startDate, "yyyy-MM-dd");
      const slottime=slot.start_time +' '+ slot.st_meridiem+' '+'to'+' '+ slot.end_time + ' '+ slot.et_meridiem;
      navigation.navigate('Patient Form',{hospital:route.params,apptdate:apptdate,slot:slottime})
    }
    const filterData = slotsData.filter( data => {
      const slottime=data.start_time +' '+ data.st_meridiem+' '+'to'+' '+ data.end_time + ' '+ data.et_meridiem;
    
      if(!apptbookslot.includes(slottime)){
        return slottime;
      }
    
    })
  return (
    <SafeAreaView style={{backgroundColor:'#fff',flex:1}}>
      
      {/* <Button onPress={handleClick} />
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}
      <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',color:'#004d61',marginBottom:10}}> Click here to Select Date</Text>
      {/* <Button onPress={handleClick} title={format(startDate, "dd-MM-yyyy")} color="#841584"/> */}
      <View style={{marginRight:20,marginLeft:20,flexDirection: "row",justifyContent: "space-around"}}>
      <Pressable style={styles.datebtn}  onPress={handleClick}>
        <Text style={styles.text}>{format(startDate, "dd-MM-yyyy")}</Text>
      </Pressable>
      <Pressable style={styles.deletebtn} onPress={showSlot}>
        <Text style={styles.text}>Check Slot</Text>
      </Pressable>
      </View>
     
      {isOpen && (
        <View style={{alignItems:'center'}}>
          <DatePicker selected={startDate} onChange={handleChange} inline  minDate={moment().toDate()}/>
        </View>
       
      )}
     
      {isShow && (
        <View>
          <View style={styles.morning} >
            <Text  style={styles.timedaytext}>Morning</Text>
          
            {filterData.filter(data => {
              return data.timeofday==='morning';
            }).map(slots =>
             <TouchableOpacity key={slots.id} style={styles.slot} onPress={()=>handleSlot(slots)}>
               <Text style={styles.slottext}>{slots.start_time} {slots.st_meridiem} to {slots.end_time} {slots.et_meridiem}</Text>
             </TouchableOpacity>
            )
            }
           
          </View>
          <View style={styles.afternoon}>
            <Text style={styles.timedaytext}>Afternoon</Text>
            {slotsData.filter(data => {
              return data.timeofday==='afternoon';
            }).map(slots =>
             <TouchableOpacity key={slots.id} style={styles.slot} onPress={()=>handleSlot(slots)}>
               <Text style={styles.slottext}>{slots.start_time} {slots.st_meridiem} to {slots.end_time} {slots.et_meridiem}</Text>
             </TouchableOpacity>
            )
            }
          </View>
          <View style={styles.evening}>
            <Text  style={styles.timedaytext}>Evening</Text>
            {slotsData.filter(data => {
              return data.timeofday==='evening';
            }).map(slots =>
             <TouchableOpacity key={slots.id} style={styles.slot} onPress={()=>handleSlot(slots)}>
               <Text style={styles.slottext}>{slots.start_time} {slots.st_meridiem} to {slots.end_time} {slots.et_meridiem}</Text>
             </TouchableOpacity>
            )
            }
          </View>
           {/* {slotsData.map(hospital =>
          <View key={hospital.id} style={styles.slot}>
            <Text>{hospital.start_time}</Text>
          </View>
         )
        } */}
        </View>
       
      )}
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
  morning:{
    alignItems:'center',
    padding:10,
  },
  afternoon:{
    alignItems:'center',
    padding:10
  },
  evening:{
    alignItems:'center',
    padding:10
  },
  slots:{
    width:'100%',
    flexDirection: "row",
    flexWrap: "wrap",
    display: 'flex',
    justifyContent: 'space-between',

    height: '100px'
  },
  slot:{
    margin:10,
    padding:10,
    borderRadius:25,
    width:'100%',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
  },
  timedaytext:{
    fontSize:20,
    fontWeight:'bold',
    color:'red'
  },
  slottext:{
    alignSelf:'center',
    fontWeight:'bold',
    color:'#413E3E'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
 datebtn:{
    // backgroundColor:'gray',
   
    // marginRight:10,
    // padding:10,
    
    // alignItems:"center",
    // justifyContent:"center",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#841584',
  },
  deletebtn:{
    backgroundColor: 'green',
  
    padding:10,
  
    alignItems:"center",
    justifyContent:"center",
    // backgroundColor:"red",
    // alignItems:"center",
    // padding:20,
    // justifyContent:"center",
    // marginTop:20
  },
});

export default SelectDateTime;
