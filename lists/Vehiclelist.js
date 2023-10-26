import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Vehiclelist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <Card>
            <Card.Title title={`${item?.name} (${item?.model})`} 
            subtitle={`Asigned To ${item?.assignedto_name}`} 
            left={() => (

            <Avatar.Image 
                 source={{uri: item.assignedto_pic}}
                size={30}
            />
            
            )} />
            <Card.Content>
            {/* <Text variant="bodyMedium">Number: {item?.no}</Text> */}
            </Card.Content>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Actions>
            <Button>Capacity: {item?.capacity}</Button>
            <Button>Number: {item?.no}</Button>
            </Card.Actions>
        </Card>
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                {/* <Menu.Item disabled={item?.phone == "" ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call" onPress={() => Linking.openURL(`tel:${item?.phone}`)} /> */}
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/transport/create-edit-vehicle?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.name)} />
            </View>
        )}
        </>
    )
}

export default Vehiclelist;