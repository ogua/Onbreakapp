import { useState } from "react";
import { Linking, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Teachingloglist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <Card>
            <Card.Title title={`${item?.user_name}`} 
            subtitle={`${item?.subject}`} left={() => (

            <Avatar.Image 
                 source={{uri: item.pic}}
                size={30}
            />
            
            )} />
            <Card.Content>
            <Text variant="bodyMedium">{item?.note}</Text>
            <View bold={true} style={{marginVertical: 15}}></View>
            <Text variant="bodySmall">{`From ${item?.starttime} - To ${item?.endtime}`}</Text>
            <Text variant="bodySmall">{item?.startdate}</Text>
            </Card.Content>
        </Card>
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                {/* <Menu.Item disabled={item?.phone == "" ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call" onPress={() => Linking.openURL(`tel:${item?.phone}`)} /> */}
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/custom/create-edit-teachinglog?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.subject)} />
            </View>
        )}
        </>
    )
}

export default Teachingloglist;