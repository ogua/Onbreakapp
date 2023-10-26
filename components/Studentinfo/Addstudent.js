import axios from 'axios';
import { Redirect, Stack, useRouter, useSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView,
   StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Image, DeviceEventEmitter, RefreshControl } from 'react-native'
import { ActivityIndicator, Button, Card, Divider, List, Modal, Portal, Switch, TextInput, Provider, Avatar, Dialog } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { DatePickerInput, DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useCallback } from 'react';
import * as Animatable from 'react-native-animatable';
import Ionicons from '@expo/vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { selectschool, selecttoken, selectuser } from '../../features/userinfoSlice';
import { schoolzapi } from '../constants';
import AnimatedMultistep from "react-native-animated-multistep";
import * as Imagepicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { LocaleConfig, Calendar } from "react-native-calendars";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from "react-native-flash-message";




/* Define the steps  */
import Step1 from './admissionsteps/Personalinfo';
import Academicinfo from './admissionsteps/Academicinfo';
import Gurdianinformation from './admissionsteps/Gurdianinformation';
import Paymentinformation from './admissionsteps/Paymentinformation';


import { ScrollView } from 'react-native-gesture-handler';

const allSteps = [
  { name: "step 1", component: Step1 },
  { name: "step 2", component: Academicinfo },
  { name: "step 3", component: Gurdianinformation },
  { name: "step 4", component: Paymentinformation }
];

