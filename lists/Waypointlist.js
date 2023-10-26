import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Waypointlist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();

    return (
        <>
        <TouchableWithoutFeedback 
        onPress={() => setVisible(! visible)}
        >

        <Card style={{backgroundColor: '#fff', padding: 10, marginBottom: 30}}>
            <Card.Title title={item?.name} subtitle={`Address: ${item?.addrress}`}  />
            <Card.Content style={{height: 100,marginBottom: 15}}>

            <MapView style={styles.map}
            mapType="mutedStandard"
                initialRegion={{
                    latitude: parseFloat(item?.latitude),
                    longitude: parseFloat(item?.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{latitude:  parseFloat(item?.latitude), longitude: parseFloat(item?.longitude)}}
                    title={item?.name}
                    />


            </MapView>
                    
            </Card.Content>
            <Text style={{marginLeft: 15}}>Latitude: {item?.latitude}</Text>
            <Text style={{marginLeft: 15, marginTop: 10}}>Longitude: {item?.longitude}</Text>
        
            {visible && (
                <View style={{marginTop: 25, backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                    <Divider bold={true} />
                    {/* <Menu.Item disabled={item?.phone == "" ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call" onPress={() => Linking.openURL(`tel:${item?.phone}`)} /> */}
                    <Menu.Item style={{marginLeft: 10}} leadingIcon="eye" onPress={()=> router.push(`/admin/transport/view-waypoint?id=${item?.id}`)} title="View" />
                    <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/transport/create-edit-waypoint?id=${item?.id}`)} title="Edit" />
                    <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.name)} />
                </View>
           )}
        
        </Card>
            
        </TouchableWithoutFeedback>

        {/* {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/transport/create-edit-vehicle?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.name)} />
            </View>
        )} */}
        </>
    )
}

export default Waypointlist;

const styles = StyleSheet.create({

    map: {
      width: '100%',
      height: '100%',
    },
});
  