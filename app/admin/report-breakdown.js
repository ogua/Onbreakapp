import axios from 'axios';
import { Redirect, Stack, useRouter, useSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, DeviceEventEmitter, PermissionsAndroid, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, Card, Divider, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { TimePickerModal } from 'react-native-paper-dates';
import { useCallback } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { schoolzapi } from '../../components/constants';
import { selecttoken, selectuser } from '../../features/userinfoSlice';
import { Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { seleteorigin, setHeading, setOrgaddress, setOrigin } from '../../features/examSlice';
import * as Location from 'expo-location';
import { showMessage } from "react-native-flash-message";


function Reportbreakdown() {
    const user = useSelector(selectuser);
    const [Name, setName] = useState("");
    const [Model, setModel] = useState("");
    const [color, setcolor] = useState("");
    const [Number, setNumber] = useState("");
    const [file, setFile] = useState(null);
    const [imgfile, setimgFile] = useState(null);

    const [company, setcompany] = useState({});
    const origin = useSelector(seleteorigin);
    const [aorigin, setorigin] = useState(false);
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [openv, setOpenv] = useState(false);
    const [vvalue, setvValue] = useState(null);
    const [vitems, setvItems] = useState([]);
    
    const [creatoredit, isCreatedorEdit] = useState();
    const [isloading, setLoading] = useState(false);
    const [issubmitting, setIssubmitting] = useState(false);
    const router = useRouter();
    const {id} = useSearchParams();

    console.log("id",id);
    console.log("+user?.id",+user?.id);

    
    const getLiveLocation = () => {

        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
      
          if (status !== 'granted') {
            alert('Permission to access location was denied');
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



    function fetchcompany() {

        return axios.get(schoolzapi+'/companys-report-info/'+id,
        {
            headers: {Accept: 'application/json'
        }
        });
    }

    function fetchcompanyserv() {

        return axios.get(schoolzapi+'/companys-services/'+id,
        {
            headers: {Accept: 'application/json'
        }
        });
    }

    function fetchvehicles() {

        return axios.get(schoolzapi+'/all-vehicle/'+user?.id,
        {
            headers: {Accept: 'application/json'
        }
        });
    }

    const loaddata = () => {
        setLoading(true);
        
        Promise.all([fetchcompany(), fetchcompanyserv(), fetchvehicles()])
        .then(function (results) {

            const company = results[0];
            const serv = results[1];
            const vehicles = results[2];

            setcompany(company.data);
            loadserv(serv.data);
            loadvehicles(vehicles.data);

            console.log("serv",+serv);
            console.log("vehicles",+vehicles);

        }).catch(function(error){
            setLoading(false);
            const company = error[0];
            const serv = error[1];
            const vehicles = error[2];

            console.log("company",company);
            console.log("servs",serv);
            console.log("vehicle",vehicles);
            
        });
    }

    const loadserv = (data) => {
            
        const mddatas = data;
        
        let mdata = [];
  
         mddatas.map(item =>  mdata.push({ label: item?.name, value: item?.id}))
        
         setItems(mdata);
    }

    const loadvehicles = (data) => {
            
        const mddatas = data;
        
        let mdata = [];
  
         mddatas.map(item =>  mdata.push({ label: item?.name+' '+item?.model, value: item?.id}))
        
         setvItems(mdata);

         setLoading(false);
    }


    useEffect(()=>{
        loaddata();
    },[]);

    const reportissue = () => {

        if(value == ""){
            alert('Service cant be empty');
            return;
        }
        
        
        if(Name == ""){
          alert('Describe issue cant be empty');
          return;
        }
        
        if(vvalue == ""){
            alert('Vehicle cant be empty');
            return;
        }

        if(origin == null){
            setorigin(true);
        }else{
            setorigin(false);
        }
  
        setIssubmitting(true);
  
        const data = new FormData();
  
        data.append('user_id',user?.id);
        data.append('prvider_id',company?.user_id);
        data.append('service',value);
        data.append('note',Name);
        data.append('vehicle_id',vvalue);
        data.append('lat',origin?.latitude);
        data.append('lng',origin?.longitude);
        data.append('status',0);
      
        axios.post(schoolzapi+'/report-breakdown',
        data,
        {
            headers: {Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
        })
          .then(function (response) {
            setIssubmitting(false);

            showMessage({
                message: 'Report sent Successfully!',
                type: "success",
                position: 'bottom',
            });
            
            router.push('/admin/company-info?id='+id);
          })
          .catch(function (error) {
            setIssubmitting(false);
            console.log(error.response);
          });
    }


    return (
      <SafeAreaView>
        <Stack.Screen
            options={{
                headerShown: false
            }}

        />
        <ScrollView style={{marginBottom: 30}}>
        {isloading ? <ActivityIndicator size="large" color="#1782b6" style={{marginTop: 50}} /> : (
        <Card>
        <Card.Content>

        <TouchableOpacity style={{width: 30, height: 30, marginTop: 20, marginLeft: 10,zIndex: 2000}} onPress={()=> router.back()}>
            <Ionicons name="arrow-back-circle" size={30} />
        </TouchableOpacity>

        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
              {company?.logo ? (
                <>
                <Image 
                    source={{ uri: company?.logo }}
                    style={{width: 150, height: 150}}
                />
                
                </>
              ) : (
                <>
                <Image 
                    source={require('../../assets/vehicle.png')}
                    style={{width: 200, height: 200}}
                />
                </>
              )}
              
               
        </View>

        <Divider style={{marginVertical: 20}} />

        <TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text>Companys Name</Text>
                <Text>{ company?.name}</Text>
            </View>
        </TouchableOpacity>

        <Divider style={{marginVertical: 10}} />

        <TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text>Location</Text>
                <Text>{ company?.loc}</Text>
            </View>
        </TouchableOpacity>

        <Text style={{textAlign:'center', fontSize: 15, padding: 10, backgroundColor: '#000', color: '#fff', marginTop: 20}}>Report Breakdown</Text>


        <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholderStyle={{
                        color: "#456A5A",
                    }}
                    placeholder='What services do you want to request for ?'
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
        
        
        <Text style={{fontSize: 15, fontWeight: 500}}>Describe Issue </Text>
        <TextInput
        style={styles.Forminput}
        mode="outlined"
        multiline={true}
        numberOfLines={5}
        onChangeText={(e) => setName(e)}
        value={Name} />


      <DropDownPicker
                    open={openv}
                    value={vvalue}
                    items={vitems}
                    setOpen={setOpenv}
                    setValue={setvValue}
                    setItems={setvItems}
                    placeholderStyle={{
                        color: "#456A5A",
                    }}
                    placeholder='Select Vehicle'
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
                        //marginTop: 20
                    }}
        />


        {aorigin ? (
            <>
            <Button mode="contained" style={{marginTop: 20}} onPress={getLiveLocation}>
              Fetch Current Location
            </Button>
            </>
        ) : (
            <>
            {issubmitting ? <ActivityIndicator size="large" color="#1782b6"  style={{marginTop: 20}} /> : (
                <Button mode="contained" style={{marginTop: 20}} onPress={reportissue}>
                Report Issue
                </Button>
            )}
            </>
        )}


</Card.Content>
        </Card>
        )}

        </ScrollView>


      </SafeAreaView>
    )
}

export default Reportbreakdown;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});