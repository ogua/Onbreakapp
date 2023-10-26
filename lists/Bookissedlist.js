import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency } from "../features/userinfoSlice";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Bookissuedlist ({item,deletedata,bookreturned,booknotreturned}) {

    const [visible, setVisible] = useState(false);
    const currency = useSelector(selectcurrency);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <Card style={{backgroundColor: item.retuneddate ? `#17a2b8` : '#fff'}}>
            <Card.Title title={`${item?.title} (${item?.subject})`} 
            subtitle={`Issued To: ${item?.issuedto}`}
            titleStyle={{color: item.retuneddate ? `#fff` : ''}}
            subtitleStyle={{color: item.retuneddate ? `#fff` : ''}}
            left={() => (

                <Avatar.Image 
                     source={{uri: item.issuedtoimg}}
                    size={30}
                />
                
                )}  
            />
            <Card.Content>
            {/* <Text variant="bodyMedium">{item?.description}</Text> */}
            </Card.Content>
            <Card.Cover source={{ uri: item.file }} />
            {item.retuneddate ? (
                <Button> <Ionicons name="md-checkmark-done-circle" size={20} /> Returned</Button>
            ) : (
            <Card.Actions>
              <Button mode="contained">Returning Date: {item?.retundate}</Button>
            </Card.Actions>
            )}
            
        </Card>
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                {/* <Menu.Item disabled={item?.phone == "" ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call" onPress={() => Linking.openURL(`tel:${item?.phone}`)} /> */}
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/library/create-edit-issue-book?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.title)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="refresh" title={`${item.retuneddate ? `Revert If Not returned` : `Returned`}`} onPress={()=> item.retuneddate ? booknotreturned(item?.id,item?.title) : bookreturned(item?.id,item?.title)} />
            </View>
        )}
        </>
    )
}

export default Bookissuedlist;