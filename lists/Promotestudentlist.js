import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Dialog, List, MD3Colors, Menu, Portal, ProgressBar, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { images, schoolzapi } from "../components/constants";
import DropDownPicker from "react-native-dropdown-picker";
import { Image } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { selecttoken } from "../features/userinfoSlice";

function Promotestudentlist ({item,classdata}) {
    const token = useSelector(selecttoken);
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const [promote, setPromote] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState();

    const promotestudent = (studendid,studentname,stclass) => {
        if(stclass == null){
            alert('Please choose promoting class for '+studentname);
            return;
        }

        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to promote "+studentname,
            [
              
              {
                text: "No",
              },
              {
                text: "Yes Promote",
                onPress: () => {

                    setVisible(true);

                    const formdata = {
                        studendid: studendid,
                        promoto: stclass,
                    }
            
                    axios.post(schoolzapi+'/promote-student',
                    formdata,
                    {
                        headers: {Accept: 'application/json',
                        Authorization: "Bearer "+token
                    }
                    })
                      .then(function (response) {
                        setVisible(false);
                        setPromote(true);
                        Alert(response.data.message);
                      })
                      .catch(function (error) {
                        setVisible(false);
                        console.log(error);
                      });

                },
              },
            ]
          );

    }
    
    return (
        <>
        
        <TouchableOpacity style={{backgroundColor: `${promote ? '#ADD8E6' : '#fff'}`, marginTop: 40, padding: 15}}>
         <View style={{justifyContent: 'center', alignItems: 'center', marginTop: -30}}>
            <Avatar.Image 
                source={{uri: item?.pic}}
                    size={90}
            />
        </View>
         
         <View style={{alignItems: 'center',padding: 10}}>
                <Text style={{fontSize: 18}}>{item?.fullname}</Text>
                <Text style={{fontSize: 15}}>{item?.stclass}</Text>
        </View>

           <View style={{marginBottom: 10}}>
           <DropDownPicker
                    open={open}
                    value={value}
                    items={classdata}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={"Choose Promoting Class"}
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
                    }}
           />
            

            {visible ? <ActivityIndicator size="large" /> : null}
            

            {promote ? (
                <Button mode="outlined" icon="check" onPress={() => promotestudent(item?.id,item?.fullname,value)} style={{marginTop: 20}}>
                
                Promoted
               </Button>
            ) : (
                <Button mode="contained" onPress={() => promotestudent(item?.id,item?.fullname,value)} style={{marginTop: 20}}>
                Promote
               </Button>
            )}

           </View>
        </TouchableOpacity>
        </>
    )
}

export default Promotestudentlist;
