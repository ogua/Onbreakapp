import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

function Noticeboardlist ({item,deletedata,role}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const colors = ['red','blue','black','yellow','grey','pink','violet','#17a2b8'];    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >
        <View style={{borderLeftColor: colors[Math.floor(Math.random()*colors.length)], borderWidth: 4, borderTopColor: '#fff', borderRightColor: '#fff', borderBottomColor: '#fff'}}>   
        <List.Item
            title={()=> (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{flex: 1, fontSize: 18}}>{item?.title}</Text>
                     <Text style={{fontSize: 10}}>{item?.noticefor}</Text>
                     {/* <Ionicons name="ellipsis-vertical-sharp" size={20} /> */}
                </View>
            )}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                <Text style={{fontSize: 13}}>{item?.message}</Text>
                </>
            )}
            descriptionNumberOfLines={10}
            //left={props => <Ionicons name="help-circle" {...props} size={20} />}
            //right={props => <Ionicons name="ellipsis-vertical-sharp" {...props} size={20} />}
        />
        </View>
            
        </TouchableOpacity>

        {role !== 'Student' && (
            <>
            {visible && (
                <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                    <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/Communicate/create-edit-noticeboard?id=${item?.id}`)} title="Edit" />
                    <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.title)} />
                </View>
          )}
            
            </>
        )}
        </>
    )
}

export default Noticeboardlist;