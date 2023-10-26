import { useState } from "react";
import { Linking, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function Elearninglist ({item,deletedata,setvideoid,role}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
         <View style={{marginBottom: 20}}>

       
        <Card style={{backgroundColor: '#fff'}}>

        <TouchableHighlight style={{backgroundColor: '#fff'}}
        onPress={() => setvideoid(item?.linkid)}>

            <Card.Title title={`${item?.title} (${item?.duration})`} left={() => (
            
            <Avatar.Image 
                 source={{uri: item.pic}}
                size={30}
            />
            
            )} />

        </TouchableHighlight>

        {role !== "Student" && (

            <View style={[styles.rowBack,{marginBottom: 10}]}>
                <Button onPress={()=> router.push(`/admin/elearning/create-edit-e-learning?id=${item.id}`)}>Edit</Button>
                <Button onPress={() => deletedata(item.id,item.title)}>Delete</Button>
            </View>
            
        )}

        
            
        </Card>

            
        

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

export default Elearninglist;

const styles = StyleSheet.create({

    separator: {
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    rowBack: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: "flex-end",
      paddingHorizontal: 30
    },
});