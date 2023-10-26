import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Linking, ToastAndroid, TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text, TextInput } from "react-native-paper";
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


function Allstaffattendancelist ({item,saveattendance,attdate,studentclass}) {

    const [visible, setVisible] = useState(false);
    const token = useSelector(selecttoken);
    const currency = useSelector(selectcurrency);
    const [issubmitting, setissubmitting] = useState(false);
    const [attendance, setattendance] = useState("");
    const router = useRouter();

    const [intime, setIntime] = useState("");
    const [outtime, setOuttime] = useState("");


    useEffect(() => {
        
        
        if(item?.attendance !== null){

            if(item?.attendance == "P"){
                setattendance('Present');
            }else{
                setattendance('Absent');
            }

        }else{

            setattendance('Absent');
        }
    },[]);

    return (
        <>
        <TouchableWithoutFeedback style={{backgroundColor: '#fff', padding: 10}}
        >

        <Card style={{backgroundColor: item.retuneddate ? `#17a2b8` : '#fff'}}>
            <Card.Title title={`${item?.fullname.toUpperCase()}`}
            left={() => (

                <Avatar.Image 
                     source={{uri: item.pic}}
                    size={30}
                />
                
                )}  
            />
            <Card.Content>

            

          <Text style={{color: attendance == 'Present' ? 'blue' : 'red'}}>{attendance}</Text>

        <View style={{flexDirection: 'row', justifyContent: "flex-start", marginTop: 20}}>


        <View style={{marginRight: 30}}>
        <Text>In Time: {item?.intime}</Text>
        </View>

      <View>
        <Text>Out Time: {item?.outtime}</Text>
      </View>

       </View>

       <Text>Date: {item?.date}</Text>
            
            </Card.Content>
            
        </Card>
            
        </TouchableWithoutFeedback>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                {/* <Menu.Item disabled={item?.phone == "" ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call" onPress={() => Linking.openURL(`tel:${item?.phone}`)} /> */}
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/library/create-edit-issue-book?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.title)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="refresh" title={`${item.retuneddate ? `Revert If Not returned` : `Returned`}`} onPress={()=> item.retuneddate ? booknotreturned(item?.id,item?.title) : bookreturned(item?.id,item?.title)} />
            </View>
        )}
        </>
    )
}

export default Allstaffattendancelist;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});