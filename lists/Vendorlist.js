import { useState } from "react";
import { Linking, TouchableWithoutFeedback, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Vendorlist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
         <View style={{backgroundColor: '#fff', padding: 10, marginBottom: 20}}>
        <TouchableWithoutFeedback 
        onPress={() => setVisible(! visible)}
        >
       

        <Card>
            <Card.Title title={`${item?.name} (${item?.currency})`} subtitle={`${item?.country}`} left={() => (
            
            <Avatar.Image 
                source={{uri: item?.logo}}
                size={30}
            />
            
            )} />
            <Card.Content>
            {/* <Text variant="bodyMedium">Number: {item?.no}</Text> */}
            </Card.Content>
            <Card.Cover source={{ uri: item.file }} />
            <View style={{flexDirection: 'row', justifyContent: "space-around", padding: 10}}>
            <Text>{item?.address}, {item?.towncity}, {item?.province}</Text>
            {/* <Text>{item?.towncity}</Text> */}
            </View>
            {/* <Text style={{marginLeft: 20, fontWeight: 500}}>Tel: ({item?.zipcode}){item?.phone}</Text>
            <Text style={{marginLeft: 20, fontWeight: 500, marginVertical: 5}}>Email: {item?.email}</Text>     */}
        </Card>

        
            
        </TouchableWithoutFeedback>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item disabled={item?.phone == "" ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call" onPress={() => Linking.openURL(`tel:${item?.phone}`)} />
                <Menu.Item disabled={item?.email == "" ? true: false} style={{marginLeft: 10}} leadingIcon="mail" title="Email" onPress={() => Linking.openURL(`mailto:${item?.email}`)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/Accounts/create-edit-vendors?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.name)} />
            </View>
        )}

        </View>
        </>
    )
}

export default Vendorlist;