import { useState } from "react";
import { ActivityIndicator, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Dialog, Divider, List, Menu,MD3Colors, Portal,ProgressBar, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { selectcurrency, selecttoken } from "../features/userinfoSlice";
import { useEffect } from "react";
import { color } from "react-native-reanimated";

function Roomsallocatedlist ({item,deletedata,studentclasslist,releasebed}) {

    const token = useSelector(selecttoken);
    const currency = useSelector(selectcurrency);
    const [visible, setVisible] = useState(false);
    const router = useRouter();


    return (
        <>
        
        <TouchableOpacity style={{backgroundColor: '#fff', marginTop: 40}}
       // onPress={() => setVisible(! visible)}
        >
         <View style={{justifyContent: 'center', alignItems: 'center', marginTop: -30}}>
            <Avatar.Image 
                source={{uri: item?.pic}}
                    size={90}
            />
        </View>
         
         <View style={{flex: 1, salignItems: 'center',padding: 10}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>{item?.fullname}</Text>
                <Text style={{fontSize: 15, textAlign: 'center'}}>{item?.currentlevel}</Text>
                <Text style={{fontSize: 15, textAlign: 'center'}}>
                    {item?.hostel} - {item?.floor}
                </Text>
                <Text style={{fontSize: 15, textAlign: 'center'}}>
                    Room {item?.roomno} - Bed#{item?.bed}
                </Text>
        </View>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: "space-around", backgroundColor: '#fff'}}>
            <Button onPress={()=> releasebed(item?.id,item?.bed,item?.fullname)}>Release Bed</Button>
            <Button onPress={()=> deletedata(item?.id,item?.floor)}>Delete</Button>
            <Button onPress={()=> router.push(`/admin/hostel/create-edit-allocate-student?id=${item?.id}`)}>Edit</Button>
        </View>

        {visible && (
            <View style={{backgroundColor: `${visible ? '#fff' : '#fff'}`, borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Divider bold={true} />
                <Menu.Item style={[styles.textcolor,{marginLeft: 10}]} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/Accounts/edit-dispatched?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.studentname)} />
            </View>
        )}
        </>
    )
}

export default Roomsallocatedlist;

const styles = StyleSheet.create({
    textcolor: {
        color: '#fff'
    }
})