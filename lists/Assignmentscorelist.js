import { useEffect, useState } from "react";
import { ActivityIndicator, Linking, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text, TextInput } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency, selecttoken } from "../features/userinfoSlice";
import RadioGroup from 'react-native-radio-buttons-group';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import axios from "axios";
import { schoolzapi } from "../components/constants";
import { showMessage } from "react-native-flash-message";


function Assignmentscorelist ({item,saveattendance,attdate,studentclass,assigmtid}) {

    const [visible, setVisible] = useState(false);
    const token = useSelector(selecttoken);
    const currency = useSelector(selectcurrency);
    const [issubmitting, setissubmitting] = useState(false);
    const [score, setscore] = useState(0);
    const router = useRouter();


    useEffect(() => {
        
        if(item?.assignment !== null){
            setscore(item?.assignment.score);
        }else{
            setscore(0);
        }

    },[]);
    

    function savescore(score,studentid,assignmentid){
        
        setissubmitting(true);

        const formdata = {
            score,
            studentid,
            assignmentid
        }

        axios.post(schoolzapi+'/homework-enter-score',
        formdata,
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        })
        .then(function (response) {
            setissubmitting(false);
            showMessage({
                message: 'Score recorded Successfully!',
                type: "success",
                position: 'bottom',
            });
        })
        .catch(function (error) {
            console.log(error);
            setissubmitting(false);
           // alert("Failed something went wrong");
        });        
    }


    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
       // onPress={() => router.push(`/admin/Attendance/view-student-attendance?id=${item?.student_id}`)}
        >

        <Card>
            <Card.Title title={`${item?.fullname.toUpperCase()}`}
           left={() => (   

                <Avatar.Image 
                     source={{uri: item.pic}}
                    size={30}
                />
                
                )}  
            />
             <Card.Content>
                <View>
                    <TextInput
                       label="Enter Score"
                       mode="outlined"
                       keyboardType="numeric"
                       value={score}
                       onChangeText={(e) => setscore(e)}
                     />

                     {issubmitting ? <ActivityIndicator size="large" /> : (
                        <Button onPress={()=> savescore(score,item?.student_id,assigmtid)}>
                            {item?.assignment !== null ? `Save` : `NOT SUBMITTED`}
                        </Button>
                     )}
                     
                </View>
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

export default Assignmentscorelist;