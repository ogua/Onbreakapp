import axios from 'axios';
import { Redirect, Stack, useRouter, useSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, DeviceEventEmitter, PermissionsAndroid, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { TimePickerModal } from 'react-native-paper-dates';
import { useCallback } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { schoolzapi } from '../../components/constants';
import { selecttoken, selectuser } from '../../features/userinfoSlice';
import { Image,RefreshControl } from 'react-native';
import { showMessage } from "react-native-flash-message";
import * as Location from 'expo-location';
import { seleteorigin, setHeading, setOrgaddress, setOrigin } from '../../features/examSlice';

function Companyinfo() {


    const token = useSelector(selecttoken);
    const user = useSelector(selectuser);
    const origin = useSelector(seleteorigin);
    const [Name, setName] = useState("");
    const [mlocation, setmlocation] = useState("");
    const [latitude, setlatitude] = useState("");
    const [longitude, setlongitude] = useState("");
    const [contact, setcontact] = useState("");
    const [file, setFile] = useState(null);
    const [imgfile, setimgFile] = useState(null);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    
    const [creatoredit, isCreatedorEdit] = useState();
    const [isloading, setLoading] = useState(false);
    const [issubmitting, setIssubmitting] = useState(false);
    const router = useRouter();
    const {id} = useSearchParams();


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
        setlatitude(""+location.coords.latitude); 
        setlongitude(""+location.coords.longitude);
        //setHeading(location.coords.heading);
        
        console.log("location",origin.latitude);
        
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

  

    useEffect(()=>{
      DeviceEventEmitter.removeAllListeners("event.test");

      if(id == undefined){
        isCreatedorEdit('Companys Information');
      }else{
        isCreatedorEdit('Edit Vehicle');
      }

      loadinfo();

    },[]);


    function getstaffinfo() {

        return axios.get(schoolzapi+'/staff',
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        });
    }
      
      function getvehicleinfo() {

        return axios.get(schoolzapi+'/vehicle/show/'+id,
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        });
      }


      const loadinfo = () => {

        setLoading(true);
        
        axios.get(schoolzapi+'/companys-info/'+user?.uniqueid,
        {
            headers: {Accept: 'application/json'
        }
        })
        .then(function (results) {
            setLoading(false);

            console.log("results",results.data);

            setName(results.data.name);
            setmlocation(results.data.loc);
            setcontact(results.data.contact);
            setlatitude(results.data.lat);
            setlongitude(results.data.lng);
            setimgFile(results.data.logo);

        }).catch(function(error){
            setLoading(false);
            console.log("error",error);
            
        });
    }



    const loadonlystaff = () => {
      
      setLoading(true);

      axios.get(schoolzapi+'/staff',
      {
          headers: {Accept: 'application/json',
          Authorization: "Bearer "+token
      }
      })
        .then(function (response) {
          setLoading(false);
          console.log(response.data.data);
          loaddropdown(response.data.data);
          
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    }


    const createdata = () => {

        if(Name == ""){
          alert('Name cant be empty');
          return;
        }

        if(mlocation == ""){
            alert('location cant be empty');
            return;
        }


        if(contact == ""){
          alert('Vehicle contact cant be empty');
          return;
        }

        if(latitude == ""){
            alert('latitude cant be empty');
            return;
        }

        if(longitude == ""){
            alert('latitude cant be empty');
            return;
        }


        setIssubmitting(true);

        const data = new FormData();

        if(file != null){

          data.append('avatar', {
            uri: file.uri,
            name: file.name,
            type: file.mimeType
          });

        }

        data.append('user_id',user?.uniqueid);
        data.append('name',Name);
        data.append('location',mlocation);
        data.append('contact',contact);
        data.append('latitude',latitude);
        data.append('longitude',longitude);

        axios.post(schoolzapi+'/companys-info',
        data,
        {
            headers: {Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
        })
          .then(function (response) {
            setIssubmitting(false);

            showMessage({
                message: 'info saved Successfully!',
                type: "success",
                position: 'bottom',
            });
           
            //router.back();
          })
          .catch(function (error) {
            setIssubmitting(false);
            console.log(error);
          });
    }

    const updatedata = () => {

      if(Name == ""){
        alert('Name cant be empty');
        return;
      }

      if(mlocation == ""){
          alert('location cant be empty');
          return;
      }

      if(color == ""){
        alert('color cant be empty');
        return;
      }

      if(contact == ""){
        alert('Vehicle contact cant be empty');
        return;
      }

      setIssubmitting(true);

      const data = new FormData();

      if(file != null){

        data.append('avatar', {
          uri: file.uri,
          name: file.name,
          type: file.mimeType
        });

      }

      data.append('user_id',user?.uniqueid);
      data.append('name',Name);
      data.append('location',mlocation);
      data.append('contactplate',contact);
      data.append('color',color);
    
      axios.post(schoolzapi+'/vehicle/'+id,
      data,
      {
          headers: {Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
      }
      })
        .then(function (response) {
          setIssubmitting(false);
          DeviceEventEmitter.emit('subject.added', {});
          router.back();
        })
        .catch(function (error) {
          setIssubmitting(false);
          console.log(error.response);
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
          setFile(result);
          setimgFile(result.uri);
        }
      }
    } catch (err) {
      setFile(null);
      setimgFile(null);
      console.warn(err);
      return false;
    }
  }

    return (
      <SafeAreaView>
        <Stack.Screen
            options={{
                headerTitle: 'Company Information',
                presentation: 'formSheet',
                headerShown: true
                // headerRight: () => (
                //   <>
                //     {isloading ? <ActivityIndicator size="large" color="#1782b6" /> : null}
                //   </>
                // )
            }}

        />
        <ScrollView style={{marginBottom: 30}}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={loadinfo} />
            }
        >
        {isloading ? <ActivityIndicator size="large" color="#1782b6" /> : (
        <Card>
        <Card.Content>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={selectFile}>

          {imgfile ? id == undefined ? (<>
          {
            file ? (
              <Avatar.Image 
              source={{ uri: file.uri }}
              size={200}
         />
            ) : (
              <Avatar.Image 
            source={{ uri: imgfile }}
            size={200}
       />
            )
          }
          </>
    
          ) : (<Avatar.Image 
            source={{ uri: imgfile }}
            size={200}
       />)

            :

            <Image 
                    source={require('../../assets/splash-logo.png')}
                    style={{width: 200, height: 200}}
                />
          
          }

                <Text style={{textAlign: 'center'}}>Pick logo</Text>

              </TouchableOpacity>
          </View>

        {/* <View style={{flexDirection: 'row',alignItems: 'center',  marginTop: 20, marginLeft: 10}}>
                    
            {file && <Avatar.Image 
                 source={{ uri: file.uri }}
                 size={100}
            /> }
                    
            <Button mode="text" style={{fontSize: 20}} onPress={selectFile}>Pick Image</Button>
        </View> */}

        <Text style={{fontSize: 15, fontWeight: 500}}>Companys Name </Text>
        <TextInput
        style={styles.Forminput}
        mode="outlined"
        onChangeText={(e) => setName(e)}
        value={Name} />

        <Text style={{fontSize: 15, fontWeight: 500}}>Location</Text>
        <TextInput
        style={styles.Forminput}
        mode="outlined"
        onChangeText={(e) => setmlocation(e)}
        value={mlocation} />


        <Text style={{fontSize: 15, fontWeight: 500}}>Contact</Text>
        <TextInput
        style={styles.Forminput}
        mode="outlined"
        onChangeText={(e) => setcontact(e)}
        value={contact} />

       <Button onPress={getLiveLocation}>Get precise Location</Button>


      <Text style={{fontSize: 15, fontWeight: 500}}>latitude</Text>
        <TextInput
        style={styles.Forminput}
        mode="outlined"
        onChangeText={(e) => setlatitude(e)}
        value={latitude} />


<Text style={{fontSize: 15, fontWeight: 500}}>longitude</Text>
        <TextInput
        style={styles.Forminput}
        mode="outlined"
        onChangeText={(e) => setlongitude(e)}
        value={longitude} /> 

        {issubmitting ? <ActivityIndicator size="large" color="#1782b6" /> : (
        <Button mode="contained" onPress={id == undefined ? createdata : updatedata} style={{marginTop: 20}}>
        Save
        </Button>
        )}

</Card.Content>
        </Card>
        )}

        </ScrollView>


      </SafeAreaView>
    )
}

export default Companyinfo;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});