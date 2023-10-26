import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Linking, ToastAndroid, TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal,
     Snackbar, Text, TextInput, Modal, Pressable } from "react-native-paper";
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
import DropDownPicker from "react-native-dropdown-picker";


function Payrollgeneratelist ({item,saveattendance,attdate,studentclass,month,year}) {

    const [visible, setVisible] = useState(false);
    const token = useSelector(selecttoken);
    const currency = useSelector(selectcurrency);
    const [issubmitting, setissubmitting] = useState(false);
    const [status, setstatus] = useState("");
    const router = useRouter();

    const [intime, setIntime] = useState("");
    const [outtime, setOuttime] = useState("");

    const [openleavestatus, setOpenleavestatus] = useState(false);
    const [leavestatus, setleavestatus] = useState("");
    const [leavestatusitems, setleavestatusItems] = useState([
      { label: 'Momo', value: 'Momo'},
      {label: 'Cash', value: 'Cash'},
      { label: 'Bank', value: 'Bank'},
      { label: 'Cheque', value: 'Cheque'},
      { label: 'Credit card', value: 'Credit card'}
    ]);

    const [modalvisibility, setvisibility] = useState(false);
    const [isloading, setLoading] = useState(false);


    useEffect(() => {
                
    },[]);

    const payrollpay = (id,paystatus) => {
        setLoading(true);
  
        const formdata = {
          id,paystatus
        }
        axios.post(schoolzapi+'/staff-payroll-update-payment',
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
                  message: 'Payment Info updated Successfully!',
                  type: "success",
                  position: 'bottom',
                });

            })
            .catch(function (error) {
            setLoading(false);
            console.log(error);
            });
  
    }


    function statusbtn(item){

        if(item?.payroll !== null){
            
            if(item?.payroll.status == "Generated"){

                return (
                    <View>
                      <Button mode="text" onPress={() => router.push('/admin/staff/generate-payroll?userid='+item?.user_id+'&month='+month+"&year="+year)}>View</Button>
                      <View style={{marginTop: 20}}>
                      <DropDownPicker
                    open={openleavestatus}
                    value={leavestatus}
                    items={leavestatusitems}
                    setOpen={setOpenleavestatus}
                    setValue={setleavestatus}
                    setItems={setleavestatusItems}
                    placeholder={"Select Mode of Payment"}
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

                  {isloading ? <ActivityIndicator size="large" /> : (
                        <Button onPress={() => {

                            if(leavestatus == ""){
                                return;
                            }
        
                            payrollpay(item?.payroll.id,leavestatus);
                         }}>Pay</Button>
                  )}
                  
                      </View>
                    </View>
                );
            }

            if(item?.payroll.status == "Paid"){
                return (
                   <><Button mode="contained">Paid</Button>
                    <Button mode="text" onPress={() => router.push('/admin/staff/generate-payroll?userid='+item?.user_id+'&month='+month+"&year="+year)}>View</Button></>
                );
            }

        }else{

            return <Button mode="text" onPress={() => router.push('/admin/staff/generate-payroll?userid='+item?.user_id+'&month='+month+"&year="+year)}>Generate</Button>;
        }
    }



    return (
        <>
        <TouchableWithoutFeedback style={{backgroundColor: '#fff', padding: 10}}
        >

        <Card>
            <Card.Title title={`${item?.fullname}`}
            subtitle={item?.role}
            left={() => (

                <Avatar.Image 
                     source={{uri: item.pic}}
                    size={30}
                />
                )}  
            />
            <Card.Content>

            {statusbtn(item)}
            
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

export default Payrollgeneratelist;

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