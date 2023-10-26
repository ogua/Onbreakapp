import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Linking, ToastAndroid, TouchableOpacity, View,
    StyleSheet,Modal, Pressable } from "react-native";
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
import Staffleavemodal from "../modal/Staffleavemodal";
import DropDownPicker from "react-native-dropdown-picker";


function Staffleavelist ({item,saveattendance,attdate,studentclass,leaveapproval}) {

    const [visible, setVisible] = useState(false);
    const [isloading, setLoading] = useState(false);
    const token = useSelector(selecttoken);
    const currency = useSelector(selectcurrency);
    const [issubmitting, setissubmitting] = useState(false);
    const [attendance, setattendance] = useState("");
    const router = useRouter();

    const [intime, setIntime] = useState("");
    const [outtime, setOuttime] = useState("");

    const [modalvisibility, setvisibility] = useState(false);

    const [note, setnote] = useState("");

    const changevisibility = (visible) => {
        setvisibility(visible);
    }


    const [openleavestatus, setOpenleavestatus] = useState(false);
    const [leavestatus, setleavestatus] = useState("");
    const [leavestatusitems, setleavestatusItems] = useState([
      { label: 'Processing', value: 0},
      { label: 'Approve Leave', value: 1},
      { label: 'Reject Leave', value: 2}
    ]);


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

    const statustext = () => {
        if(item?.status == "0"){
           return <Text>Processing</Text>; 
        }

        if(item?.status == "1"){
            return <Text>Approved</Text>; 
        }

        if(item?.status == "2"){
            return <Text style={{color: 'red'}}>Rejected</Text>; 
         }
    }

    const approveleave = (id,leavetatus,note) => {
        setLoading(true);
  
        const formdata = {
          id,leavetatus,note
        }
        axios.post(schoolzapi+'/staff-approve-leave',
        formdata,
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        })
            .then(function (response) {
                setvisibility(false);
                setLoading(false);
                showMessage({
                  message: 'Info updated Successfully!',
                  type: "success",
                  position: 'bottom',
                });

            })
            .catch(function (error) {
            setLoading(false);
            console.log(error);
            });
  
    }

    return (
        <View style={{marginBottom: 30}}>
        <View style={styles.centeredView}>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalvisibility}
            presentationStyle="overFullScreen"
            >
                <View style={styles.modalcontainer}>
                    <View style={styles.modalheader}>
                      <Text style={{fontSize: 25}}>Staff Leave</Text>
                      <Pressable style={styles.closebtn} onPress={() => setvisibility(false)}>
                         <Text><Ionicons name="close-circle" size={30} color="#abc" /> </Text>
                      </Pressable>
                    </View>
                    
                    <View style={styles.modalbody}>
                       <Text style={{marginTop: 20}}>Note</Text>
                       <TextInput
                       mode="outlined"
                       title="Note"
                       value={note}
                       onChangeText={(e) => setnote(e)}
                       multiline={true}
                       numberOfLines={6}
                       />

                <Text style={{marginTop: 20}}>Leave Status</Text>
                <DropDownPicker
                    open={openleavestatus}
                    value={leavestatus}
                    items={leavestatusitems}
                    setOpen={setOpenleavestatus}
                    setValue={setleavestatus}
                    setItems={setleavestatusItems}
                    placeholder={""}
                    placeholderStyle={{
                        color: "#456A5A",
                    }}
                    listMode="MODAL"
                    dropDownContainerStyle={{
                        borderWidth: 0,
                        borderRadius: 30,
                        backgroundColor: "#fff"
                    }}
                    labelStyle={{
                        color: "#456A5A",
                    }}
                    listItemLabelStyle={{
                        color: "#456A5A",
                    }}
                    style={{
                        borderWidth: 1,
                        marginBottom: 20,
                        minHeight: 40,
                    }}
                  />

                       {isloading ? <ActivityIndicator size="large" style={{marginTop: 20}} /> : <Button mode="contained" style={{marginTop: 20}} onPress={()=>{
                            if(note == ""){
                                return;
                            }

                            if(leavestatus == ""){
                                return;
                            }

                            approveleave(item?.id,leavestatus,note);
                       }}>
                         Save Leave
                       </Button>}
                    </View>
                </View>
            </Modal>
        </View>

        <TouchableOpacity style={{backgroundColor: item?.status == `1` ?  `#1782b6` : (item?.status == `2` ? `red` : `#fff`), padding: 10}}
        onPress={() => setVisible(!visible)}
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
          <Text>{item?.leavestatus}</Text>

        <View style={{flexDirection: 'row', justifyContent: "flex-start", marginTop: 20}}>


        <View style={{marginRight: 30}}>
        <Text>Estimated Days: {item?.days}</Text>
        </View>
       </View>

       <Text>Date: {item?.leavedate}</Text>
       <Divider bold={true} />
       {item?.status == "0" ? ( <Text style={{marginTop: 10}}>{item?.reason}</Text>) : (
        <>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={{marginTop: 10}}>{item?.note}</Text>
        </View>
        <Text style={{color: item?.status == "2" ? `red` : `#1782b6`, textAlign: 'center', fontSize: 18, marginTop: 15}}>
            {item?.status == "2" ? `REJECTED` : `APPROVED`}
        </Text>
        </>

       ) }

       </Card.Content>
            
        </Card>
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/staff/create-edit-staff-leave?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.fullname+" - "+item?.leavestatus)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon={`${item.status == `1` ? `close-circle` : `check-circle`}`} title="Update Status" onPress={()=> setvisibility(true)} />

            </View>
        )}
        </View>
    )
}

export default Staffleavelist;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalcontainer: {
        backgroundColor: '#fff',
        padding: 20
    },
    modalheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    closebtn: {
        backgroundColor: '#fff',
    },
    modalbody: {
        backgroundColor: '#fff'
    },
    modalfooter: {
        backgroundColor: 'blue'
    }
});