import { Link, Redirect, Stack, useFocusEffect, useRouter } from 'expo-router';
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, 
     ToastAndroid, View, Dimensions, KeyboardAvoidingView } from 'react-native';
import {TextInput,ActivityIndicator, Button} from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setToken, setRoles,  setUserpermission, setPermissions, setMenu, setCurrency, selecttoken, setSchool, setStaffrole } from '../features/userinfoSlice';
import { selectuser } from '../features/userinfoSlice';
import { storeData, removeusertoken, gettokendata, selectusertoken } from '../features/usertokenSlice';
import { showMessage } from "react-native-flash-message";
import { schoolzapi } from '../components/constants';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from 'expo-auth-session';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { setHeading, setOrgaddress, setOrigin } from '../features/examSlice';


function login() {
    
    const [email, setemail] = useState("");
    const [googleemail, setgoogleemail] = useState("");
    const [password, setpassword] = useState();
    const [issumit, Setsubmiitting] = useState(false);
    const [googlesinin, setgooglesinin] = useState(false);
    const emailref = useRef();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(selectuser);
    const token = useSelector(selecttoken);
    const SCREEN_HEIGHT = Dimensions.get("window").height;
    const [location, setLocation] = useState(null);

    //console.log("user",user);

    useEffect(() => {
        getLiveLocation();
      }, []);


    function getLiveLocation(){

        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
      
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
      
          let location = await Location.getCurrentPositionAsync({});
      
          if(location){
      
          dispatch(setOrigin({latitude: location.coords.latitude,longitude: location.coords.longitude}));
      
          setHeading(location.coords.heading);    
          
          fetchaddress(location.coords.latitude,location.coords.longitude,location.coords.heading);  
        }
          
          
        })();
      }

      const fetchaddress = (lat, lng, heading) => {
        fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            lat +
            ',' +
            lng +
            '&key=' +
            'AIzaSyAJYTDdNireWqKZ5Y8yNbwqW8YMAreLjTo',
        )
          .then(response => response.json())
          .then(responseJson => {
            //console.log(responseJson?.results[0]);
            dispatch(setOrgaddress(responseJson?.results[0]?.formatted_address));      
          });
      }


    useFocusEffect(() => {
        if(user !== null){
            router.replace("/admin/userdashboard");
        }    
    });

    const Userlogin = () => {

        Setsubmiitting(true);

        const formdata = {
            email: email,
            password: password
        }

        axios.post(schoolzapi+'/user-login',
        formdata,
        {
            headers: {Accept: 'application/json'}
        })
          .then((response) => {

            if(response.data.error){
               // ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                alert(response.data.message);
                Setsubmiitting(false);
            }else{
                
                showMessage({
                    message: 'Login Successfully!',
                    type: "success",
                    position: 'bottom',
                });
               
                
                dispatch(setUser(response.data.user));

                Setsubmiitting(false);
                router.push('/admin/userdashboard');

            }

          })
          .catch(function (error) {
            Setsubmiitting(false);
            console.log("error",error);
            //console.log(schoolzapi+'/auth-login');
          });
        
    }

    return (
        <KeyboardAvoidingView behavior="position"> 
      <SafeAreaView>
        <Stack.Screen options={{
            headerShown: false
        }} />

        

        {/* <StatusBar hidden={false} /> */}

        <View style={[styles.maincontainer,{height: SCREEN_HEIGHT}]}>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    source={require('../assets/user.png')}
                    style={{width: 200, height: 200}}
                />
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{marginVertical: 20, fontSize: 25, fontWeight: 500}}>User Login</Text>
            </View>

            <View style={{marginHorizontal: 20}}>
                <TextInput
                    mode="outlined"
                    keyboardType="email-address"
                    label="Enter Email Address"
                    value={email}
                    onChangeText={(email) => setemail(email)}
                />

                 <TextInput
                    style={{marginTop: 10}}
                    mode="outlined"
                    label="Enter Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setpassword(password)}
                />

                {issumit ? <ActivityIndicator style={{marginVertical: 20}} /> : (

                <Button mode="elevated" style={{marginTop: 20}} onPress={Userlogin}>Login</Button>

                )}

                <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
                    <View>
                        <TouchableOpacity onPress={()=> router.push('/signup')}>
                            <Text>Signup</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            
            
        </View>
        
      </SafeAreaView>
      </KeyboardAvoidingView>
    )
}

export default login;

const styles = StyleSheet.create({
    maincontainer: {
        justifyContent: 'center',
    }
});
