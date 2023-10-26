import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency } from "../features/userinfoSlice";
import { StyleSheet } from "react-native";

function Chartofaccountlist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const currency = useSelector(selectcurrency);
    const router = useRouter();    

    return (
        <>
        <View style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15}}>
            <TouchableOpacity style={{marginRight: 20}} onPress={()=> router.push(`/admin/Accounts/create-edit-chart-of-accounts?id=${item?.id}`)}>
                <Ionicons name="ios-pencil-outline" size={20} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deletedata(item?.id,item?.title)} style={{marginRight: 20}}>
                <Ionicons name="trash" color="red" size={20} />
            </TouchableOpacity>
            
        </View>

        <List.Item
            title={()=> (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Ionicons name="cash" size={20} style={{marginRight: 10}} />
                    <Text style={{flex: 1, fontSize: 18}}>{item?.title.toUpperCase()} ({item?.currency})</Text>
                     <Text style={{fontSize: 10}}>{item?.type}</Text>
                     {/* <Ionicons name="ellipsis-vertical-sharp" size={20} /> */}
                </View>
            )}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                <Text style={{fontSize: 13, marginLeft: 30}}>{item?.bname.toUpperCase()} ({item?.number})</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                       <Text style={{fontSize: 12,color: '#abc',marginLeft: 30}}>Phone {item?.bphone}</Text>
                       <Text style={{fontSize: 12,color: '#abc',marginLeft: 30}}>Opening Balance {currency}{item?.openingbal}</Text>
                    </View>
                </View>
                <View style={styles.ribbon}>
                <Text style={styles.ribbontext}>{item?.status == `1` ? `DEFAULT` : null}</Text>
                </View>
                
                </>
            )}
            descriptionNumberOfLines={5}
        />
            
        </View>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                {/* <Menu.Item disabled={item?.doc == "" ? true: false} style={{marginLeft: 10}} leadingIcon="download-circle" title="Downlaod Attachment" onPress={() => Linking.openURL(`mailto:${item?.email}`)} /> */}
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/Accounts/create-edit-feemaster?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.class+' ('+item?.fee+')')} />
            </View>
        )}
        </>
    )
}

export default Chartofaccountlist;

const styles = StyleSheet.create({
    ribbon: {
        position: "absolute",
        bottom: -15,
        right: -70,
        zIndex: 1,
        paddingTop: 10,
        overflow: "hidden",
        width: 120,
        height: 80,
        textAlign: "right",
    },
    ribbontext: {
        transform: [{ rotate: "295deg" }],
        color: '#9BC90D',
        fontSize: 20
    }
});