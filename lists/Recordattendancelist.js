import { useEffect, useState } from "react";
import { ActivityIndicator, Linking, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency, selecttoken } from "../features/userinfoSlice";
import RadioGroup from 'react-native-radio-buttons-group';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import axios from "axios";
import { schoolzapi } from "../components/constants";
import { showMessage } from "react-native-flash-message";


function Recordattendancelist ({item,saveattendance,attdate,studentclass}) {

    const [visible, setVisible] = useState(false);
    const token = useSelector(selecttoken);
    const currency = useSelector(selectcurrency);
    const [issubmitting, setissubmitting] = useState(false);
    const router = useRouter();
    
    const [radioButtons, setRadioButtons] = useState([
        {
            id: '1',
            label: 'Present',
            value: 'P'
        },
        {
            id: '2',
            label: 'Absent',
            value: 'A'
        }
    ]);

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

    function savestudentattendance(radioButtonsArray,studentid,radioprops){
        
        setissubmitting(true);

        const formdata = {
            studentid,
            radioprops,
            attdate,
            studentclass
        }

        axios.post(schoolzapi+'/save-attendance',
        formdata,
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        })
        .then(function (response) {
            setissubmitting(false);
            showMessage({
                message: 'Attendance recorded Successfully!',
                type: "success",
                position: 'bottom',
              });
        })
        .catch(function (error) {
            //setRadioButtons(radioButtonsArray);
            setissubmitting(false);
            alert("Failed something went wrong");
        });        
    }

    useEffect(() => {
        
        
        if(item?.attendance !== null){

            if(item?.attendance?.attendance == "P"){
                radioButtons[0].selected = true;
            }else{
                radioButtons[1].selected = true;
            }

        }else{

            radioButtons[0].selected = false;
            radioButtons[1].selected = false;
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

                {/* <Text>{item?.attendance?.date}</Text> */}

            
            {issubmitting ? <ActivityIndicator size="large" /> : (

            <RadioGroup 
                radioButtons={radioButtons}
                layout='row'
                  // onPress={onPressRadioButton}  

                onPress={(radioButtonsArray) => {
                const newData = radioButtonsArray.filter((item) => item.selected);
                const selected = newData[0].value;
                savestudentattendance(radioButtonsArray,item?.id,selected);
                }} 

          />
            )}
            
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

export default Recordattendancelist;