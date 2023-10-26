import axios from 'axios';
import { Redirect, Stack, useRouter, useSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, DeviceEventEmitter, PermissionsAndroid, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { TimePickerModal } from 'react-native-paper-dates';
import { useCallback } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { schoolzapi } from '../../components/constants';
import { selecttoken, selectuser } from '../../features/userinfoSlice';
import { Image } from 'react-native';

function Createeditvehicle() {



    const token = useSelector(selecttoken);
    const user = useSelector(selectuser);
    const [Name, setName] = useState("");
    const [Model, setModel] = useState("");
    const [color, setcolor] = useState("");
    const [Number, setNumber] = useState("");
    const [file, setFile] = useState(null);
    const [imgfile, setimgFile] = useState(null);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    
    const [creatoredit, isCreatedorEdit] = useState();
    const [isloading, setLoading] = useState(false);
    const [issubmitting, setIssubmitting] = useState(false);
    const router = useRouter();
    const {id} = useSearchParams();

  

    useEffect(()=>{
      DeviceEventEmitter.removeAllListeners("event.test");

      if(id == undefined){
        isCreatedorEdit('New Vehicle');
      }else{
        loaddataedit();
        isCreatedorEdit('Edit Vehicle');
      }

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


      const loaddataedit = () => {
        setLoading(true);
        
        axios.get(schoolzapi+'/vehicle/show/'+id,
        {
            headers: {Accept: 'application/json'
        }
        })
        .then(function (results) {
            setLoading(false);

            console.log("results",results.data);

            setName(results.data.name);
            setModel(results.data.model);
            setNumber(results.data.numberplate);
            setcolor(results.data.color);
            setimgFile(results.data.avatar);

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

        if(Model == ""){
            alert('Model cant be empty');
            return;
        }

        if(color == ""){
          alert('color cant be empty');
          return;
        }

        if(Number == ""){
          alert('Vehicle Number cant be empty');
          return;
        }

        if(value == ""){
            alert('Assigned To cant be empty');
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

        data.append('user_id',user?.id);
        data.append('name',Name);
        data.append('model',Model);
        data.append('numberplate',Number);
        data.append('color',color);

        axios.post(schoolzapi+'/add-vehicle',
        data,
        {
            headers: {Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
        })
          .then(function (response) {
            ToastAndroid.show('info saved successfully!', ToastAndroid.SHORT);
            setIssubmitting(false);
            DeviceEventEmitter.emit('subject.added', {});
            router.back();
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

      if(Model == ""){
          alert('Model cant be empty');
          return;
      }

      if(color == ""){
        alert('color cant be empty');
        return;
      }

      if(Number == ""){
        alert('Vehicle Number cant be empty');
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

      data.append('user_id',user?.id);
      data.append('name',Name);
      data.append('model',Model);
      data.append('numberplate',Number);
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
                headerTitle: creatoredit,
                presentation: 'formSheet',
                headerShown: true
                // headerRight: () => (
                //   <>
                //     {isloading ? <ActivityIndicator size="large" color="#1782b6" /> : null}
                //   </>
                // )
            }}

        />
        <ScrollView style={{marginBottom: 30}}>
        {isloading ? <ActivityIndicator size="large" color="#1782b6" /> : (
        <Card>
        <Card.Content>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={selectFile}>

          {imgfile ? id == undefined ? (
            <Avatar.Image 
            source={{ uri: file.uri }}
            size={200}
       />
          ) : (<Avatar.Image 
            source={{ uri: imgfile }}
            size={200}
       />)

            :

            <Image 
                    source={require('../../assets/vehicle.png')}
                    style={{width: 200, height: 200}}
                />
          
          }

                <Text style={{textAlign: 'center'}}>Pick Image</Text>

              </TouchableOpacity>
          </View>

        {/* <View style={{flexDirection: 'row',alignItems: 'center',  marginTop: 20, marginLeft: 10}}>
                    
            {file && <Avatar.Image 
                 source={{ uri: file.uri }}
                 size={100}
            /> }
                    
            <Button mode="text" style={{fontSize: 20}} onPress={selectFile}>Pick Image</Button>
        </View> */}

        <Text style={{fontSize: 15, fontWeight: 500}}>Name </Text>
        <TextInput
        style={styles.Forminput}
        mode="outlined"
        onChangeText={(e) => setName(e)}
        value={Name} />


        <Text style={{fontSize: 15, fontWeight: 500}}>Model</Text>
        <TextInput
        style={styles.Forminput}
        mode="outlined"
        onChangeText={(e) => setModel(e)}
        value={Model} />


        <Text style={{fontSize: 15, fontWeight: 500}}>Number Plate</Text>
        <TextInput
        style={styles.Forminput}
        mode="outlined"
        onChangeText={(e) => setNumber(e)}
        value={Number} />


        <Text style={{fontSize: 15, fontWeight: 500}}>Color</Text>
        <TextInput
        style={styles.Forminput}
        mode="outlined"
        onChangeText={(e) => setcolor(e)}
        value={color} />

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

export default Createeditvehicle;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});