import { useState } from "react";
import { ActivityIndicator, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Dialog, Divider, List, Menu,MD3Colors, Portal,ProgressBar, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { selecttoken } from "../features/userinfoSlice";
import { useEffect } from "react";
import { color } from "react-native-reanimated";

function Feepaymentlist ({item,deletedata,studentclasslist}) {

    const token = useSelector(selecttoken);
    const [visible, setVisible] = useState(false);
    const router = useRouter();

    const [openstatus, setOpenstatus] = useState(false);
    const [status, setStatus] = useState(null);
    const [statusitem, setStatusitems] = useState([
        { label: "Completed", value: "Yes"},
        { label: "Dismissed", value: "Dismissed"},
        { label: "Stopped", value: "Stopped"},
        { label: "Active", value: "No"},
    ]);

    const [openstudentclass, setOpenstudentclass] = useState(false);
    const [studentclass, setStudentclass] = useState(null);
    const [classitem, setClassitems] = useState();


    return (
        <>
        
        <View style={{backgroundColor: '#fff', marginTop: 40}}
        >
         <View style={{justifyContent: 'center', alignItems: 'center', marginTop: -30}}>
            <Avatar.Image 
                source={{uri: item?.pic}}
                    size={90}
            />
        </View>
         
         <View style={{alignItems: 'center',padding: 10}}>
                <Text style={{fontSize: 18}}>{item?.fullname}</Text>
                <Text style={{fontSize: 15}}>{item?.student_id} :-: {item?.stclass}</Text>
                {/* <Text style={{fontSize: 15}}>{item?.stclass}</Text> */}
                <Button onPress={()=> router.push('/admin/Accounts/record-fee?studentid='+item?.student_id+"&studentname="+item?.fullname)} style={{marginTop: 10}}>Record Fee</Button>
                <Button onPress={()=> router.push('/admin/Accounts/transaction-per-student?studentid='+item?.student_id+"&studentname="+item?.fullname)}>Transactions</Button>
        </View>
        </View>

        </>
    )
}

export default Feepaymentlist;

const styles = StyleSheet.create({
    textcolor: {
        color: '#fff'
    }
})