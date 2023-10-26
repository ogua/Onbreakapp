import { Redirect, Stack, useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectuser,selecttoken,selectroles,selectuserpermission,selectpermissions,selectmenu } from '../../features/userinfoSlice';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getData, getDataobject, removeusertoken } from '../../features/usertokenSlice';
import Usercontent from '../../components/Vehicle/userContent';
import Dashboard from '../../components/Vehicle/Dashboard';
import { useState } from 'react';
import Chat from '../../components/Vehicle/Chat';
import Allvehicle from '../../components/Vehicle/Newvehicle';
import Profile from '../../components/Vehicle/Profile';
import Companyinfo from '../../components/Vehicle/Companyinfo';
import Review from '../../components/Vehicle/Review';
import History from '../../components/Vehicle/History';
import Services from '../../components/Vehicle/Services';
import Providers from '../../components/Vehicle/Providers';
import Users from '../../components/Vehicle/Users';
import Requests from '../../components/Vehicle/Requests';


const Drawer = createDrawerNavigator();

function Usersdashboard() {
  const user = useSelector(selectuser);
  // token = useSelector(selecttoken);
  const router = useRouter();
  const [token, setToken] = useState();

    return (
    <Drawer.Navigator
      initialRouteName='profile'
      useLegacyImplementation
      drawerContent={props => <Usercontent user={user} {...props}/>}>

      <Drawer.Screen name="userdashboard" component={Dashboard} />
      <Drawer.Screen name="profile" component={Profile} />
      <Drawer.Screen name="Allvehicle" component={Allvehicle} />
      <Drawer.Screen name="Companyinfo" component={Companyinfo} />
      <Drawer.Screen name="Review" component={Review} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="chat" component={Chat} />
      <Drawer.Screen name="Services" component={Services} />
      <Drawer.Screen name="Providers" component={Providers} />
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="Requests" component={Requests} />
      
    </Drawer.Navigator>
    )
}

export default Usersdashboard;

const styles = StyleSheet.create({
    
});
