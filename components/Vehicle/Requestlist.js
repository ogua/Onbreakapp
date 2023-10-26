import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Requestlist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <Card>
            <Card.Title title={`${item?.username}`} 
            left={() => (

            <Avatar.Image 
                 source={{uri: item.userimg}}
                size={30}
            />
            
            )} />
            <Card.Content>
            <Text variant="bodyMedium">{item?.note}</Text>
            </Card.Content>
        </Card>
            
        </TouchableOpacity>
        </>
    )
}

export default Requestlist;