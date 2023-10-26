import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Linking, ToastAndroid, TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Checkbox, Dialog, Divider, List, Menu, Portal, Snackbar, Text, TextInput } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency, selecttoken } from "../features/userinfoSlice";
import RadioGroup from 'react-native-radio-buttons-group';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import axios from "axios";
import { schoolzapi } from "../components/constants";
import { TimePickerModal } from 'react-native-paper-dates';
import { showMessage } from "react-native-flash-message";
import Permissionheader from "../components/Staff/Permissionheader";


function Permissionlist ({item,permission,addpermission}) {   
   

    return (
        <View>
                    <Permissionheader key={item.name} item={item} permission={permission}  addpermission={addpermission} />
                    <Divider bold={true} style={{marginVertical: 5}} />
                    {item.submenu.map((submenu,submenuindex) => (
                        <>
                        <Permissionheader key={submenu.name} item={submenu} permission={permission}  addpermission={addpermission} />

                            <Divider bold={true} style={{marginVertical: 5}} />

                            {submenu.subsubmenu.map((subsubmenu,subsubmenuindex) => (
                                <>
                                <Permissionheader key={subsubmenu.name} item={subsubmenu} permission={permission}  addpermission={addpermission} />
                                    <Divider bold={true} style={{marginVertical: 5}} />
                                </>
                            ))}
                        </>
                    ))}

        
        </View>
    )
}

export default Permissionlist;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});