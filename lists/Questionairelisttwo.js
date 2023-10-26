import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

function Questionairelisttwo ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <List.Item
            title={()=> (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Ionicons name="help-circle" size={20} style={{marginRight: 10}} />
                    <Text style={{flex: 1, fontSize: 18}}>{item?.stclassname}</Text>
                     <Text style={{fontSize: 10}}>{item?.termname}</Text>
                </View>
            )}
            titleEllipsizeMode="middle"
            // description={()=>(
            //     <>
            //     <Text style={{fontSize: 12, color: '#abc', marginLeft: 30}}>Duration: {item?.duration} - Follow up: {item?.followupdate}</Text>
            //     <Text style={{fontSize: 13,marginLeft: 30}}>{item?.note}</Text>
            //     </>
            // )}
            descriptionNumberOfLines={5}
        />
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item style={{marginLeft: 10}} leadingIcon="plus" onPress={()=> router.push(`/admin/questionnaire/add-questionnaire-two?qid=${item?.id}&term=${item?.term}&stclass=${item?.stclass}`)} title="Questions" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/questionnaire/sampletwo?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.stclassname)} />
            </View>
        )}
        </>
    )
}

export default Questionairelisttwo;