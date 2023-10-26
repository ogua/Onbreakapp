import { Redirect, Stack, useFocusEffect, useRouter } from 'expo-router';
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, 
     ToastAndroid, View, Dimensions, KeyboardAvoidingView, PermissionsAndroid, Alert } from 'react-native';
import {TextInput,ActivityIndicator, Button, Avatar} from 'react-native-paper';
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
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


function Registeruser() {
    
    const [username, setusername] = useState("");
    const [pic, setPic] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [contact, setcontact] = useState("");
    const [userurl, setuserurl] = useState(null);
    const [issumit, Setsubmiitting] = useState(false);
    const [googlesinin, setgooglesinin] = useState(false);
    const emailref = useRef();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(selectuser);
    const token = useSelector(selecttoken);
    const SCREEN_HEIGHT = Dimensions.get("window").height;
    const [issee, Setissee] = useState(true);
    const [cissee, Setcissee] = useState(true);

    const [open, setOpen] = useState(false);
    const [role, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "User", value: "User"},
        { label: "Service Provider", value: "Service Provider"}
    ]);

    //console.log("user",user);

    useFocusEffect(() => {
        if(user !== null){
            router.replace("/admin/userdashboard");
        }    
    });

    const Userregister = () => {

      if(username == ""){
        alert('Fullname cant be empty');
        return;
      }

      if(email == ""){
          alert('Email cant be empty');
          return;
      }

    if(contact == ""){
        alert('Phone number cant be empty');
        return;
    }

    if(role == ""){
      alert('Role cant be empty');
      return;
    }

    if(password == ""){
      alert('Password cant be empty');
      return;
    }

    if(password !== cpassword){
      alert('Password dont match');
      return;
    }

    if(cpassword == ""){
      alert('Confirm Password cant be empty');
      return;
    }

    Setsubmiitting(true);

    const data = new FormData();

    if(userurl != null){

      data.append('avatar', {
        uri: userurl.uri,
        name: userurl.name,
        type: userurl.mimeType
      });

    }

    data.append('username',email);
    data.append('name',username);
    data.append('role',role);
    data.append('contact',contact);
    data.append('password',password);

        axios.post(schoolzapi+"/user-registration",
        data,
        {
          headers: {Accept: 'application/json',
          'Content-Type': 'multipart/form-data'}
        })
          .then((response) => {

            Setsubmiitting(false);
            
            showMessage({
              message: 'User registrated Successfully!',
              type: "success",
              position: 'bottom',
            });

            router.replace("/");

          })
          .catch(function (error) {
           Setsubmiitting(false);
            console.log("error",error);
            //console.log(schoolzapi+'/user-registration');
          });
        
    }

    const checkPermissions = async () => {
        try {
          const result = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );
    
          if (!result) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title:
                  'You need to give storage permission to download and save the file',
                message: 'App needs access to your camera',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the camera');
              return true;
            } else {
              Alert.alert('Error', "Camera permission denied");
              console.log('Camera permission denied');
              return false;
            }
          } else {
            return true;
          }
        } catch (err) {
          console.warn(err);
          return false;
        }
      };


    async function selectFile() {
        try {
          const result = await checkPermissions();
    
          if (result) {
            const result = await DocumentPicker.getDocumentAsync({
              copyToCacheDirectory: false,
            });
    
            if (result.type === 'success') {
              // Printing the log realted to the file
              console.log('res : ' + JSON.stringify(result));
              // Setting the state to show single file attributes
              setuserurl(result);
              setPic(result.uri);
            }
          }
        } catch (err) {
          setuserurl(null);
          console.warn(err);
          return false;
        }
      }

    return (
      <SafeAreaView>
        <Stack.Screen options={{
            headerShown: false
        }} />

        

        {/* <StatusBar hidden={false} /> */}

        <KeyboardAwareScrollView>
        <ScrollView>
        <View style={[styles.maincontainer]}>

<View style={{alignItems: 'center', marginTop: 60}}>

    <TouchableOpacity onPress={selectFile}>

    {userurl ? (
        <>
        <Avatar.Image 
            source={{uri: userurl?.uri}}
            size={200}
        />

        </>
    ) : (
        <>
        <Image 
            source={require('../assets/user.png')}
            style={{width: 200, height: 200}}
        />
        </>
    )}

</TouchableOpacity>


<TouchableOpacity style={{width: 30, height: 30, marginTop: -25, marginLeft: 80}} onPress={selectFile}>
        <Ionicons name="camera-outline" size={30} color="#ccc"/>
</TouchableOpacity>

</View>

<View style={{justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{marginVertical: 20, fontSize: 25, fontWeight: 500}}>User Signup</Text>
</View>

<View style={{marginHorizontal: 20}}>
  <TextInput
        mode="outlined"
        label="Enter Fullname"
        value={username}
        onChangeText={(username) => setusername(username)}
    />
    
    
    <TextInput
       style={{marginTop: 10}}
        mode="outlined"
        label="Enter Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={(email) => setemail(email)}
    />

    <TextInput
       style={{marginTop: 10}}
        mode="outlined"
        label="Enter Phone Number"
        value={contact}
        keyboardType="phone-pad"
        onChangeText={(contact) => setcontact(contact)}
    />

          <DropDownPicker
                    open={open}
                    value={role}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholderStyle={{
                        color: "#456A5A",
                    }}
                    placeholder='Select Role'
                    listMode="MODAL"
                    dropDownContainerStyle={{
                        borderWidth: 0,
                        //borderRadius: 30,
                        backgroundColor: "#fff"
                    }}
                    labelStyle={{
                        color: "#456A5A",
                    }}
                    listItemLabelStyle={{
                        color: "#456A5A",
                    }}
                    style={{
                        borderWidth: 1,
                        minHeight: 40,
                        marginVertical: 20,
                        //marginTop: 20
                    }}
                />

     <TextInput
        //style={{marginTop: 10}}
        mode="outlined"
        label="Enter Password"
        secureTextEntry={issee}
        value={password}
        onChangeText={(password) => setpassword(password)}
        right={<TextInput.Icon icon="eye" onPress={() => Setissee(!issee)} />}
    />


    <TextInput
        style={{marginTop: 10}}
        mode="outlined"
        label="Confirm Password"
        secureTextEntry={cissee}
        value={cpassword}
        onChangeText={(cpassword) => setcpassword(cpassword)}
        right={<TextInput.Icon icon="eye" onPress={() => Setcissee(!cissee)} />}
    />

    {issumit ? <ActivityIndicator style={{marginVertical: 20}} /> : (
      <Button mode="elevated" style={{marginVertical: 20}} onPress={Userregister}>Signup</Button>
    )}

    <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
                    <View>
                        <TouchableOpacity onPress={()=> router.push('/')}>
                            <Text>Have an account ? Login</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View>
                        <TouchableOpacity>
                            <Text>Forgot Password</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>

    </View>



</View>
        </ScrollView>
        </KeyboardAwareScrollView>            
        
        
      </SafeAreaView>
    )
}

export default Registeruser;

const styles = StyleSheet.create({
    maincontainer: {
        justifyContent: 'center',
    }
});