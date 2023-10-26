import axios from 'axios';
import { Redirect, Stack, useRouter, useSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert,Dimensions, DeviceEventEmitter, PermissionsAndroid, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, Card, Divider, List, TextInput } from 'react-native-paper';
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
import { Linking } from 'react-native';
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import { useRef } from 'react';


function Locationn() {

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
    const {id,name} = useSearchParams();

    const mapref = useRef(null);
    const markerRef = useRef();

    //console.log("id",id);
   // console.log("+user?.id",+user?.id);
    const SCREEN_HEIGHT = Dimensions.get("window").height;

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


    return (
      <SafeAreaView>
        <Stack.Screen
            options={{
                headerTitle: "",
                presentation: 'formSheet',
                headerShown: true,
                headerLeft: () => (
                  <>
                    <TouchableOpacity onPress={()=> router.back()}>
                        <Ionicons name="arrow-back-circle" size={30} />
                    </TouchableOpacity>
                  </>
                )
            }}

        />
        <ScrollView style={{marginBottom: 30}}>
        {isloading ? <ActivityIndicator size="large" color="#1782b6" style={{marginTop: 50}} /> : (
        <Card>
        <Card.Content>

        <ScrollView horizontal={true}>
            <View style={{flexDirection: 'row', justifyContent: "space-around"}}>
                <Button mode="contained" style={{marginRight: 20}} onPress={()=> router.push(`/admin/location?id=${id}&name=${name}`)}>Location</Button>
                <Button mode="elevated"  style={{marginRight: 20}} onPress={()=> router.push(`/admin/review?id=${id}&name=${name}`)}>Reviews</Button>
                <Button mode="elevated"  style={{marginRight: 20}} onPress={()=> router.push(`/admin/online-chat?id=${id}&name=${name}`)}>Chat</Button>
                {company && <Button mode="elevated"  style={{marginRight: 20}} onPress={()=> Linking.openURL(`tel:${company?.contact}`)}>Call</Button>}
            </View>
        </ScrollView>

        <View style={{height: SCREEN_HEIGHT}}>

        {company && (
        <>
        <MapView style={styles.map}
            ref={mapref}
            mapType="mutedStandard"
                initialRegion={{
                    latitude: parseFloat(company?.lat ?? 5.5981754),
                    longitude: parseFloat(company?.lng ?? -0.1125837),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >

            <Marker
              ref={markerRef}
              coordinate={{latitude: parseFloat(company?.lat),longitude: parseFloat(company?.lng)}}
              title={`${company.name}`}
              description={company.loc}
              identifier='origin'
            />        

           </MapView>
            <Button mode="contained" style={{position: 'absolute', bottom: 140, zIndex: 1000, right: 0, left: 0}} onPress={()=> Linking.openURL(`google.navigation:q=${company?.lat},${company?.lng}`)}>Navigate</Button>
            </>
            )}
        </View>


</Card.Content>
        </Card>
        )}

        </ScrollView>


      </SafeAreaView>
    )
}

export default Locationn;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
});