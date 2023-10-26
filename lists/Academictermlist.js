import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

function Academictermlist ({item,deletedata,role}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();

   // console.log(item);

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >
        <List.Item
            title={item?.name}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                </>
            )}
        />
            
        </TouchableOpacity>

        {role !== 'Student' && (
            <>
            {visible && (
                <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                    <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/Academics/edit-academic?id=${item?.id}`)} title="Edit" />
                    <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.name)} />
                </View>
          )}
            
            </>
        )}
        </>
    )
}

export default Academictermlist;