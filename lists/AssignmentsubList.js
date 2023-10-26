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


function AssignmentsubList ({item,saveattendance,attdate,studentclass}) {

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
            //setRadioButtons(radioButtonsArray);
            ToastAndroid.show('Attendance Recorded successfully!', ToastAndroid.SHORT);
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

    const buttonshow = () =>{

        //console.log("item",item);

        if(item?.assignment !== null){
            if(item?.assignment?.score == null){
                return <Button onPress={()=> Linking.openURL(item?.assignment?.file)}>Download Assignment</Button>;
            }else{
                return <Text style={{color: '#fff', fontSize: 20}}>Score {item?.assignment?.score ? item?.assignment?.score : 0 }</Text>
            }
        }else{
            return <Text style={{color: 'red'}}>NOT SUMITTED</Text>;
        }
    }

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
       // onPress={() => router.push(`/admin/Attendance/view-student-attendance?id=${item?.student_id}`)}
        >

        <Card style={{backgroundColor: item.assignment !== null ? `#17a2b8` : '#fff'}}>
            <Card.Title title={`${item?.fullname.toUpperCase()}`}
            subtitle={item?.student_id+" ("+item?.stclass+")"}
           titleStyle={{color: item.assignment !== null && `#fff`}}
           left={() => (   

                <Avatar.Image 
                     source={{uri: item.pic}}
                    size={30}
                />
                
                )}  
            />
                                

             <Card.Content>
                {buttonshow()}
            </Card.Content>
        </Card>
            
        </TouchableOpacity>

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

export default AssignmentsubList;