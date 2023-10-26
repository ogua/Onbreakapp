import { useState } from "react";
import { ActivityIndicator, Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text, TextInput } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency } from "../features/userinfoSlice";
import { StyleSheet } from "react-native";

function Payfeelist ({item,deletedata,payfees,feeisloading}) {

    const [visible, setVisible] = useState(false);
    const [paynow, setpaynow] = useState("");
    
    const currency = useSelector(selectcurrency);
    const router = useRouter();


    return (
        <>
        <View style={{backgroundColor: '#fff', padding: 10, marginBottom: 20, borderRadius: 30}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15}}>
            <TouchableOpacity style={{marginRight: 20}} onPress={()=> router.push(`/admin/Accounts/edit-dispatched?id=${item?.id}`)}>
                <Ionicons name="pencil-sharp" size={20} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deletedata(item?.id,item?.fee)} style={{marginRight: 20}}>
                <Ionicons name="trash-bin-sharp" color="red" size={20} />
            </TouchableOpacity>
            
        </View>
        <Text style={{fontSize: 14, marginLeft: 30}}>{item?.fee} ({item?.feecode})</Text>
            <View>
                <Divider bold={true} style={{marginVertical: 10}} />
                <Text style={{fontSize: 13,marginLeft: 30}}> Fee Amount {currency}{item?.feeamount}</Text>
                <Divider bold={true} style={{marginVertical: 10}} />
                <Text style={{fontSize: 13,marginLeft: 30}}>Paid {currency}{item?.paid}</Text>
                <Divider bold={true} style={{marginVertical: 10}} />
                <Text style={{fontSize: 13,marginLeft: 30}}>Owe {currency}{item?.owed}</Text>
            </View>
            <View style={{marginTop: 10}}>
                <TextInput
                  label="Payable"
                   keyboardType="numeric"
                   mode="outlined"
                    value={paynow}
                    onChangeText={(e) => setpaynow(e)}
                />

                {feeisloading ? <ActivityIndicator size="large" /> : (
                    <Button mode="text" onPress={() => payfees(item?.id,paynow,item?.fee)} style={{marginTop: 10}}>Pay</Button>
                )}
                
            </View>
        </View>
        </>
    )
}

export default Payfeelist;

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