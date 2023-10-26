import { useState } from "react";
import { Linking, TouchableWithoutFeedback, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Routelist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
         <View style={{backgroundColor: '#fff', padding: 10, marginBottom: 20}}>
        <TouchableWithoutFeedback 
        onPress={() => setVisible(! visible)}
        >
       

        <Card>
            <Card.Title title={`${item?.name} (${item?.tripway})`} subtitle={`Asigned To ${item?.assignedto}`} left={() => (
            
            <Avatar.Image 
                 source={{uri: item.assignedto_pic}}
                size={30}
            />
            
            )} />
            <Card.Content>
            {/* <Text variant="bodyMedium">Number: {item?.no}</Text> */}
            </Card.Content>
            <Card.Cover source={{ uri: item.image }} />
            <View style={{flexDirection: 'row', justifyContent: "space-around", padding: 10}}>
            <Text>#Pasengers: {item?.capacity}</Text>
            <Text>Time: {item?.pickupstart} - {item?.pickupend}</Text>
            </View>
        </Card>

        
            
        </TouchableWithoutFeedback>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item style={{marginLeft: 10}} leadingIcon="eye" title="View" onPress={()=> router.push(`/admin/transport/view-routes?id=${item?.id}`)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/transport/create-edit-routes?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.name)} />
            </View>
        )}

        </View>
        </>
    )
}

export default Routelist;