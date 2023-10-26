import axios from 'axios';
import { Redirect, Stack, useRouter, useSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, DeviceEventEmitter, Dimensions, KeyboardAvoidingView, Linking, PermissionsAndroid, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Avatar, Button, Card, Divider, Modal, TextInput, PaperProvider, Portal, List, IconButton  } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import { schoolzapi, images } from '../../components/constants';
import { FlatList,Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from "react-native-maps-directions";
import { selectdesaddress, selectdestination, selectorgaddress, seleteorigin, setDestination, setOrgaddress, setOrigin } from '../../features/examSlice';
import * as Location from 'expo-location';
import { selecttoken } from '../../features/userinfoSlice';

function Dashboard() {

    const token = useSelector(selecttoken);
    const dispatch = useDispatch();
    const [waypoints, setWaypoints] = useState([]);
    const [students, setstudents] = useState([]);
    const [staff, setstaff] = useState([]);
    const [route, setroutes] = useState({});
    
    const [latitude, setlatitude] = useState(""); 
    const [logitude, setlogitude] = useState("");
    const [address, setaddress] = useState("");
    const [routename,setroutename] = useState("");
    
    const SCREEN_HEIGHT = Dimensions.get("window").height;
    const [isloading, setLoading] = useState(false);
    const router = useRouter();
    const {id,mylatitiude,mylongitude,myaddress} = useSearchParams();

    const [dlatitude, setdlatitude] = useState(mylatitiude); 
    const [dlogitude, setdlogitude] = useState(mylongitude);
    const [daddress, setdaddress] = useState(myaddress);
    const [distance, setdistance] = useState("");
    const [time, settime] = useState("");
    const [heading, setheading] = useState(100);

    const [details, setdetails] = useState("");


    const origin = useSelector(seleteorigin);
    const originaddress = useSelector(selectorgaddress);
    const destination = useSelector(selectdestination);
    const destaddress = useSelector(selectdesaddress);

    const setautoref = useRef();

    const mapref = useRef(null);
    const markerRef = useRef();

    const [providers, setproviders] = useState([]);

    const [mylocation, setmylocation] = useState(null);
    const [mylocationadd, setmylocationadd] = useState(null);
    const [usemylocation, setusemylocation] = useState(false);

    const [height, setheight] = useState(SCREEN_HEIGHT);

    const [state, setState] = useState({
      coordinate: new AnimatedRegion({
          latitude: origin?.latitude ?? 5.5981754,
          longitude: origin?.longitude ?? -0.1125837,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
      }),
  })


   const { coordinate } = state;

   const [openmodal, setopenmodal] = useState(false);


   const filldetails = (item) => {
      setheight((SCREEN_HEIGHT-((SCREEN_HEIGHT/2)/2)-40));
      setdetails(item);
   }

   const cancelview = (item) => {
    setheight(SCREEN_HEIGHT);
    setdetails("");
 }


function getLiveLocation(){

  (async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    if(location){

    dispatch(setDestination({latitude: location.coords.latitude,longitude: location.coords.longitude}));

    getdriverlocation();


    }
    
    
  })();
}


const getdriverlocation = () => {
  
  axios.get(schoolzapi+'/routes/show/'+id,
{
    headers: {Accept: 'application/json',
    Authorization: "Bearer "+token
}
})
  .then(function (results) {
      
      setroutes(results.data.data);

     // console.log("live location",results.data.data.address);

      const lat = parseFloat(results.data.data.latitude);
      const lng = parseFloat(results.data.data.longitude);
      const address = results.data.data.address;

      setheading(parseFloat(results.data.data.heading));

      dispatch(setOrigin({latitude: lat,longitude: lng}));
      dispatch(setOrgaddress(address));

      animate(lat, lng);

            setState({
                coordinate: new AnimatedRegion({
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                })
            })

      // fetchaddress(lat, lng);

  }).catch(function(error){
      
      console.log("error",error);
  });
}


const fetchaddress = (lat, lng) => {
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
     // console.log("responseJson",responseJson?.results[0]);
     // console.log("responseJson",responseJson?.results[0]?.formatted_address);
      dispatch(setOrgaddress(responseJson?.results[0]?.formatted_address));
    });
}



