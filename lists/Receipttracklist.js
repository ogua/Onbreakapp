import { useState } from "react";
import { ActivityIndicator, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Dialog, Divider, List, Menu,MD3Colors, Portal,ProgressBar, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { selectcurrency, selecttoken } from "../features/userinfoSlice";
import { useEffect } from "react";
import { color } from "react-native-reanimated";

function Receipttracklist ({item,deletedata}) {

    const token = useSelector(selecttoken);
    const currency = useSelector(selectcurrency);
    const [visible, setVisible] = useState(false);
    const router = useRouter();


    const working = () => {
        alert("working");
    }


    return (
        <>
        
        <View style={{backgroundColor: '#fff', marginTop: 40}}
        >
        
        <TouchableOpacity style={{zIndex: 10}} onPress={()=> deletedata(item?.id, item?.receptid)}>
             <Ionicons name="trash-bin-sharp" color="red" size={20} style={{textAlign: 'right', marginRight: 20, marginTop: 20}} />
        </TouchableOpacity>
         
         
         <View style={{justifyContent: 'center', alignItems: 'center', marginTop: -30}}>
            <Avatar.Image 
                source={{uri: item?.pic}}
                    size={90}
            />
        </View>
         
         <View style={{flex: 1, salignItems: 'center',padding: 10}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>{item?.studentname}</Text>
                <Text style={{fontSize: 15, textAlign: 'center'}}>({item?.studentid})</Text>
                <Text style={{fontSize: 15, textAlign: 'center', color: 'red'}}>
                    Receipt ID: {item?.receptid}
                  </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 15}}>Fee Code:</Text>
                    <Text style={{fontSize: 15}}>{item?.feecode}</Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 15}}>Paid:</Text>
                    <Text style={{fontSize: 15}}>{item?.amount}</Text>
                </View>
                
        </View>
        </View>
        </>
    )
}

export default Receipttracklist;

const styles = StyleSheet.create({
    textcolor: {
        color: '#fff'
    }
})