import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useSearchParams } from "expo-router";

function Hostelroomslist ({item,deletedata,hostelid}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const {id} = useSearchParams();
  

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        //onPress={() => setVisible(! visible)}
        >

        <List.Item
            title={()=> (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Ionicons name="home-outline" size={20} style={{marginRight: 10}} />
                    <Text style={{flex: 1, fontSize: 18}}>{item?.floor}</Text>
                     <Text style={{fontSize: 10}}>{item?.nobeds} Beds</Text>
                     {/* <Ionicons name="ellipsis-vertical-sharp" size={20} /> */}
                </View>
            )}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                <Text style={{fontSize: 13, marginLeft: 30}}>Room {item?.roomno}</Text>
                </>
            )}
            descriptionNumberOfLines={5}
        />
            
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#fff'}}>
            <Button onPress={()=> deletedata(item?.id,item?.floor)}>Delete</Button>
            <Button onPress={()=> router.push(`/admin/hostel/create-edit-hostel-room?id=${item?.id}&hosid=${hostelid}`)}>Edit</Button>
        </View>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/hostel/create-edit-hostel-room?id=${item?.id}&hosid=${hostelid}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.floor)} />
            </View>
        )}
        </>
    )
}

export default Hostelroomslist;