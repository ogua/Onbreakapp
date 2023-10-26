import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency } from "../features/userinfoSlice";
import { StyleSheet } from "react-native";

function Questionbanklist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const currency = useSelector(selectcurrency);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <List.Item
            title={()=> (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Ionicons name="cash" size={20} style={{marginRight: 10}} />
                    <Text style={{flex: 1, fontSize: 18}}>{item?.title}</Text>
                     <Text style={{fontSize: 10}}>{item?.stclass}</Text>
                     {/* <Ionicons name="ellipsis-vertical-sharp" size={20} /> */}
                </View>
            )}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                <Text style={{fontSize: 13, marginLeft: 30}}>{item?.subject}</Text>
                <Text style={{fontSize: 13, marginLeft: 30}}>Created By: {item?.fullname}</Text>                
                </>
            )}
            descriptionNumberOfLines={5}
            //left={props => <Ionicons name="help-circle" {...props} size={20} />}
            //right={props => <Ionicons name="ellipsis-vertical-sharp" {...props} size={20} />}
        />
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item style={{marginLeft: 10}} leadingIcon="plus" title="Add Questions" onPress={()=> router.push(`/admin/quiz/add-questions?id=${item?.id}`)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/quiz/create-edit-question-bank?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.title)} />
            </View>
        )}
        </>
    )
}

export default Questionbanklist;

const styles = StyleSheet.create({
    ribbon: {
        position: "absolute",
        bottom: -45,
        right: -40,
        zIndex: 1,
        overflow: "hidden",
        width: 70,
        height: 70,
        textAlign: "right",
    },
    ribbontext: {
        transform: [{ rotate: "295deg" }],
        color: '#9BC90D',
        fontSize: 20
    }
});