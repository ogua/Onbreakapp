import { useEffect, useState } from "react";
import { Alert, Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text, Switch, ActivityIndicator } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency, selecttoken } from "../features/userinfoSlice";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import { schoolzapi } from "../components/constants";

function Examinationlist ({item,deletedata,updatedatastatus,role}) {

    const [visible, setVisible] = useState(false);
    const currency = useSelector(selectcurrency);
    const router = useRouter(); 
    const [isSwitchOn, setIsSwitchOn] = useState(1);
    const [isloading, setLoading] = useState(false);
    const token = useSelector(selecttoken);

    useEffect(()=> {
        if(item.publish == `1`){
            setIsSwitchOn(`1`);
        }else{
            setIsSwitchOn(`0`);
        }
    },[]);

    
    const onToggleSwitch = () => {

        if(isSwitchOn == `1`){
            publish(item.id,0);
        }else{
            publish(item.id,1);
        }
        

    };

    const publish = (id,value) => {
        let sent = value === 1 ? 'Publish' : 'Unpulish';
        return Alert.alert(
            "Are your sure?",
            `You want to ${sent} this quiz`,
            [
              {
                text: "No",
              },
              {
                text: `Yes ${sent}`,
                onPress: () => {
                    setLoading(true);
                    axios.get(schoolzapi+`/online-quiz-publish/${id}/${value}`,
                    {
                        headers: {Accept: 'application/json',
                        Authorization: "Bearer "+token
                    }
                    })
                        .then(function (response) {
                            setIsSwitchOn(value);
                            setLoading(false);
                            showMessage({
                                message: `Quiz ${sent} Successfully!`,
                                type: "success",
                                position: 'bottom',
                              });
                        })
                        .catch(function (error) {
                        setLoading(false);
                        console.log(error);
                        });
                },
              },
            ]
          );

    }


    const startexams = (id) => {
        return Alert.alert(
            "Are your sure?",
            `You want to start quiz`,
            [
              {
                text: "No",
              },
              {
                text: `Yes Start`,
                onPress: () => {
                    router.push('/admin/quiz/student-examination?id='+id);
                },
              },
            ]
          );

    }

    return (
        <>
        <TouchableOpacity style={{backgroundColor: isSwitchOn == `1` ? '#17a2b8' : '#fff', padding: 10, marginBottom: 10}}
        onPress={() => role == 'Student' ? startexams(item?.id) : setVisible(! visible)}
        >

        <List.Item
            title={()=> (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Ionicons name="cash" size={20} style={{marginRight: 10}} />
                    <Text style={{flex: 1, fontSize: 18}}>{item?.title}</Text>
                     <Text style={{fontSize: 10}}>{item?.stclass}</Text>
                     {/* <Ionicons name="ellipsis-vertical-sharp" size={20} /> */}
                </View>
            )}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                <Text style={{fontSize: 13, marginLeft: 30}}>Total question: ({item?.quesoshow})  </Text>
                <Text style={{fontSize: 13, marginLeft: 30}}>Duration: {item?.minutes}</Text>
                <Text style={{fontSize: 13, marginLeft: 30}}>Tryable: {item?.retry}</Text>                
                </>
            )}
            descriptionNumberOfLines={5}
            //left={props => <Ionicons name="help-circle" {...props} size={20} />}
            //right={props => <Ionicons name="ellipsis-vertical-sharp" {...props} size={20} />}
        />

        <View>
            {role == 'Student' ? null : (
                <>
                  {isloading ? <ActivityIndicator size="large" /> : (
                    <Switch value={isSwitchOn == `1` ? true : false} onValueChange={onToggleSwitch} />
                    )}
                </>
            )}
            
            </View>
            
        </TouchableOpacity>

        {role == 'Student' ? null : (
                <>
                  {visible && (
                        <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                            <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/quiz/create-edit-exams?id=${item?.id}`)} title="Edit" />
                            <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.title)} />
                        </View>
                    )}
                </>
            )}

        
        </>
    )
}

export default Examinationlist;

const styles = StyleSheet.create({
    ribbon: {
        position: "absolute",
        bottom: -45,
        right: -40,
        zIndex: 1,
        overflow: "hidden",
        width: 70,
        height: 70,
        textAlign: "right",
    },
    ribbontext: {
        transform: [{ rotate: "295deg" }],
        color: '#9BC90D',
        fontSize: 20
    }
});