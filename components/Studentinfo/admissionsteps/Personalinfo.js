import React from 'react'
import { useEffect,useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Button, Divider, TextInput, Avatar, Portal, Dialog } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Imagepicker from 'expo-image-picker';
import { LocaleConfig, Calendar } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";

function Step1 (props) {
    const [pic, setPic] = useState("");
    const [surname, setsurname] = useState("");
    const [firstname, setfirstname] = useState("");
    const [othernames, setothernames] = useState("");
    const [dateofbirth, setDateofbirth] = useState('');
    const [nationality, setnationality] = useState("");
    const [placeofbirth, setplaceofbirth] = useState("");
    const [religion, setreligion] = useState("");
    const [hometown, sethometown] = useState("");
    const [selecteddate, setSelecteddate] = useState('');


    const [showdialog, setShowdialog] = useState(false);
    const showDialog = () => setShowdialog(true);
    const hideDialog = () => setShowdialog(false);

    const [opendisability, setOpendisability] = useState(false);
    const [disability, setDisability] = useState(null);
    const [disabilityitem, setDisabilityitems] = useState([
        { label: "Yes", value: "Yes"},
        { label: "No", value: "No"},
    ]);


    const [opengender, setOpengender] = useState(false);
    const [gender, setgender] = useState();
    const [genderitem, setgenderitems] = useState([
        { label: "Male", value: "Male"},
        { label: "Female", value: "Female"},
    ]);
   
    const pickimage = async () => {

        let result =  await Imagepicker.launchImageLibraryAsync({
          mediaTypes: Imagepicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1
        });

        if(!result.canceled){
            console.log('result',result);
            setPic(result.assets[0].uri);
        }
    }

    nextStep = () => {
        //const { next, saveState } = this.props;

        props.saveState(

            { file: pic, surname: surname, firstname: firstname,
            othernames: othernames, gender: gender, dateofbirth: dateofbirth, nationality: nationality,
            placeofbirth: placeofbirth, religion: religion, hometown: hometown, disability: disability
            }
        );

        props.next();
    };


      useEffect(() => {
        const formvalues =  props.getState();
        setPic(formvalues.pic);
        setfirstname(formvalues.firstname);
        setsurname(formvalues.surname);
        setothernames(formvalues.othernames);
        setgender(formvalues.gender);
        setDateofbirth(formvalues.dateofbirth);
        setnationality(formvalues.nationality);
        setplaceofbirth(formvalues.placeofbirth);
        setreligion(formvalues.religion);
        sethometown(formvalues.hometown);
        setDisability(formvalues.disability);

      },[]);


    return (
        <SafeAreaView style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',
                 marginHorizontal: 20, alignItems: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 500}}>Step {props.getCurrentStep()} of {props.getTotalSteps()} </Text>
                <Ionicons name="arrow-forward-circle-sharp" color='#1782b6' size={35} onPress={nextStep} />
            </View>

            <Text style={{marginLeft: 20, fontWeight: 500, marginTop: 10}}>Personal information</Text>

            <Divider bold={true} />

            <ScrollView style={{marginBottom: 100}}>
                
                <View style={{flexDirection: 'row',alignItems: 'center',  marginTop: 20, marginLeft: 10}}>
                    
                   {pic && <Avatar.Image 
                        source={{ uri: pic }}
                        size={100}
                    /> }
                    
                    <Button mode="text" style={{fontSize: 20}} onPress={pickimage}>Pick Image</Button>
                </View>

                <View style={{marginHorizontal: 10, marginTop: 20}}>
                    <Text>Surname</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={surname}
                     onChangeText={(e) => setsurname(e)}
                    />

                    <Text>Firstname</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={firstname}
                     onChangeText={(e) => setfirstname(e)}
                    />

                    <Text>Other names</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={othernames}
                     onChangeText={(e) => setothernames(e)}
                    />

                  <Text>Gender</Text>
                    
                    <DropDownPicker
                        open={opengender}
                        value={gender}
                        items={genderitem}
                        setOpen={setOpengender}
                        setValue={setgender}
                        setItems={setgenderitems}
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
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Date of birth </Text>
                    <Button icon="calendar-range" onPress={() => setShowdialog(true)}> select Date</Button>
                </View>
                 
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                    // onFocus={() => setShowdialog(true)}
                    // onPressIn={() => setShowdialog(true)}
                     placeholder='yyyy-mm-dd'
                     value={dateofbirth}
                    />

                    <Text>Nationality</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={nationality}
                     onChangeText={(e) => setnationality(e)}
                    />

                   <Text>Place of birth</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={placeofbirth}
                     onChangeText={(e) => setplaceofbirth(e)}
                    />


                   <Text>Religion</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={religion}
                     onChangeText={(e) => setreligion(e)}
                    />

                    <Text>Hometown</Text>
                    <TextInput
                     style={styles.Forminput}
                     mode="outlined"
                     value={hometown}
                     onChangeText={(e) => sethometown(e)}
                    />

                    <Text>Disability</Text>
                    <DropDownPicker
                        open={opendisability}
                        value={disability}
                        items={disabilityitem}
                        setOpen={setOpendisability}
                        setValue={setDisability}
                        setItems={setDisabilityitems}
                        placeholder={"Disability"}
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
                
                {/* <Button onPress={() => props.next()} mode="contained">
                    Go Next
                </Button>

                <Button onPress={() => props.back()} mode="contained">
                    Go Back
                </Button> */}

            <Portal>
                <Dialog visible={showdialog} onDismiss={hideDialog}>
                    <Dialog.Content>

                    <Calendar
                       visible={true}
                        onDayPress={(day) => {
                            setSelecteddate(day.dateString);
                            setDateofbirth(day.dateString);
                            setShowdialog(false);
                            //console.log(day.dateString);
                        }}
                        markedDates={{
                            [selecteddate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                        }}
                        enableSwipeMonths={true}
                    />

                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            </ScrollView>
        </SafeAreaView>
        
    );
}


export default Step1;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});