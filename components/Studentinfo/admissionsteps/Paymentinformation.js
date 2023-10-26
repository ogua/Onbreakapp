import React from 'react'
import { useEffect,useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { Button, Divider, TextInput, Avatar, Portal, Dialog } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Imagepicker from 'expo-image-picker';
import { LocaleConfig, Calendar } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selecttoken } from '../../../features/userinfoSlice';
import { schoolzapi } from '../../constants';

function Paymentinformation (props) {
   // console.log("props", props);

    const token = useSelector(selecttoken);
    const [isloading, setLoading] = useState(false);
    const [issubmitting, setIssubmitting] = useState(false);

    const [openpaytype, setOpenpaytype] = useState(false);
    const [paytype, setpaytype] = useState("");
    const [paytypeitem, setpaytypeitems] = useState([
        { label: "", value: ""},
        { label: "Discount Child", value: "Discount Child"},
        { label: "Full Scholarship", value: "Scholarship"},
        { label: "Partial Scholarship", value: "Partial Scholarship"},
    ]);

    // const [openpaydiscount, setOpenpaytype] = useState(false);
    // const [paytype, setpaytype] = useState(null);
    // const [paytypeitem, setpaytypeitems] = useState([
    //     { label: "Discount Child", value: "Discount Child"},
    //     { label: "Full Scholarship", value: "Scholarship"},
    //     { label: "Partial Scholarship", value: "Partial Scholarship"},
    // ]);

    const [paydiscount, setpaydiscount] = useState("");
    
   
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

    useEffect(() => {
        const formvalues =  props.getState();
        setpaytype(formvalues.paytype);
        setpaydiscount(formvalues.paydiscount);

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

    backStep = () => {
        setLoading(true);
        props.saveState(
            { paytype: paytype, paydiscount: paydiscount}
        );

        setLoading(false);
        
        props.back();
    };

    const saveinfo = () => {

        props.next();
       // props.getCurrentStep()
        return;

        setIssubmitting(true);
       
        props.saveState(
            { paytype: paytype, paydiscount: paydiscount}
        );


        const formdata =  props.getState();

        const data = new FormData();

        if(formdata.file != null){

            //retrive the file extension of your photo uri
            const uriPart = formdata.file.split('.');
            const fileExtension = uriPart[uriPart.length - 1];

            data.append('pic', {
              uri: formdata.file,
              name: `photo.${fileExtension}`,
              type: `images/${fileExtension}`,
            });
  
          }
         
  
          data.append('surname',formdata.surname);
          data.append('firstname',formdata.firstname);
          data.append('othernames',formdata.othernames);
          data.append('gender',formdata.gender);
          data.append('dateofbirth',formdata.dateofbirth);
          data.append('nationality',formdata.nationality);
          data.append('placeofbirth',formdata.placeofbirth);
          data.append('religion',formdata.religion);
          data.append('hometown',formdata.hometown);
          data.append('disability',formdata.disability);
          data.append('student_id',formdata.student_id ?? '');
          data.append('entrylevel',formdata.entrylevel);
          data.append('gfullname',formdata.gfullname);
          data.append('relationship',formdata.relationship);
          data.append('goccupation',formdata.goccupation);
          data.append('gpostcode',formdata.gpostcode);
          data.append('gmobile',formdata.gmobile);
          data.append('gemail',formdata.gemail);
          data.append('employed',formdata.employed);
          data.append('sgfullname',formdata.sgfullname);
          data.append('srelationship',formdata.srelationship);
          data.append('sgoccupation',formdata.sgoccupation);
          data.append('sgpostcode',formdata.sgpostcode);
          data.append('sgmobile',formdata.sgmobile);
          data.append('sgemail',formdata.sgemail);
          data.append('semployed',formdata.semployed);
          data.append('paytype',paytype);
          data.append('paydiscount',paydiscount);

        axios.post(schoolzapi+'/student-info',
        data,
        {
            headers: {Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer "+token
        }
        })
          .then(function (response) {
            ToastAndroid.show('info saved successfully!', ToastAndroid.SHORT);
            setIssubmitting(false);
            console.log(response);
            //DeviceEventEmitter.emit('subject.added', {});
            //router.back();
          })
          .catch(function (error) {
            setIssubmitting(false);
            console.log(error.response);
          });




      
    };

    const loaddropdown = (studclass) => {
            
        const mddatas = studclass;
        
        let mdata = [];
  
         mddatas.map(item =>  mdata.push({ label: item?.name, value: item?.id}))
        
         setDisabilityitems(mdata);

         setLoading(false);
          
    }
      
    return (
        <SafeAreaView style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',
                 marginHorizontal: 20, alignItems: 'center'}}>
                <Ionicons name="arrow-back-circle-sharp" color='#1782b6' size={35} onPress={backStep} />
                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 500}}>Step {props.getCurrentStep()} of {props.getTotalSteps()} </Text>
                {/* <Ionicons name="arrow-forward-circle-sharp" color='#1782b6' size={35} onPress={() => props.next()} /> */}
            </View>

            <Text style={{marginLeft: 20, fontWeight: 500, marginTop: 10}}>Payment information</Text>

            <Divider bold={true} />

            <ScrollView style={{marginBottom: 90}}>
                
                <View style={{marginHorizontal: 10, marginTop: 20}}>
                    
                    <Text>Paytype</Text>
                    <DropDownPicker
                        open={openpaytype}
                        value={paytype}
                        items={paytypeitem}
                        setOpen={setOpenpaytype}
                        setValue={setpaytype}
                        setItems={setpaytypeitems}
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

                   <Text>Pay Discount</Text>
                    <TextInput
                    // style={styles.Forminput}
                     mode="outlined"
                     value={paydiscount}
                     onChangeText={(e) => setpaydiscount(e)}
                    />
                    <Text style={styles.Forminputhelp}> Payment Percentage if Discount Child %</Text>

                    {issubmitting ? <ActivityIndicator size="large" /> : (
                        <Button icon="content-save-outline" mode="contained" onPress={()=> saveinfo()}>
                        Save
                    </Button>
                    )}
                    
                    
                </View>
            
            </ScrollView>

        </SafeAreaView>
        
    );
}


export default Paymentinformation;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    },
    Forminputhelp: {
        marginBottom: 20,
        color: '#1782b6'
    }
});