import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

function Questionnaireaddlist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <List.Item
            title={()=> (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="help-circle" size={20} style={{marginRight: 10}} />
                    <Text>{item?.question}</Text>
                </View>
            )}
            titleNumberOfLines={20}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                <Text style={{fontSize: 12, color: '#abc', marginLeft: 30}}>Order {item?.order}</Text>
                </>
            )}
            descriptionNumberOfLines={10}
        />
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/questionnaire/create-edit-question?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.question)} />
            </View>
        )}
        </>
    )
}

export default Questionnaireaddlist;