function Addstudent(props) {

  const token = useSelector(selecttoken);
  const user = useSelector(selectuser);
  const school = useSelector(selectschool);
  const [link,setlink] = useState("");

  const router = useRouter();
  const navigation = useNavigation();
  const [step,setcurrentstep] = useState(1);
  const [isloading,setisloading] = useState(false);
  const [issubmitting,setIssubmitting] = useState(false);

  const [pic, setPic] = useState("");
  const [file, setfile] = useState(null);
  const [surname, setsurname] = useState("");
  const [firstname, setfirstname] = useState("");
  const [othernames, setothernames] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");

  const [opennationality, setOpennationality] = useState(false);
  const [nationality, setnationality] = useState("");
  const [nationalityitem, setnationalityitems] = useState([]);

    const [openbranch, setOpenbranch] = useState(false);
    const [branch, setbranch] = useState(null);
    const [branchitem, setbranchitems] = useState([
        { label: "Main firdaws", value: "Main Branch"},
        { label: "Annex Branch", value: "Annex Branch"},
    ]);

    const [openuntoma, setOpenuntoma] = useState(false);
    const [untoma, setuntoma] = useState(null);
    const [untomaitem, setuntomaitems] = useState([
        { label: "Second Child", value: 0},
        { label: "Third Child", value: 50},
        { label: "Fourth Child", value: 100},
        { label: "Fifth Child", value: 100},
    ]);

    const [openfirdaws, setOpenfirdaws] = useState(false);
    const [firdaws, setfirdaws] = useState(null);
    const [firdawsitem, setfirdawsitems] = useState([
        { label: "Third Child", value: 50},
        { label: "Fourth Child", value: 75},
        { label: "Fifth Child", value: 100}
    ]);



  const [placeofbirth, setplaceofbirth] = useState("");
  const [religion, setreligion] = useState("");
  const [hometown, sethometown] = useState("");
  const [selecteddate, setSelecteddate] = useState('');


  const [showdialog, setShowdialog] = useState(false);
  const showDialog = () => setShowdialog(true);
  const hideDialog = () => setShowdialog(false);

  const [opendisability, setOpendisability] = useState(false);
  const [disability, setDisability] = useState("");
  const [disabilityitem, setDisabilityitems] = useState([
      { label: "Yes", value: "Yes"},
      { label: "No", value: "No"},
  ]);


  const [opengender, setOpengender] = useState(false);
  const [gender, setgender] = useState("");
  const [genderitem, setgenderitems] = useState([
      { label: "Male", value: "Male"},
      { label: "Female", value: "Female"},
  ]);

  const [studentid, setstudentid] = useState("");
  const [openentrylevel, setOpenentrylevel] = useState(false);
  const [entrylevel, setentrylevel] = useState("");
  const [entrylevelitem, setentrylevelitems] = useState([]);

  const [opencurrentlevel, setOpencurrentlevel] = useState(false);
  const [currentlevel, setcurrentlevel] = useState(null);
  const [currentlevelitem, setcurrentlevelitems] = useState([]);


  const [openpaytype, setOpenpaytype] = useState(false);
  const [paytype, setpaytype] = useState("");
  const [paytypeitem, setpaytypeitems] = useState([
        { label: "", value: ""},
        { label: "Discount Child", value: "Discount Child"},
        { label: "Full Scholarship", value: "Scholarship"},
        { label: "Partial Scholarship", value: "Partial Scholarship"},
  ]);
  const [paydiscount, setpaydiscount] = useState("");
  const [selectedpay, setselectedpay] = useState("");


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


    const {id} = useSearchParams();


    function checkpayselected(){
        if(user.uniqueid == '23cd37b8-9657-420c-b9d2-6651f5c080ce'){
             setselectedpay(firdaws);
        }else if(user.uniqueid == '5604b40-025d-456a-ba25-69f5f0e2c265'){
            setselectedpay(untoma);
        }else{
            setselectedpay(paydiscount);
        }
    }


    const createdata = () => {

        checkpayselected();

        if(surname == ""){
          alert('Surname cant be empty');
          return;
        }

        if(firstname == ""){
          alert('Firstname cant be empty');
          return;
        }

        if(gender == ""){
          alert('Gender cant be empty');
          return;
        }

        if(nationality == ""){
            alert('Country cant be empty');
            return;
        }

        if(disability == ""){
            alert('Disability cant be empty');
            return;
        }

        if(entrylevel == ""){
            alert('Entry Level cant be empty');
            setupcurrentstep(2);
            return;
        }
  
       setIssubmitting(true);

    const data = new FormData(); 

      if(file != null){

        data.append('doc', {
          uri: file.uri,
          name: file.name,
          type: file.mimeType
        });

      }

      data.append('surname',surname);
      data.append('firstname',firstname);
      data.append('othernames',othernames);
      data.append('branch',branch);
      data.append('gender',gender);
      data.append('dateofbirth',dateofbirth);
      data.append('nationality',nationality);
      data.append('placeofbirth',placeofbirth);
      data.append('religion',religion);
      data.append('hometown',hometown);
      data.append('disability',disability);
      data.append('student_id',studentid);
      data.append('entrylevel',entrylevel);
      data.append('paydiscount',selectedpay);
      data.append('paytype',paytype);

      data.append('gfullname',gfullname);
      data.append('goccupation',goccupation);
      data.append('gpostcode',gpostcode);
      data.append('gmobile',gmobile);
      data.append('gemail',gemail);
      data.append('relationship',relationship);
      data.append('employed',employed);

      data.append('sgfullname',sgfullname);
      data.append('sgoccupation',sgoccupation);
      data.append('sgpostcode',sgpostcode);
      data.append('sgmobile',sgmobile);
      data.append('sgemail',sgemail);
      data.append('srelationship',srelationship);
      data.append('semployed',semployed);

        axios.post(link,
        data,
        {
            headers: {Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer "+token
        }
        })
          .then(function (response) {
            setIssubmitting(false);

            console.log(response.data);

            if(response.data.message){

                showMessage({
                    message: 'Student Added Successfully!',
                    type: "success",
                    position: 'bottom',
                });

                DeviceEventEmitter.emit('subject.added', {});
                navigation.navigate("Studentlist");
            }

            if(response.data.error){
                
                showMessage({
                    message: response.data.error,
                    type: "danger",
                    position: 'bottom',
                  });
            }
           
            
          })
          .catch(function (error) {
            setIssubmitting(false);
            console.log("error",error);
          });
    }



    function checkpaydiscount(){

        if(user.uniqueid == '23cd37b8-9657-420c-b9d2-6651f5c080ce'){
            return (<>
                <DropDownPicker
                         open={openfirdaws}
                         value={firdaws}
                         items={firdawsitem}
                         setOpen={setOpenfirdaws}
                         setValue={setfirdaws}
                         setItems={setfirdawsitems}
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
            
             </>);
        }else if(user.uniqueid == '5604b40-025d-456a-ba25-69f5f0e2c265'){
            return (<>

                    <DropDownPicker
                         open={openuntoma}
                         value={untoma}
                         items={untomaitem}
                         setOpen={setOpenuntoma}
                         setValue={setuntoma}
                         setItems={setuntomaitems}
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
            
            </>);
        }else{
            return (<>
                 <TextInput
                    // style={styles.Forminput}
                    mode="outlined"
                    value={paydiscount}
                    onChangeText={(e) => setpaydiscount(e)}
                    />
            </>);
        }
    }

  

  useEffect(()=> {

    setTimeout(() => {
      setisloading(false);
    }, 1000);

  },[step]);


  useEffect(()=> {

    if(id !== undefined){
        loadedit();
        setlink(schoolzapi+"/update-student-info/"+id);
    }else{
        setlink(schoolzapi+"/add-student");
    }

     loaddata();
   },[]);

   //console.log(link);

   const loadedit = () => {
    setisloading(true);
    
    axios.get(schoolzapi+'/student-info/show/'+id,
    {
        headers: {Accept: 'application/json',
        Authorization: "Bearer "+token
    }
    }).then(function (results) {

        setfirstname(results.data.data.firstname);

     
        
      setisloading(false);
        
    }).catch(function(error){
        setisloading(false);
        console.log(error);
    });
}



function countries() {

    return axios.get(schoolzapi+'/countries',
    {
        headers: {Accept: 'application/json',
        Authorization: "Bearer "+token
    }
    });
}

function studentclasses() {

    return axios.get(schoolzapi+'/student-classes',
    {
        headers: {Accept: 'application/json',
        Authorization: "Bearer "+token
    }
    });
}



const loaddata = () => {

    setisloading(true);
    Promise.all([countries(), studentclasses()])
    .then(function (response) {
      loaddropdown(response[1].data.data);
      loadcountries(response[0].data.data);
    })
    .catch(function (error) {
      setisloading(false);
      console.log(error);
    });
}

const loadcountries = (studclass) => {
      
    const mddatas = studclass;
    
    let mdata = [];
  
     mddatas.map(item =>  mdata.push({ label: item, value: item}))
    
     setnationalityitems(mdata);
  
     setisloading(false); 
  }

const loaddropdown = (studclass) => {
      
  const mddatas = studclass;
  
  let mdata = [];

   mddatas.map(item =>  mdata.push({ label: item?.name, value: item?.id}))
  
   setentrylevelitems(mdata);
   setcurrentlevelitems(mdata);

   setisloading(false); 
}

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
        setfile(result.assets[0].uri);
    }
}

