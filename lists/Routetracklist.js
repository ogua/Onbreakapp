import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Linking, TouchableWithoutFeedback, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { schoolzapi } from "../components/constants";
import { useSelector } from "react-redux";
import { selecttoken } from "../features/userinfoSlice";
import axios from "axios";
//import Geolocation from '@react-native-community/geolocation';


const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Routetracklist ({item,deletedata,location,driver}) {

    const token = useSelector(selecttoken);
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const [latitude, setlatitude] = useState("");
    const [longitude, setlongitude] = useState("");
    const [address, setaddress] = useState("");
    const [isloading, setLoading] = useState(false);
    
    
    


    const trackbus = () => {

        router.push(`/admin/transport/view-route-track?id=${item?.id}`);

    }

    const starttrip = () => {
        
        return Alert.alert(
            "Are your sure?",
            "You want to start this trip",
            [
              {
                text: "No",
              },
              {
                text: "Yes Start",
                onPress: () => {
                    setLoading(true);

                        const formdata = {
                            id: item?.id    
                        }

                        axios.post(schoolzapi+'/start-route',
                        formdata,
                        {
                            headers: {Accept: 'application/json',
                            Authorization: "Bearer "+token
                        }
                        })
                        .then(function (response) {
                            setLoading(false);
                            router.push(`/admin/transport/view-route-track?id=${item?.id}`);
                        })
                        .catch(function (error) {
                            setLoading(false);
                            console.log(error.response);
                        });

                },
              },
            ]
          );

    }


    return (
        <>
         <View style={{backgroundColor: '#fff', padding: 10, marginBottom: 20}}>
        <TouchableWithoutFeedback 
        
        >

        <Card>
            <Card.Title title={`${item?.name} (${item?.tripway})`} 
           // subtitle={`Driver ${item?.assignedto}`}
            
            left={() => (
            <Avatar.Image 
                 source={{uri: item.assignedto_pic}}
                size={30}
              />
            )}
            
            />
            <Text style={{textAlign: 'center'}}>{`Driver ${item?.assignedto}`}</Text>
            <View style={{flexDirection: 'row', justifyContent: "space-around", padding: 10}}>
            <Text>#Passengers {item?.capacity}</Text>
            <Text>Time: {item?.pickupstart}</Text>
            </View>
            <Text style={{color: 'red', textAlign: 'center'}}> {item?.status == '0' ? 'Not Started' : (item?.status == '1' ? "Route Started" : 'Route Ended')}</Text>
            {driver == 'Driver' ? (
                <>
                {isloading ? <ActivityIndicator size="large" /> : (
                    <Button onPress={starttrip}>
                        Start Trip
                    </Button>
                ) }
                </>
            ) : (
                <Button onPress={trackbus}>Track Route</Button>
            )}

              <Card.Content>
            </Card.Content>
            
        </Card>

            
        </TouchableWithoutFeedback>

        </View>
        </>
    )
}

export default Routetracklist;