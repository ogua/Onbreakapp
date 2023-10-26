import { useState } from "react";
import { ActivityIndicator, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Dialog, Divider, List, Menu,MD3Colors, Portal,ProgressBar, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { selectcurrency, selectroles, selecttoken } from "../features/userinfoSlice";
import { useEffect } from "react";
import { color } from "react-native-reanimated";

function Transactionlist ({item,deletedata,studentclasslist,revertfee}) {

    const token = useSelector(selecttoken);
    const role = useSelector(selectroles);
    const currency = useSelector(selectcurrency);
    const [visible, setVisible] = useState(false);
    const router = useRouter();


    return (
        <>
        
        <TouchableOpacity style={{backgroundColor: '#fff', marginTop: 40}}
        onPress={() => setVisible(! visible)}
        >

        

         <View style={{justifyContent: 'center', alignItems: 'center', marginTop: -30}}>
            <Avatar.Image 
                source={{uri: item?.pic}}
                    size={90}
            />
        </View>
         
         <View style={{flex: 1, salignItems: 'center',padding: 10}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>{item?.fullname}</Text>
                <Text style={{fontSize: 15, textAlign: 'center'}}>{item?.stclass} - ({item?.stdntid}) </Text>
                <Text style={{fontSize: 15, textAlign: 'center'}}>{item?.reference}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 15}}>Previous Owe:</Text>
                    <Text style={{fontSize: 15}}>{currency}{item?.prevowe}</Text>
                </View>

                <Divider bold={true}  style={{marginVertical: 10}}/>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 15}}>Paid Now:</Text>
                    <Text style={{fontSize: 15}}>{currency}{item?.amountpaid}</Text>
                </View>

                <Divider bold={true}  style={{marginVertical: 10}}/>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 15}}>Owing:</Text>
                    <Text style={{fontSize: 15}}>{currency}{item?.owenow}</Text>
                </View>

            {role[0] !== "Student" && (
                <Button onPress={()=> revertfee(item?.id,item?.stdntid,(currency+item?.amountpaid))} icon="refresh" textColor="red" style={{marginTop: 20}}>Revert</Button>
            )}
            
                
        </View>
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000',padding: 10}}>
                <Divider bold={true}  style={{marginVertical: 10}}/>
                
                <Text>{item?.transtype}</Text>

                <Divider bold={true}  style={{marginVertical: 10}}/>

                <Text>Received By: {item?.receivedby}</Text>

                <Divider bold={true}  style={{marginVertical: 10}}/>

                <Text style={{textAlign: 'center'}}>{item?.date}</Text>
            </View>
        )}
        </>
    )
}

export default Transactionlist;

const styles = StyleSheet.create({
    textcolor: {
        color: '#fff'
    }
})