import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

function Hostellist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => router.push(`/admin/hostel/hostel-info?id=${item?.id}`)}
        >

        <List.Item
            title={()=> (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Ionicons name="home-outline" size={20} style={{marginRight: 10}} />
                    <Text style={{flex: 1, fontSize: 18}}>{item?.name}</Text>
                     <Text style={{fontSize: 10}}>{item?.hostype}</Text>
                     {/* <Ionicons name="ellipsis-vertical-sharp" size={20} /> */}
                </View>
            )}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                <Text style={{fontSize: 13, marginLeft: 30}}>{item?.note}</Text>
                </>
            )}
            descriptionNumberOfLines={5}
        />
            
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#fff'}}>
            <Button onPress={()=> deletedata(item?.id,item?.name)}>Delete</Button>
            <Button onPress={()=> router.push(`/admin/hostel/create-edit-hostel?id=${item?.id}`)}>Edit</Button>
        </View>
        </>
    )
}

export default Hostellist;