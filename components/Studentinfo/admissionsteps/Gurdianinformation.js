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

function Gurdianinformation (props) {
    const token = useSelector(selecttoken);

    const [gfullname, setgfullname] = useState("");
    const [goccupation, setgoccupation] = useState("");
    const [gpostcode, setgpostcode] = useState("");
    const [gmobile, setgmobile] = useState("");
    const [gemail, setgemail] = useState("");

    const [sgfullname, setsgfullname] = useState("");
    const [sgoccupation, setsgoccupation] = useState("");
    const [sgpostcode, setsgpostcode] = useState("");
    const [sgmobile, setsgmobile] = useState("");
    const [sgemail, setsgemail] = useState("");

    const [isloading, setLoading] = useState(false);

    const [openrelationship, setOpenrelationship] = useState(false);
    const [relationship, setrelationship] = useState(null);
    const [relationshipitem, setrelationshipitems] = useState([
        { label: "Mother", value: "Mother"},
        { label: "Father", value: "Father"},
        { label: "Uncle", value: "Uncle"},
        { label: "Aunt", value: "Aunt"},
        { label: "Brother", value: "Brother"},
        { label: "Sister", value: "Sister"},
    ]);

    const [openemployed, setOpenemployed] = useState(false);
    const [employed, setemployed] = useState(null);
    const [employeditem, setemployeditems] = useState([
        { label: "Yes", value: "Yes"},
        { label: "No", value: "No"},
    ]);



    const [opensrelationship, setOpensrelationship] = useState(false);
    const [srelationship, setsrelationship] = useState(null);
    const [srelationshipitem, setsrelationshipitems] = useState([
        { label: "Mother", value: "Mother"},
        { label: "Father", value: "Father"},
        { label: "Uncle", value: "Uncle"},
        { label: "Aunt", value: "Aunt"},
        { label: "Brother", value: "Brother"},
        { label: "Sister", value: "Sister"},
    ]);

    const [opensemployed, setOpensemployed] = useState(false);
    const [semployed, setsemployed] = useState(null);
    const [semployeditem, setsemployeditems] = useState([
        { label: "Yes", value: "Yes"},
        { label: "No", value: "No"},
    ]);
    
   
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


        const formvalues =  props.getState();
        
        setgfullname(formvalues.gfullname);
        setgoccupation(formvalues.goccupation);
        setgpostcode(formvalues.gpostcode);
        setgmobile(formvalues.gmobile);
        setgemail(formvalues.gemail);
        setrelationship(formvalues.relationship);
        setemployed(formvalues.employed);

        setsgfullname(formvalues.sgfullname);
        setsgoccupation(formvalues.sgoccupation);
        setsgpostcode(formvalues.sgpostcode);
        setsgmobile(formvalues.sgmobile);
        setsgemail(formvalues.sgemail);
        setsrelationship(formvalues.srelationship);
        setsemployed(formvalues.semployed);


    },[]);

    nextStep = () => {
        //const { next, saveState } = this.props;
        props.saveState(

            { gfullname: gfullname, goccupation: goccupation, gpostcode: gpostcode,
                gmobile: gmobile, gemail: gemail, relationship: relationship,
                employed: employed,
                sgfullname: sgfullname, sgoccupation: sgoccupation, sgpostcode: sgpostcode,
                sgmobile: sgmobile, sgemail: sgemail, srelationship: srelationship,
                semployed: semployed,
            }
        );

        props.next();
    };
      
    return (
        <SafeAreaView style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',
                 marginHorizontal: 20, alignItems: 'center'}}>
                <Ionicons name="arrow-back-circle-sharp" color='#1782b6' size={35} onPress={() => props.back()} />
                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 500}}>Step {props.getCurrentStep()} of {props.getTotalSteps()} </Text>
                <Ionicons name="arrow-forward-circle-sharp" color='#1782b6' size={35} onPress={() => nextStep()} />
            </View>

            <Text style={{marginLeft: 20, fontWeight: 500, marginTop: 10}}>Gurdian information</Text>

            <Divider bold={true} />

            <ScrollView style={{marginBottom: 90}}>
                
                <View style={{marginHorizontal: 10, marginTop: 20}}>

                    <Text style={{fontSize: 20, fontWeight: 500, marginBottom: 20}}>First Gurdian</Text>
                    
                    <Text>Fullname</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={gfullname}
                     onChangeText={(e) => setgfullname(e)}
                    />

                    <Text>Relationship</Text>
                    <DropDownPicker
                        open={openrelationship}
                        value={relationship}
                        items={relationshipitem}
                        setOpen={setOpenrelationship}
                        setValue={setrelationship}
                        setItems={setrelationshipitems}
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

                   <Text>Occupation</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={goccupation}
                     onChangeText={(e) => setgoccupation(e)}
                    />

                   <Text>Post code</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={gpostcode}
                     onChangeText={(e) => setgpostcode(e)}
                    />

                  <Text>Mobile</Text>
                    <TextInput
                    keyboardType="name-phone-pad"
                     style={styles.Forminput}
                     mode="outlined"
                     value={gmobile}
                     onChangeText={(e) => setgmobile(e)}
                    />

                   <Text>Email</Text>
                    <TextInput
                    keyboardType="email-address"
                     style={styles.Forminput}
                     mode="outlined"
                     value={gemail}
                     onChangeText={(e) => setgemail(e)}
                    />

                   <Text>Employed</Text>
                    <DropDownPicker
                        open={openemployed}
                        value={employed}
                        items={employeditem}
                        setOpen={setOpenemployed}
                        setValue={setemployed}
                        setItems={setemployeditems}
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


                <Divider bold={true} style={{marginTop: 20}} />


                 <Text style={{fontSize: 20, fontWeight: 500, marginBottom: 20}}>Second Gurdian</Text>
                    
                    <Text>Fullname 2</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={sgfullname}
                     onChangeText={(e) => setsgfullname(e)}
                    />

                    <Text>Relationship 2</Text>
                    <DropDownPicker
                        open={opensrelationship}
                        value={srelationship}
                        items={srelationshipitem}
                        setOpen={setOpensrelationship}
                        setValue={setsrelationship}
                        setItems={setsrelationshipitems}
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

                   <Text>Occupation 2</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={sgoccupation}
                     onChangeText={(e) => setsgoccupation(e)}
                    />

                   <Text>Post code 2</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={sgpostcode}
                     onChangeText={(e) => setsgpostcode(e)}
                    />

                  <Text>Mobile 2</Text>
                    <TextInput
                    keyboardType="name-phone-pad"
                     style={styles.Forminput}
                     mode="outlined"
                     value={sgmobile}
                     onChangeText={(e) => setsgmobile(e)}
                    />

                   <Text>Email 2</Text>
                    <TextInput
                    keyboardType="email-address"
                     style={styles.Forminput}
                     mode="outlined"
                     value={sgemail}
                     onChangeText={(e) => setsgemail(e)}
                    />

                   <Text>Employed 2</Text>
                    <DropDownPicker
                        open={opensemployed}
                        value={semployed}
                        items={semployeditem}
                        setOpen={setOpensemployed}
                        setValue={setsemployed}
                        setItems={setsemployeditems}
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

        </SafeAreaView>
        
    );
}


export default Gurdianinformation;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    },
    Forminputhelp: {
        marginBottom: 20,
        color: '#1782b6'
    }
});