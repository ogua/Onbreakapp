import React from 'react'
import { useEffect,useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { Button, Divider, TextInput, Avatar, Portal, Dialog } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Imagepicker from 'expo-image-picker';
import { LocaleConfig, Calendar } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";
import { schoolzapi } from '../../constants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selecttoken } from '../../../features/userinfoSlice';

function Academicinfo (props) {
    const token = useSelector(selecttoken);
    const [studentid, setstudentid] = useState();

    const [showdialog, setShowdialog] = useState(false);
    const showDialog = () => setShowdialog(true);
    const hideDialog = () => setShowdialog(false);
    const [isloading, setLoading] = useState(false);

    const [openentrylevel, setOpenentrylevel] = useState(false);
    const [entrylevel, setentrylevel] = useState(null);
    const [entrylevelitem, setentrylevelitems] = useState();

   // console.log(props.getState());
    
   
    const pickimage = async () => {

        let result =  await Imagepicker.launchImageLibraryAsync({
          mediaTypes: Imagepicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1
        });

        if(!result.canceled){
            setPic(result.assets[0].uri);
        }
    }

    useEffect(()=> {
        loaddata();
    },[]);

    const loaddata = () => {

        setLoading(true);
        axios.get(schoolzapi+'/student-classes',
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        })
          .then(function (response) {
            loaddropdown(response.data.data);
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error);
          });
    }

    const loaddropdown = (studclass) => {
            
        const mddatas = studclass;
        
        let mdata = [];
  
         mddatas.map(item =>  mdata.push({ label: item?.name, value: item?.id}))
        
         setentrylevelitems(mdata);

         setLoading(false);

        const formvalues =  props.getState();
        setstudentid(formvalues.studentid);
        setentrylevel(formvalues.entrylevel);
          
    }

    nextStep = () => {

        props.saveState(

            { studentid: studentid, entrylevel: entrylevel}
        );
        
        props.next();
    };
      
    return (
        <SafeAreaView style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',
                 marginHorizontal: 20, alignItems: 'center'}}>
                <Ionicons name="arrow-back-circle-sharp" color='#1782b6' size={35} onPress={() => props.back()} />
                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 500}}>Step {props.getCurrentStep()} of {props.getTotalSteps()} </Text>
                <Ionicons name="arrow-forward-circle-sharp" color='#1782b6' size={35} onPress={nextStep} />
            </View>

            <Text style={{marginLeft: 20, fontWeight: 500, marginTop: 10}}>Academic information</Text>

            <Divider bold={true} />

            {isloading ? 
            <ActivityIndicator size="large" />

            :
            
            <>
            <ScrollView style={{marginBottom: 60}}>
                
                <View style={{marginHorizontal: 10, marginTop: 20}}>
                    <Text>Student ID</Text>
                    <TextInput
                     //style={styles.Forminput}
                     mode="outlined"
                     value={studentid}
                     onChangeText={(e) => setstudentid(e)}
                    />
                    <Text style={styles.Forminputhelp}>Leave blank to auto generate ID</Text>

                    <Text>Entry Level</Text>
                    <DropDownPicker
                        open={openentrylevel}
                        value={entrylevel}
                        items={entrylevelitem}
                        setOpen={setOpenentrylevel}
                        setValue={setentrylevel}
                        setItems={setentrylevelitems}
                       // placeholder={"Disability"}
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
                </View>
            
            </ScrollView>

            </>

           }
        </SafeAreaView>
        
    );
}


export default Academicinfo;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    },
    Forminputhelp: {
        marginBottom: 20,
        color: '#1782b6'
    }
});