const checkPermissions = async () => {
    try {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      if (!result) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title:
              'You need to give storage permission to download and save the file',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          return true;
        } else {
          Alert.alert('Error', "Camera permission denied");
          console.log('Camera permission denied');
          return false;
        }
      } else {
        return true;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };


  async function selectFile() {
    try {
      const result = await checkPermissions();

      if (result) {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: false,
        });

        if (result.type === 'success') {
          // Printing the log realted to the file
          console.log('res : ' + JSON.stringify(result));
          // Setting the state to show single file attributes
          setfile(result);
          setPic(result.uri);
        }
      }
    } catch (err) {
      setfile(null);
      console.warn(err);
      return false;
    }
  }


  // onNext = () => {
  // };

  // onBack = () => {
  // };


  // finish = (finalState) => {
  //   console.log(finalState);
  // };

  const setupcurrentstep = (number) => {

    if(step === number){

    }else{

      setisloading(true);
      setcurrentstep(number);
    }
    
  }



    return (
    <Provider>
        <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen  options={{
            headerTitle: 'New Student'
        }} />

        <View>
            <ScrollView
             style={{padding: 15, backgroundColor: '#fff'}}
            horizontal
            >
              <Button style={{marginRight: 20}} mode="elevated" textColor={step === 1 ? `blue` : `#000`} onPress={() => setupcurrentstep(1)}>Personal Information</Button>
              <Button style={{marginRight: 20}} mode="elevated" textColor={step === 2 ? `blue` : `#000`} onPress={() => setupcurrentstep(2)}>Academic Information</Button>
              <Button style={{marginRight: 20}} mode="elevated" textColor={step === 3 ? `blue` : `#000`} onPress={() => setupcurrentstep(3)}>Guardian Information</Button>
              <Button style={{marginRight: 50}} mode="elevated" textColor={step === 4 ? `blue` : `#000`} onPress={() => setupcurrentstep(4)}>Payment Information</Button>

            </ScrollView>
        </View>

        {isloading ? <ActivityIndicator size="large"  style={{marginTop: 30}} /> : (
          <KeyboardAwareScrollView>
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={isloading} onRefresh={loaddata} />
        }
          style={{padding: 10}}>
            {/* IF STATE IS ONE SHOW PERSONAL INFORMATION */}
            {step === 1 && (
              <>
                 <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10}}>

                    {pic ? <Image source={{uri: pic}} style={{width: 100, height: 100}}
                    /> : null}   

                    <Button icon="file" onPress={selectFile} uppercase={false} mode="outlined"
                    style={{marginVertical: 20, width: 200}}>
                    Upload Image
                    </Button>

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

                {/* CHECK IF ITS UNTOMA SCHOOL */}
                {user.uniqueid == 'd5604b40-025d-456a-ba25-69f5f0e2c265' && (
                    <>
                    <Text>Branch</Text>
                     <DropDownPicker
                         open={openbranch}
                         value={branch}
                         items={branchitem}
                         setOpen={setOpenbranch}
                         setValue={setbranch}
                         setItems={setbranchitems}
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
                    
                    </>
                )}
                    

 
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
 
                     <Text>Country</Text>
                     <DropDownPicker
                        searchable
                         open={opennationality}
                         value={nationality}
                         items={nationalityitem}
                         setOpen={setOpennationality}
                         setValue={setnationality}
                         setItems={setnationalityitems}
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
                             //backgroundColor: "#F5F7F6",
                             marginTop: 10,
                             marginBottom: 20,
                             minHeight: 40,
                         }}
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
              </>
            )}


            {/* CHECK IF ITS ACADEMIC INFORMATION */}
            {step === 2 && (
              <View style={{marginHorizontal: 10}}>
              <Text>Student ID</Text>
              <TextInput
               //style={styles.Forminput}
               mode="outlined"
               value={studentid}
               onChangeText={(e) => setstudentid(e)}
              />
              <Text style={styles.Forminputhelp}>Leave blank to auto generate ID</Text>

              <Text style={{marginTop: 20}}>Entry Level</Text>
              <DropDownPicker
                 searchable
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

            {id !== undefined && (
                <>
                <Text style={{marginTop: 20}}>Current Level</Text>
              <DropDownPicker
                 searchable
                  open={opencurrentlevel}
                  value={currentlevel}
                  items={currentlevelitem}
                  setOpen={setOpencurrentlevel}
                  setValue={setcurrentlevel}
                  setItems={setcurrentlevelitems}
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


            {school !== "Basic School" && (
                <>
                
                
                </>
            )}





                </>
            )}



          </View>
            )}




          {/* CHECK IF INFORMATION IS GURDIAN INFORMATION */}
          {step === 3 && (

              <View style={{marginHorizontal: 10}}>

              <Text style={{fontSize: 20, fontWeight: 500, marginBottom: 20}}>First Guardian</Text>

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


              <Text style={{fontSize: 20, fontWeight: 500, marginBottom: 20}}>Second Guardian</Text>

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

          )}




          {/* CHECK IF ITS PAYMENT INFORMATION */}
          {step === 4 && (
            <View style={{marginHorizontal: 10, marginTop: 20}}>
                    
            <Text>Payment Type</Text>
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
            {checkpaydiscount()}
            <Text style={styles.Forminputhelp}> Payment Percentage if Discount Child %</Text>
            
        </View>
              
          )}  


         {issubmitting ? <ActivityIndicator size="large" style={{marginTop: 30, marginBottom: 50}} /> : (
            <Button mode="contained" style={{marginTop: 30, marginBottom: 50, marginHorizontal: 10}} onPress={createdata}>Add Student</Button>
         )}


          </ScrollView>
          </KeyboardAwareScrollView>
        )}
      
        </SafeAreaView>
    </Provider>
    )
}

export default Addstudent;

const styles = StyleSheet.create({

  separator: {
      height: 0.5,
      backgroundColor: 'rgba(0,0,0,0.4)',
  },

    Forminput: {
        marginBottom: 20
    },
    Forminputhelp: {
        marginBottom: 20,
        color: '#1782b6'
    }


});