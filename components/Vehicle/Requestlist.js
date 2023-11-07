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
            <Divider style={{marginVertical: 10}} />
            <Text variant="labelLarge" style={{marginVertical: 10}}>Vehicle Information</Text>
            <Text>Name: {item?.vehicle_name}</Text>
            <Text>Model: {item?.model}</Text>
            <Text>Number plate: {item?.numberplate}</Text>
            </Card.Content>
        </Card>
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item disabled={item?.contact == "" ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call" onPress={() => Linking.openURL(`tel:${item?.contact}`)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="eye" onPress={()=> Linking.openURL(`google.navigation:q=${item?.lat},${item?.lng}`)} title="View Location" />
            </View>
        )}
        </>
    )
}

export default Requestlist;