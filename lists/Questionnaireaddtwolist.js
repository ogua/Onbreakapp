import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

function Questionnaireaddtwolist ({item,deletedata,qid}) {

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
                    <Button>{item?.title}</Button>
                </View>
            )}
            titleNumberOfLines={20}
            titleEllipsizeMode="middle"
            description={()=>(
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 40}}>
                  <Text style={{fontSize: 12, color: '#abc'}}>Order {item?.qorder}</Text>
                  <Text style={{fontSize: 12, color: '#abc'}}>{item?.termname}</Text>
                  <Text style={{fontSize: 12, color: '#abc'}}>{item?.stclassname}</Text>
                </View>
            )}
            descriptionNumberOfLines={10}
        />
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item style={{marginLeft: 10}} leadingIcon="eye" onPress={()=> router.push(`/admin/questionnaire/create-edit-que-two?id=${item?.id}&qid=${qid}&term=${item?.term}&stclass=${item?.stclass}`)} title="View" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.title)} />
            </View>
        )}
        </>
    )
}

export default Questionnaireaddtwolist;