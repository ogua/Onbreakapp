import { useState } from "react";
import { Linking, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Terminalsiglist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <Card>
            <Card.Title title={`${item?.stclass}`} subtitle={``} left={() => (

            <Avatar.Image 
                 source={{uri: item.signimg}}
                size={30}
            />
            
            )} />
            <Card.Content>
                {item?.type == 'initials' && (
                    <Text variant="headlineLarge">{item?.initial}</Text>
                )}

            </Card.Content>
            {item?.type == 'Image' && (
                <Card.Cover source={{ uri: item?.signature }} />
            )}
            
            <Card.Actions>
            
              <Button>{item?.type}</Button>
        
            </Card.Actions>
        </Card>
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                {/* <Menu.Item disabled={item?.phone == "" ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call" onPress={() => Linking.openURL(`tel:${item?.phone}`)} /> */}
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/custom/create-edit-terminal-sig?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.stclass)} />
            </View>
        )}
        </>
    )
}

export default Terminalsiglist;