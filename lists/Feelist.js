import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Dialog, List, Menu, Portal, Snackbar, Switch, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

function Feelistitem ({item,deletedata,updatedatastatus}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const [showdialog, setShowdialog] = useState(false);
    const showDialog = () => setShowdialog(true);
    const hideDialog = () => setShowdialog(false);
    const [showsnakbar, setShowsnakbar] = useState(false);

    const [isSwitchOn, setIsSwitchOn] = useState(1);

    const onToggleSwitch = () => {

        if(isSwitchOn === 1){

            setIsSwitchOn(0);
        }else{

            
            setIsSwitchOn(1);
        }
        updatedatastatus(item?.id,isSwitchOn);

    };


    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff'}}
        onPress={() => setVisible(! visible)}
        >
    <List.Item
        title={item?.title.toUpperCase()}
        titleEllipsizeMode="head"
        description={item?.feecode}
        left={props => <Ionicons name="cash" {...props} size={20} />}
        right={props => <Switch value={item?.status === `1` ? true : false} 
         />}
    />

{/* onValueChange={onToggleSwitch} */}
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/Accounts/create-edit-fee?id=${item.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" onPress={() => deletedata(item.id,item.title)} title="Delete" />
            </View>
        )}
        </>
    )
}

export default Feelistitem;

