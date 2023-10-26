import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Userlist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
         onPress={()=> router.push(`/admin/online-chat?id=${item?.prvider_id}&name=${item?.name}&muser=${item?.user_id}`)}
        >

        <Card>
            <Card.Title title={`${item?.username}`} 
            left={() => (
            <Avatar.Image 
                 source={{uri: item.userimg}}
                size={30}
            />
            
            )} />
        </Card>
            
        </TouchableOpacity>
        </>
    )
}

export default Userlist;