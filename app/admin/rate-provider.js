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
import StarRating from 'react-native-star-rating-widget';


function Rateprovider() {



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
    const {id,name} = useSearchParams();

    const [company, setcompany] = useState({});
    const [vitems, setvItems] = useState([]);

    const [rate, setrate] = useState(0);


    useEffect(()=>{
        loaddata();
    },[]);

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

    function companyreview() {

        return axios.get(schoolzapi+'/companys-info-review/'+id,
        {
            headers: {Accept: 'application/json'
        }
        });
    }

    const loaddata = () => {
        setLoading(true);
        
        Promise.all([fetchcompany(), fetchcompanyserv(), companyreview()])
        .then(function (results) {

            const company = results[0];
            const serv = results[1];
            const review = results[2];

            setcompany(company.data);
            setItems(serv.data);
            setvItems(review.data);

            console.log("company.data",company.data);

            setLoading(false);

        }).catch(function(error){
            setLoading(false);

            console.log("error",error);

           
            
        });
    }



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


    const ratecompany = () => {

        if(rate == "0"){
          alert('Rate cant be empty');
          return;
        }


        if(color == ""){
          alert('Note cant be empty');
          return;
        }


        setIssubmitting(true);

        const data = new FormData();

        data.append('user_id',user?.id);
        data.append('prvider_id',company?.user_id);
        data.append('rate',rate);
        data.append('note',color);

        axios.post(schoolzapi+'/rate-company',
        data,
        {
            headers: {Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
        })
          .then(function (response) {
            setIssubmitting(false);
            alert("Recorded successfully!");
            setrate(0);
            setcolor("");
           
          })
          .catch(function (error) {
            setIssubmitting(false);
            console.log(error);
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
                headerTitle: "Rate Provider",
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

        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
              {company?.logo ? (
                <>
                <Image 
                    source={{ uri: company?.logo }}
                    style={{width: 200, height: 200}}
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


        <Text style={{fontSize: 15, fontWeight: 500, marginTop: 20}}>Rate</Text> 
        
        <StarRating
            rating={rate}
            onChange={setrate}
       />
       <Text style={{fontSize: 15, fontWeight: 500}}>{rate} </Text> 


        <Text style={{fontSize: 15, fontWeight: 500, marginTop: 10}}>Note</Text>
        <TextInput
        style={styles.Forminput}
        multiline={true}
        numberOfLines={5}
        mode="outlined"
        onChangeText={(e) => setcolor(e)}
        value={color} />

        {issubmitting ? <ActivityIndicator size="large" color="#1782b6" /> : (
        <Button mode="contained" onPress={ratecompany} style={{marginTop: 20}}>
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

export default Rateprovider;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});