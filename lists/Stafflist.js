import { useState } from "react";
import { Alert, ActivityIndicator, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Dialog, Divider, List, Menu,MD3Colors, Portal,ProgressBar, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { selecttoken } from "../features/userinfoSlice";
import { useEffect } from "react";
import { color } from "react-native-reanimated";
import axios from "axios";
import { schoolzapi } from "../components/constants";

function Stafflist ({item,deletedata,studentclasslist,updatestatus,updatesstclass}) {

    const token = useSelector(selecttoken);
    const [visible, setVisible] = useState(false);
    const router = useRouter();

    const [openstatus, setOpenstatus] = useState(false);
    const [status, setStatus] = useState(null);
    const [statusitem, setStatusitems] = useState([
        { label: "Completed", value: "Yes"},
        { label: "Dismissed", value: "Dismissed"},
        { label: "Stopped", value: "Stopped"},
        { label: "Active", value: "No"},
    ]);

    const [openstudentclass, setOpenstudentclass] = useState(false);
    const [studentclass, setStudentclass] = useState(null);
    const [classitem, setClassitems] = useState();
    const [currentphone, setcurrentphone] = useState();

    const [logout, setlogout] = useState("");
    const [issubmitting, setissubmitting] = useState(false);


    useEffect(()=>{
        setlogout(item?.is_logout);
    },[]);

    const forcelogout = (id,delname) => {

        return Alert.alert(
            "Are your sure?",
            "You want to disable "+delname+" Logins",
            [
              {
                text: "No",
              },
              {
                text: "Yes Disable",
                onPress: () => {
  
                    setissubmitting(true);
  
                    const formdata = {
                      id
                    }
  
                    axios.post(schoolzapi+'/staff-force-logout',
                    formdata,
                    {
                        headers: {Accept: 'application/json',
                        Authorization: "Bearer "+token
                    }
                    })
                        .then(function (response) {
                            setissubmitting(false);

                            setlogout("1");
  
                            showMessage({
                              message: 'Logged Out Activated!',
                              type: "success",
                              position: 'bottom',
                          });
  
                        })
                        .catch(function (error) {
                        setissubmitting(false);
                        console.log(error);
                        });
                },
              },
            ]
          );
  
    }
  
  
    const enablelogout = (id,delname) => {
  
      return Alert.alert(
          "Are your sure?",
          "You want to enable "+delname+" Logins",
          [
            {
              text: "No",
            },
            {
              text: "Yes Enable",
              onPress: () => {
  
                  setissubmitting(true);
  
                  const formdata = {
                    id
                  }
  
                  axios.post(schoolzapi+'/staff-enable-logout',
                  formdata,
                  {
                      headers: {Accept: 'application/json',
                      Authorization: "Bearer "+token
                  }
                  })
                      .then(function (response) {
                          setissubmitting(false);

                          setlogout("0");
  
                          showMessage({
                            message: 'Logged Out Activated!',
                            type: "success",
                            position: 'bottom',
                        });
  
                      })
                      .catch(function (error) {
                      setissubmitting(false);
                      console.log(error);
                      });
              },
            },
          ]
        );
  
  }


    return (
        <View style={{ marginBottom: 10}}>
        
        <TouchableOpacity style={{backgroundColor: logout == '1' ? 'red' : '#fff', padding: 20}}
        onPress={() => setVisible(! visible)}
        >
         <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <Avatar.Image 
                source={{uri: item?.pic}}
                    size={30}
            />
             <Text style={{fontSize: 15,color: logout == '1' ? '#fff': '#000'}}>{item?.fullname} </Text>
             {logout == '1' && (
                <Text style={{color: logout == '1' ? '#fff' : ''}}>Disabled</Text>
             )}
             
        </View>
         
         {/* <View style={{alignItems: 'center',padding: 10}}>
                <Text style={{fontSize: 18}}>{item?.fullname}</Text>
                <Text style={{fontSize: 15}}>{item?.student_id} :-: {item?.stclass}</Text>
        </View> */}
        </TouchableOpacity>

        {visible && (
                <View style={{backgroundColor: `${visible ? '#fff' : '#fff'}`, borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Divider bold={true} />
                <Menu.Item style={[styles.textcolor,{marginLeft: 10}]} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/staff/create-edit-staff?id=${item?.id}&userid=${item?.user_id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="eye" title="View" onPress={()=> router.push(`/admin/staff/view-staff?id=${item?.id}&userid=${item?.user_id}`)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.fullname)} />
                <Menu.Item disabled={item?.phone == "" ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call" onPress={() => Linking.openURL(`tel:${item?.phone}`)} />
                
                {issubmitting ? <ActivityIndicator size="small" /> : (
                    <>
                        {logout == '1' ? (
                        <Menu.Item style={{marginLeft: 10}} leadingIcon="login" title="Enable Login" onPress={()=> {
                            enablelogout(item?.id,item?.fullname);
                        }} />

                        ) : (
                            <Menu.Item style={{marginLeft: 10}} leadingIcon="logout" title="Disable Login" onPress={()=> {
                                forcelogout(item?.id,item?.fullname);
                            }} />
                        )}
                    </>
                )}
                

                <Menu.Item style={{marginLeft: 10}} leadingIcon="key" title="Permissions" onPress={()=> router.push("/admin/staff/permissions?userid="+item?.user_id)} />                   
            </View>
        )}
        </View>
    )
}

export default Stafflist;

const styles = StyleSheet.create({
    textcolor: {
        color: '#fff'
    }
})