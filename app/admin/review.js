import axios from 'axios';
import { Redirect, Stack, useRouter, useSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, DeviceEventEmitter, PermissionsAndroid, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
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
import StarRating from 'react-native-star-rating-widget';


function Companyreview() {
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

    console.log("id",id);
    console.log("+user?.id",+user?.id);

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

        return axios.get(schoolzapi+'/review/'+id,
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



            console.log("company",vitems);

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
                <Button mode="elevated" style={{marginRight: 20}} onPress={()=> router.push(`/admin/location?id=${id}&name=${name}`)}>Location</Button>
                <Button mode="contained"  style={{marginRight: 20}} onPress={()=> router.push(`/admin/review?id=${id}&name=${name}`)}>Reviews</Button>
                <Button mode="elevated"  style={{marginRight: 20}} onPress={()=> router.push(`/admin/chat?id=${id}&name=${name}`)}>Chat</Button>
                {company && <Button mode="elevated"  style={{marginRight: 20}} onPress={()=> Linking.openURL(`tel:${company?.contact}`)}>Call</Button>}
            </View>
        </ScrollView>

       {vitems.map((item,index) => (
        <>
            
            
            <List.Item
                title={() => (
                    <>
                    <Text>{item?.user_name}</Text>
                    <StarRating
                        rating={item?.rate}
                        starSize={15}
                    /></>
                )}
                description={item?.note}
                descriptionNumberOfLines={30}
                left={() => 
                  <Image source={{ uri: item?.user_logo }}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
              />
                }
              />
              
        </>
       ))}


</Card.Content>
        </Card>
        )}

        </ScrollView>


      </SafeAreaView>
    )
}

export default Companyreview;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});