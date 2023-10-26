import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency } from "../features/userinfoSlice";
import { StyleSheet } from "react-native";

function Feemasterlist ({item,deletedata}) {

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
                    <Text style={{flex: 1, fontSize: 18}}>{item?.class}</Text>
                     <Text style={{fontSize: 10}}>{item?.semester}</Text>
                     {/* <Ionicons name="ellipsis-vertical-sharp" size={20} /> */}
                </View>
            )}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                <Text style={{fontSize: 13, marginLeft: 30}}>{item?.fee} ({item?.feecode})</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                       <Text style={{fontSize: 12,color: '#abc',marginLeft: 30}}>Fee Amount {currency}{item?.feeamount}</Text>
                       <Text style={{fontSize: 12,color: '#abc',marginLeft: 30}}>Other Fee {currency}{item?.ofeeamount}</Text>
                    </View>
                    <Text style={{fontSize: 12,color: '#abc', fontWeight: 500, marginLeft: 30}}>Total {currency}{item?.total}</Text>
                </View>
                <View style={styles.ribbon}>
                <Text style={styles.ribbontext}>{item?.year}</Text>
                </View>
                
                </>
            )}
            descriptionNumberOfLines={5}
            //left={props => <Ionicons name="help-circle" {...props} size={20} />}
            //right={props => <Ionicons name="ellipsis-vertical-sharp" {...props} size={20} />}
        />
            
        </TouchableOpacity>

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

export default Feemasterlist;

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