import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

function Normallist ({item,deletedata,searchclass}) {

    const [active, setActive] = useState(false);
    const router = useRouter();  

    return (
        <>
        <TouchableOpacity style={{backgroundColor: `${active ? `#1782b6` : `#fff` }`, borderRadius: 30, marginTop: 10, marginRight: 20}}
        onPress={()=> {
            setActive(!active);
            searchclass(item?.id);
        }}
        >
        <List.Item
            title={item?.name}
            titleStyle={{color: `${active ? `#fff` : `#000` }`}}
            titleEllipsizeMode="middle"        />
        </TouchableOpacity>
        </>
    )
}

export default Normallist;