const animate = (latitude, longitude) => {
  const newCoordinate = { latitude, longitude };
  if (Platform.OS == 'android') {
      if (markerRef.current) {
          markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
  } else {
      coordinate.timing(newCoordinate).start();
  }
}




    // useEffect(()=> {
    //   if(destination == null || origin == null) return;
     
    //    const traveltime = async() => {
    //     fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destaddress}
    //     &origins=${address}&units=imperial&key=AIzaSyAJYTDdNireWqKZ5Y8yNbwqW8YMAreLjTo`)
    //     .then((respone) => respone.json())
    //     .then((data) => {
    //         setdistance(data.rows[0].elements[0]);
    //      });
    //    };

    //    traveltime();
        
    // },[destination,destaddress]);


     useEffect(()=> {

       loaddata();
        
    },[]);




    



    const loaddata = () => {
      setLoading(true);

      console.log("loading");
      
      axios.get(schoolzapi+'/all-company',
    {
        headers: {Accept: 'application/json'
    }
    })
      .then(function (results) {
          
        setproviders(results.data);
        console.log("results",results.data);
        setLoading(false);

      }).catch(function(error){
          setLoading(false);
          console.log("error",error);
          
      });
  }

    return (
      <PaperProvider>
      <SafeAreaView>
        <Stack.Screen
            options={{
                headerTitle: 'Service Providers',
                presentation: 'formSheet'
            }}

        />

        <ScrollView keyboardShouldPersistTaps='always'
        >
        {isloading ? <ActivityIndicator size="large" color="#1782b6" /> : (
        <Card>
        <Card.Content>
        
        <View style={{height: height}}>
        
        {/* <TouchableOpacity onPress={()=> setusemylocation(false)} style={{position: 'absolute', zIndex: 1000, right: 0, top: 10}}>
          <Ionicons name="locate-sharp" size={40} />
        </TouchableOpacity> */}
        
        <MapView style={styles.map}
            ref={mapref}
            mapType="mutedStandard"
                initialRegion={{
                    latitude: parseFloat(origin?.latitude ?? 5.5981754),
                    longitude: parseFloat(origin?.longitude ?? -0.1125837),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >

            {origin && (

            <Marker
              ref={markerRef}
              coordinate={{latitude: parseFloat(origin.latitude),longitude: parseFloat(origin.longitude)}}
              title={`Your Location`}
              //description={address}
              identifier='origin'
            />

            )}
                    
           

            {providers.map((item,index) => (

              <>

             <Marker
              ref={markerRef}
              coordinate={{latitude: parseFloat(item.lat),longitude: parseFloat(item.lng)}}
              title={`${item.name}`}
              description={item.loc}
              identifier='origin'
              onPress={()=> filldetails(item)}
            >
              <Image source={{ uri: item.logo }}
                  resizeMode="contain"
                  style={{
                    width: 100,
                    height: 100,
                  }}
              />

            </Marker>

            
              
              </>

            ))}

           </MapView>
            {/* <Button mode="contained" style={{position: 'absolute', bottom: 140, zIndex: 1000, right: 0, left: 0}}>Report Breakdown</Button> */}
          
        </View>

        <View>
          {details != "" && (
            <>
            
        <Card>
           <Card.Content>
           <List.Item
                title={details?.name}
                description={details?.loc}
                left={() => 
                  <Image source={{ uri: details?.logo }}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
              />
                }
                right={() => 
                  <View>
                    <Button style="styles.cancelButton" onPress={()=> router.push(`/admin/company-info?id=${details?.id}&name=${details?.name}`)}>View</Button>
                    <Button mode="contained" onPress={()=> router.push(`/admin/report-breakdown?id=${details?.id}`)}>Report</Button>
                  </View>
                }
              />
              
           </Card.Content>
           </Card>
           </>
          )}
        </View>
                       
                        
         <Divider style={{marginVertical: 20}} />

       </Card.Content>
        </Card>
        )}
        </ScrollView>

      </SafeAreaView>
      </PaperProvider>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});