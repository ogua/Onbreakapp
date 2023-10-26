import { Redirect, Stack, useFocusEffect, useRouter } from 'expo-router';
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, 
     ToastAndroid, View, Dimensions, KeyboardAvoidingView, PermissionsAndroid, Alert } from 'react-native';
import {TextInput,ActivityIndicator, Button, Avatar, Divider} from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from 'expo-auth-session';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { selectuser } from '../../features/userinfoSlice';


function Profile() {
    
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
    const SCREEN_HEIGHT = Dimensions.get("window").height;

   
    //console.log("user",user);

    useFocusEffect(() => {
        if(user == null){
            router.replace("/");
        }    
    });


    return (
      <SafeAreaView>
        <Stack.Screen
            options={{
                headerTitle: 'User Profile',
                presentation: 'formSheet'
            }}

        />


        {/* <StatusBar hidden={false} /> */}

        <ScrollView>
        <View style={[styles.maincontainer]}>

<View style={{alignItems: 'center', marginTop: 30}}>


<Avatar.Image 
            source={{uri: user?.avatar}}
            size={200}
        />

</View>



<View style={{marginHorizontal: 20, marginTop: 30, backgroundColor: '#fff', padding: 20}}>

<TouchableOpacity>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text>Fullname</Text>
        <Text>{ user?.name}</Text>
    </View>
</TouchableOpacity>

<Divider style={{marginVertical: 10}} />

<TouchableOpacity>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text>Email</Text>
        <Text>{ user?.username}</Text>
    </View>
</TouchableOpacity>

<Divider style={{marginVertical: 10}} />

<TouchableOpacity>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text>Contact</Text>
        <Text>{ user?.contact}</Text>
    </View>
</TouchableOpacity>

<Divider style={{marginVertical: 10}} />

<TouchableOpacity>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text>Role</Text>
        <Text>{ user?.role}</Text>
    </View>
</TouchableOpacity>

</View>

<Button style={{marginTop: 20}} onPress={()=> router.push(`/admin/update-profile?id=${user?.id}`)}>Update info</Button>
  

</View>
        </ScrollView>
        
        
      </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    maincontainer: {
        justifyContent: 'center',
    }
});