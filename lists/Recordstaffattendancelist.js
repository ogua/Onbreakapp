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


function Recordstaffattendancelist ({item,saveattendance,attdate,studentclass}) {

    const [visible, setVisible] = useState(false);
    const token = useSelector(selecttoken);
    const currency = useSelector(selectcurrency);
    const [issubmitting, setissubmitting] = useState(false);
    const [attendance, setattendance] = useState("");
    const router = useRouter();

    const [intime, setIntime] = useState("");
    const [outtime, setOuttime] = useState("");

    const [showintime, setShowintime] = useState(false);
    const onDismissintime = useCallback(() => {
        setShowintime(false)
    }, [setShowintime]);

    const onConfirmintime = useCallback(
        ({ hours, minutes }) => {
         setShowintime(false);
         setIntime(hours+':'+minutes);
        },
        [setShowintime]
    );


    const [showouttime, setShowouttime] = useState(false);
    const onDismissouttime = useCallback(() => {
        setShowouttime(false)
    }, [setShowouttime]);

    const onConfirmouttime = useCallback(
        ({ hours, minutes }) => {
         setShowouttime(false);
         setOuttime(hours+':'+minutes);
        },
        [setShowouttime]
    );

    
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

    function savestudentattendance(staffid){
        
        setissubmitting(true);

        const formdata = {
            staffid,
            attendance,
            intime,
            outtime,
            attdate
        }

        axios.post(schoolzapi+'/save-staff-attendance',
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

            setIntime(item?.attendance?.intime);
            setOuttime(item?.attendance?.outtime);

        }else{

            radioButtons[0].selected = false;
            radioButtons[1].selected = false;

            setIntime("");
            setOuttime("");
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

            <RadioGroup 
                radioButtons={radioButtons}
                layout='row'
                  // onPress={onPressRadioButton}  

                onPress={(radioButtonsArray) => {
                const newData = radioButtonsArray.filter((item) => item.selected);
                const selected = newData[0].value;
                setattendance(selected);
            }} 

          />

        <View style={{flexDirection: 'row', justifyContent: "flex-start", marginTop: 20}}>

        <TimePickerModal
          visible={showintime}
          onDismiss={onDismissintime}
          onConfirm={onConfirmintime}
          hours={12}
          minutes={14}
        />  

        <View style={{marginRight: 30}}>
        <Text>In Time</Text>
         <TextInput
            title="In Time"
            style={styles.Forminput}
            mode="outlined"
            onFocus={()=>  setShowintime(true)}
            onChangeText={(e) => setIntime(e)}
            value={intime} /></View>



      <TimePickerModal
          visible={showouttime}
          onDismiss={onDismissouttime}
          onConfirm={onConfirmouttime}
          hours={12}
          minutes={14}
        />

      <View>
        <Text>Out Time</Text>
       <TextInput
            title="Out Time"
            style={styles.Forminput}
            mode="outlined"
            numberOfLines={5}
            onFocus={()=>  setShowouttime(true)}
            keyboardType="default"
            onChangeText={(e) => setOuttime(e)}
            value={outtime} />
    </View>

       </View>

     {issubmitting ? (
        <ActivityIndicator size="large" />
     ) : (
        <Button onPress={()=> savestudentattendance(item.id)} mode="contained">Save</Button>
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

export default Recordstaffattendancelist;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});