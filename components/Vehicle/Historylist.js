import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Historylist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <Card>
            <Card.Title title={`${item?.name}`} 
            subtitle={`${item?.servicename}`} 
            left={() => (

            <Avatar.Image 
                 source={{uri: item.avatar}}
                size={30}
            />
            
            )} />
            <Card.Content>
            <Text variant="bodyMedium">{item?.note}</Text>
            </Card.Content>
        </Card>
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                {/* <Menu.Item disabled={item?.phone == "" ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call" onPress={() => Linking.openURL(`tel:${item?.phone}`)} /> */}
                <Menu.Item style={{marginLeft: 10}} leadingIcon="eye" onPress={()=> router.push(`/admin/company-info?id=${item?.prv_id}&name=${item?.name}`)} title="View Company" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="mail" title="Rate" onPress={()=> router.push(`/admin/rate-provider?id=${item?.prv_id}&name=${item?.name}`)} />
                {/* <Menu.Item style={{marginLeft: 10}} leadingIcon="mail" title="Chat" onPress={()=> router.push(`/admin/chat?id=${item?.prv_id}&name=${item?.name}`)} /> */}
            </View>
        )}
        </>
    )
}

export default Historylist;