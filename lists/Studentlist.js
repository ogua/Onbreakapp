import { useState } from "react";
import { ActivityIndicator, Linking, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Avatar, Button, Dialog, Divider, List, Menu,MD3Colors, Portal,ProgressBar, Snackbar } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { selecttoken } from "../features/userinfoSlice";
import { useEffect } from "react";
import { color } from "react-native-reanimated";

function Studentlist ({item,deletedata,studentclasslist,updatestatus,updatesstclass}) {

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


    useEffect(() => {

        loaddropdown();

        //console.log(studentclasslist);

        setcurrentphone(item?.fgaurdain?.mobile);

    },[]);


    const loaddropdown = () => {

            
        const mddatas = studentclasslist;
        
        let mdata = [];
  
         mddatas.map(item =>  mdata.push({ label: item?.name, value: item?.id}))
        
         setClassitems(mdata);
          
      }


    return (
        <>
        
        <TouchableOpacity style={{backgroundColor: '#fff', marginTop: 60}}
        onPress={() => setVisible(! visible)}
        >
         <View style={{justifyContent: 'center', alignItems: 'center', marginTop: -30}}>
            <Avatar.Image 
                source={{uri: item?.pic}}
                    size={60}
            />
        </View>
         
         <View style={{alignItems: 'center',padding: 10}}>
                <Text style={{fontSize: 18}}>{item?.fullname}</Text>
                <Text style={{fontSize: 15}}>{item?.student_id} :-: {item?.stclass}</Text>
                {/* <Text style={{fontSize: 15}}>{item?.stclass}</Text> */}
        </View>
        </TouchableOpacity>

        {visible && (
                <View style={{backgroundColor: `${visible ? '#fff' : '#fff'}`, borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Divider bold={true} />
                <Menu.Item style={[styles.textcolor,{marginLeft: 10}]} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/admission/edit-student?id=${item?.id}`)} title="Edit" />
                <Menu.Item disabled={item?.phone == "" ? true: false} style={{marginLeft: 10}} leadingIcon="eye" title="View" onPress={()=> router.push(`/admin/admission/view-student?id=${item?.id}`)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.fullname)} />
                <Menu.Item disabled={currentphone == undefined ? true: false} style={{marginLeft: 10}} leadingIcon="phone" title="Call Parent" onPress={() => Linking.openURL(`tel:${item?.fgaurdain?.mobile}`)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="book" title="Previous Results" onPress={() => router.push( `/admin/student/student-results?stndid=${item?.student_id}&fullname=${item?.fullname}`)} />
                
                <View style={{marginHorizontal: 20}}>
                <DropDownPicker
                    open={openstatus}
                    value={status}
                    items={statusitem}
                    setOpen={setOpenstatus}
                    setValue={setStatus}
                    setItems={setStatusitems}
                    onChangeValue={() => updatestatus(item?.id,item?.fullname,status)}
                    placeholder={"Update Status"}
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
                        //backgroundColor: "#F5F7F6",
                        marginTop: 10,
                        marginBottom: 20,
                        minHeight: 40,
                    }}
                  />

                   <DropDownPicker
                    open={openstudentclass}
                    value={studentclass}
                    items={classitem}
                    setOpen={setOpenstudentclass}
                    setValue={setStudentclass}
                    onChangeValue={() => updatesstclass(item?.id,item?.fullname,studentclass)}
                    setItems={setClassitems}
                    placeholder={"Update Student Class"}
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
                        //backgroundColor: "#F5F7F6",
                        minHeight: 40,
                        marginBottom: 20
                    }}
                  />

                  </View>
            </View>
        )}
        </>
    )
}

export default Studentlist;

const styles = StyleSheet.create({
    textcolor: {
        color: '#fff'
    }
})