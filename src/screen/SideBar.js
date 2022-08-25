import * as React from 'react';
import { View, Text,SafeAreaView,Image ,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';
import PatientHome from './PatientHome';
import AlreadyDia from './AlreadyDia';
import PatientProfile from './PatientProfile';
import GetDia from './GetDia';
import MyAppointment from './MyAppointment';
import MyItinerary from './MyItinerary';
import MyTripStatus from './MyTripStatus';
import MyTrips from './MyTrips';

function Logout() {
   return (
      navigation.navigate('PatientLogin')
   );
}

function CustomDrawerContent(props) {
   
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
}
  
const Drawer = createDrawerNavigator();
const SideBar = ({ navigation }) => {
    const user = JSON.parse(localStorage.getItem('LoginUser'));
    return (
      <Drawer.Navigator
       useLegacyImplementation
        drawerContent={(props) => {
    
            return(
              <SafeAreaView style={{ flex: 1 }}>
                <View
                  style={{
                    height: 160,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop:10,
                    marginBottom:20
                  }}
                >
                 <Image style={styles.logo} source={{uri: user.profilepic}}/>
                 <Text style={styles.username}>{user.firstname} {user.lastname}</Text>
                 <Text style={styles.usergmail}>{user.email}</Text>
                </View>
 
                <CustomDrawerContent {...props} style={styles.drawer}   />
                
              </SafeAreaView>
              
            // <DrawerContentScrollView {...filteredProps}> 
            //     <View
            //       style={{
            //         height: 160,
            //         alignItems: "center",
            //         justifyContent: "center",
            //         marginTop:10,
            //         marginBottom:20
            //       }}
            //     >
            //      <Image style={styles.logo} source={{uri: user.profilepic}}/>
            //      <Text style={styles.username}>{user.firstname} {user.lastname}</Text>
            //      <Text style={styles.usergmail}>{user.email}</Text>
            //     </View>
            //     <View style={styles.drawer} >
            //        <DrawerItemList {...filteredProps}  />
            //     </View>
             
            // </DrawerContentScrollView>
           
            )
        }}
       
        screenOptions={{
         color:'#fff',
         drawerActiveBackgroundColor:'#FC4F4F',
        //  activeItemKey === 'appointment' ? { color: '#000' } : { color: '#fff' }
       }}   
      >
       
             
        {/* <Drawer.Screen name="Home" component={PatientHome} 
         options={{
           drawerLabel: ()=>(
            <Text  style={styles.drawerscreen}>Home</Text>
             ),
            drawerIcon: () => (

               <Icon
                  name='home'
                  size={20}
                  color={'#fff'}
               />
            ),
            
         }}
         />
        <Drawer.Screen name="My Profile" component={PatientProfile}
        options={{
            drawerLabel: ()=>(
            <Text  style={styles.drawerscreen}>My Profile</Text>
             ),
            drawerIcon: () => (
               <Icon
                  name='user-circle'
                  size={20}
                  color={'#fff'}
               />
            ),
           
         }} />
        <Drawer.Screen name="My Appointments" component={AboutScreen}
        options={{
            drawerLabel: ()=>(
            <Text  style={styles.drawerscreen}>My Appointments</Text>
             ),
            drawerIcon: () => (
               <Icon
                  name='calendar'
                  size={20}
                  color={'#fff'}
               />
            ),
            color:'#fff'
         }}/>
        <Drawer.Screen name="My Trips" component={Hospitals}
         options={{
            drawerLabel: ()=>(
               <Text  style={styles.drawerscreen}>My Trips</Text>
            ),
            drawerIcon: () => (
               <Icon
                  name='plane'
                  size={20}
                  color={'#fff'}
               />
            ),
            color:'#fff'
         }}/>
        <Drawer.Screen name="My Itinerary" component={Article}
         options={{
            drawerLabel: ()=>(
               <Text  style={styles.drawerscreen}>My Itinerary</Text>
            ),
            drawerIcon: () => (
               <Icon
                  name='info'
                  size={20}
                  color={'#fff'}
                  style={{paddingRight:8}}
               />
            ),
            color:'#fff'
         }}/>
        <Drawer.Screen name="Trip Status" component={Article} 
        options={{
            drawerLabel: ()=>(
              <Text  style={styles.drawerscreen}>Trip Status</Text>
            ),
            drawerIcon: () => (
               <MaterialCommunityIcons name="list-status" size={20} color="#fff" />
            ),
           
         }}/>
        <Drawer.Screen name="Signout" component={Logout} 
         options={{
            drawerLabel: ()=>(
               <Text  style={styles.drawerscreen}>Signout</Text>
             ),
            drawerIcon: () => (
               <MaterialCommunityIcons name="logout" size={18} color="#fff"   />
            ),
           
         }}  />
        <Drawer.Screen name="Already Diag" component={AlreadyDia} 
          options={{
            drawerLabel: ()=>(
              <Text style={{display:'none'}}>Already Diago</Text>
            ),
           
         }}/>
        <Drawer.Screen name="Get_Diag" component={GetDia} 
          options={{
            drawerLabel: ()=>(
              <Text style={{display:'none'}}>Get_Diag</Text>
            ),
            
         }}/> */}
        <Drawer.Screen
          name="Homes"
          options={{
            drawerLabel: ()=>(
               <Text style={styles.drawerscreen}>Home</Text>
             ),
            drawerIcon: () => (
              <Icon
              name='home'
              size={20}
              color={'#fff'}
              />
            ),
            
         }} 
          component={PatientHome}
        />
        <Drawer.Screen
          name="My Profile"
          options={{
            drawerLabel: ()=>(
            <Text  style={styles.drawerscreen}>My Profile</Text>
             ),
            drawerIcon: () => (
               <Icon
                  name='user-circle'
                  size={20}
                  color={'#fff'}
               />
            ),
           
         }}
          component={PatientProfile}
        />
        <Drawer.Screen
          name="My Appointments"
          options={{
            drawerLabel: ()=>(
            <Text  style={styles.drawerscreen}>My Appointments</Text>
             ),
            drawerIcon: () => (
              <Icon
              name='calendar'
              size={20}
              color={'#fff'}
              />
            ),
           
         }}
          component={MyAppointment}
        />
        <Drawer.Screen
          name="My Trips"
          options={{
            drawerLabel: ()=>(
               <Text  style={styles.drawerscreen}>My Trips</Text>
             ),
            drawerIcon: () => (
              <Icon
              name='plane'
              size={20}
              color={'#fff'}
           />
            ),
           
         }} 
        
          component={MyTrips}
        />
        
        <Drawer.Screen
          name="My Itinerary"
          options={{
            drawerLabel: ()=>(
               <Text style={styles.drawerscreen}>My Itinerary</Text>
             ),
            drawerIcon: () => (
              <Icon
                  name='info'
                  size={20}
                  color={'#fff'}
                  style={{paddingRight:8}}
               />
              
            ),
           
         }} 
        
          component={MyItinerary}
        />
        <Drawer.Screen
          name="Trip Status"
          options={{
            drawerLabel: ()=>(
               <Text  style={styles.drawerscreen}>Trip Status</Text>
             ),
            drawerIcon: () => (
              <MaterialCommunityIcons name="list-status" size={20} color="#fff" />
            ),
           
         }} 
        
          component={MyTripStatus}
        />
        <Drawer.Screen
          name="Signout"
          options={{
            drawerLabel: ()=>(
               <Text  style={styles.drawerscreen}>Signout</Text>
             ),
            drawerIcon: () => (
              <Icon
              name='home'
              size={20}
              color={'#fff'}
              />
            ),
         }} 
          component={Logout}
        />
        {/* <Drawer.Screen name="Already Diag" component={AlreadyDia} 
          options={{
            drawerLabel: ()=>(
              <Text style={{display:'none'}}>Already Diago</Text>
            ),
           
        }}/>
        <Drawer.Screen name="Get_Diag" component={GetDia} 
          options={{
            drawerLabel: ()=>(
              <Text style={{display:'none'}}>Get_Diag</Text>
            ),
        }}/> */}
      </Drawer.Navigator>
    );
}
export default SideBar;
const styles = StyleSheet.create({
    logo: {
      width: 66,
      height: 58,
      
    },
    username: {
      fontWeight:'bold',
      fontSize:20,
      color:'#004d61'
    },
    usergmail: {
      color:'#A9A9A9'
    },
    drawer: {
      backgroundColor:'#004d61',
      height:546
    }, 
    drawerscreen: {
      color:'#fff',
    },
    iconStyle: {
      fontSize: 40,
      marginTop: 30,
      color: 'black',
    },
});