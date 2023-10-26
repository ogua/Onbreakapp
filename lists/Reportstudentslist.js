import { useEffect, useState } from "react";
import { ActivityIndicator, Linking, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text, TextInput } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency, selecttoken, selectuser } from "../features/userinfoSlice";
import RadioGroup from 'react-native-radio-buttons-group';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import axios from "axios";
import { oguaschoolz, schoolzapi } from "../components/constants";
import { showMessage } from "react-native-flash-message";


function Reportstudentslist ({item,term,opendate,closedate,stclass,reporttype,working,totstudent}) {

    const [visible, setVisible] = useState(false);
    const token = useSelector(selecttoken);
    const user = useSelector(selectuser);
    const currency = useSelector(selectcurrency);
    const [issubmitting, setissubmitting] = useState(false);
    const router = useRouter();

    const [smssent, setsmssent] = useState(false);
    const [mailsent, setmailsent] = useState(false);

    const [position, setposition] = useState("");
    const [fees, setfees] = useState(0);

    const [link, setlink] = useState("");
    

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

    const sendsmsreport = (id) => {

        if(fees == ""){
            return;
        }

        setissubmitting(true);

        const formdata = {
            id,
            term,
            totalattndance: working,
            total: totstudent,
            pclass: stclass,
            schoolreopens: opendate,
            schoolcloseson: closedate,
            quenaire: reporttype,
            schoolfees: fees,
            pos: position ? position : 'null'
        }

        axios.post(schoolzapi+'/send-sms-result-to-parent',
        formdata,
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        })
          .then(function (response) {
            setissubmitting(false);
            setsmssent(true);
            showMessage({
                message: 'SMS Sent Successfully!',
                type: "success",
                position: 'bottom',
              });
          })
          .catch(function (error) {
            setissubmitting(false);
            console.log(error);
          });
    }

    const openurl = (id) => {
        
        if(reporttype == "Normal Report"){
            let printurl =  oguaschoolz+`/app-view-terminal-report/${fees}/${totstudent}/${term}/${stclass}/${id}/${opendate}/${position ? position : 'null'}/${closedate}/${user.uniqueid}`;
            //console.log("link",printurl);
            Linking.openURL(printurl);
        }

        if(reporttype == "Sample 1"){
            let printurl =  oguaschoolz+`/app-view-questionaire-report/${fees}/${totstudent}/${term}/${stclass}/${id}/${opendate}/null/${closedate}/${user.uniqueid}`;
            //console.log("link",printurl);
            Linking.openURL(printurl);
        }

        if(reporttype == "Sample 2"){
            let printurl =  oguaschoolz+`/app-view-questionaire-report-sample-2/${fees}/${totstudent}/${term}/${stclass}/${id}/${opendate}/null/${closedate}/${user.uniqueid}`;
            //console.log("link",printurl);
            Linking.openURL(printurl);
        }
        
       

    }


    const sendmailreport = (id) => {

        if(fees == ""){
            return;
        }

        setissubmitting(true);

        const formdata = {
            id,
            term,
            totalattndance: working,
            total: totstudent,
            pclass: stclass,
            schoolreopens: opendate,
            schoolcloseson: closedate,
            quenaire: reporttype,
            schoolfees: fees,
            pos: position ? position : 'null'
        }

        axios.post(schoolzapi+'/send-mail-result-to-parent',
        formdata,
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        })
          .then(function (response) {
            setissubmitting(false);

            setmailsent(true);
            
            showMessage({
                message: 'Mail Sent Successfully!',
                type: "success",
                position: 'bottom',
              });
          })
          .catch(function (error) {
            setissubmitting(false);
            console.log(error);
          });
    }

    return (
        <>
        <TouchableWithoutFeedback style={{backgroundColor: '#fff', padding: 10}}
        >

        <Card style={{backgroundColor: item.retuneddate ? `#17a2b8` : '#fff'}}>
            <Card.Title title={`${item?.fullname.toUpperCase()}`}
            subtitle={item?.stclass}
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
                <>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    
                    <View style={{flex: 1, marginRight: 20}}>
                        <TextInput
                        keyboardType="numeric"
                        label="position"
                        value={position}
                        onChangeText={(e) => setposition(e)}
                        mode="outlined"/>
                    </View>

                    <View style={{flex: 2}}>
                        <TextInput
                            keyboardType="numeric"
                            label="Next Term School Fees"
                            value={fees}
                            onChangeText={(e) => setfees(e)}
                            mode="outlined"/>

                    </View>
                </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                 <Button icon="download" onPress={()=> openurl(item?.id)} textColor={smssent ? `red` : ``}></Button>
                <Button icon={smssent ? `check` : `mail`} onPress={()=> sendsmsreport(item?.id)} textColor={smssent ? `red` : ``}>Send Sms</Button>
                <Button icon={mailsent ? `check` : `mail`} onPress={()=> sendmailreport(item?.id)} textColor={mailsent ? `red` : ``}>Send Mail</Button>
              </View>
              </>
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

export default Reportstudentslist;