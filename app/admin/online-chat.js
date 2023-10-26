import axios from 'axios';
import { Redirect, Stack, useRouter, useSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert,Dimensions, DeviceEventEmitter, PermissionsAndroid, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, Card, Divider, List, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { TimePickerModal } from 'react-native-paper-dates';
import { useCallback } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { schoolzapi } from '../../components/constants';
import { selecttoken, selectuser } from '../../features/userinfoSlice';
import { Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { seleteorigin, setHeading, setOrgaddress, setOrigin } from '../../features/examSlice';
import * as Location from 'expo-location';
import { Linking,Modal } from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat'

import { Icon } from '@rneui/base';
import InChatFileTransfer from '../../components/Vehicle/InChatFileTransfer';
import { db } from '../../config/firebase';
import { collection, addDoc, getDocs, query, orderBy, where, onSnapshot, and, or } from 'firebase/firestore';
import { useLayoutEffect } from 'react';



function Onlinechat() {

    const cuser = useSelector(selectuser);
    const [Name, setName] = useState("");
    const [Model, setModel] = useState("");
    const [color, setcolor] = useState("");
    const [Number, setNumber] = useState("");
    const [file, setFile] = useState(null);
    const [imgfile, setimgFile] = useState(null);

    const [company, setcompany] = useState({});
    const origin = useSelector(seleteorigin);
    const [aorigin, setorigin] = useState(false);
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [openv, setOpenv] = useState(false);
    const [vvalue, setvValue] = useState(null);
    const [vitems, setvItems] = useState([]);
    
    const [creatoredit, isCreatedorEdit] = useState();
    const [isloading, setLoading] = useState(false);
    const [issubmitting, setIssubmitting] = useState(false);
    const router = useRouter();
    const {id,name,muser} = useSearchParams();
    const SCREEN_HEIGHT = Dimensions.get("window").height;
    const [messages, setMessages] = useState([]);

    // inside App() 
    // declare 4 states
    const [isAttachImage, setIsAttachImage] = useState(false);
    const [isAttachFile, setIsAttachFile] = useState(false);
    const [imagePath, setImagePath] = useState('');
    const [filePath, setFilePath] = useState('');

   // console.log("Chat id",id);
    //console.log("+user?.id",+name);

    // add state to view file
   const [fileVisible, setFileVisible] = useState(false);

    // interface File extends IMessage {
    //     url?: string;
    // }

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
  
  
    async function _pickDocument() {
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
           // setFile(result);
            if (result.indexOf('.png') !== -1 || result.indexOf('.jpg') !== -1) {
              setImagePath(fileUri);
              setIsAttachImage(true);
            } else {
              setFilePath(fileUri);
              setIsAttachFile(true);
            }

          }
        }
      } catch (err) {
        setFile(null);
        console.warn(err);
        return false;
      }
    }


        // Modify renderSend(), adding TouchOpacity to clickable
  // const renderSend = (props) => {
  //   return (
  //     <View style={{flexDirection: 'row'}}>
  //       <TouchableOpacity onPress={_pickDocument}>
  //         <Icon
  //           type="font-awesome"
  //           name="paperclip"
  //           style={styles.paperClip}
  //           size={28}
  //           color='blue'
  //         />
  //       </TouchableOpacity>
  //       <Send {...props}>
  //         <View style={styles.sendContainer}>
  //           <Icon
  //             type="font-awesome"
  //             name="send"
  //             style={styles.sendButton}
  //             size={25}
  //             color='orange'
  //           />
  //         </View>
  //       </Send>
  //     </View>
  //   );
  // };

  // add a function to view your file picked before click send it
  // const renderChatFooter = useCallback(() => {
  //   if (imagePath) {
  //     return (
  //       <View style={styles.chatFooter}>
  //         <Image source={{uri: imagePath}} style={{height: 75, width: 75}} />
  //         <TouchableOpacity
  //           onPress={() => setImagePath('')}
  //           style={styles.buttonFooterChatImg}
  //         >
  //           <Text style={styles.textFooterChat}>X</Text>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   }
  //   if (filePath) {
  //     return (
  //       <View style={styles.chatFooter}>
  //         <InChatFileTransfer
  //           filePath={filePath}
  //         />
  //         <TouchableOpacity
  //           onPress={() => setFilePath('')}
  //           style={styles.buttonFooterChat}
  //         >
  //           <Text style={styles.textFooterChat}>X</Text>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   }
  //   return null;
  // }, [filePath, imagePath]);

  
// Modify renderBuble()
// const renderBubble = (props) => {
//     const {currentMessage} = props;
//     if (currentMessage.file && currentMessage.file.url) {
//       return (
//         <TouchableOpacity
//         style={{
//           ...styles.fileContainer,
//           backgroundColor: props.currentMessage.user._id === 2 ? '#2e64e5' : '#efefef',
//           borderBottomLeftRadius: props.currentMessage.user._id === 2 ? 15 : 5,
//           borderBottomRightRadius: props.currentMessage.user._id === 2 ? 5 : 15,
//         }}
//         onPress={() => setFileVisible(true)}
//         >
//           <InChatFileTransfer
//             style={{marginTop: -10}}
//             filePath={currentMessage.file.url}
//           />
//           <InChatViewFile
//               props={props}
//               visible={fileVisible}
//               onClose={() => setFileVisible(false)}
//             />
//           <View style={{flexDirection: 'column'}}>
//             <Text style={{
//                   ...styles.fileText,
//                   color: currentMessage.user._id === 2 ? 'white' : 'black',
//                 }} >
//               {currentMessage.text}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       );
//     }
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#2e64e5',
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#efefef',
//           },
//         }}
//       />
//     );
//   };
  // Note: copy and paste all styles in App.js from my repository

  const scrollToBottomComponent = () => {
    return <Ionicons name="angle-double-down" size={22} color="#333"/>
  };


  // Modify onSend()
  const onSend = useCallback((messages = []) => {
    let from = id;
    let receipient = muser;
    const { _id, createdAt, text, user,} = messages[0];
   // console.log("receipient",{ _id, createdAt,  text, user, from,  receipient});
  //  console.log("User 2",cuser?.id);
    addDoc(collection(db, 'chats'), { _id, createdAt,  text, user, from,  receipient});
}, []);

  // const onSend = useCallback((messages = []) => {
  //   const [messageToSend] = messages;
  //   if (isAttachImage) {
  //     const newMessage = {
  //       _id: messages[0]._id + 1,
  //       text: messageToSend.text,
  //       createdAt: new Date(),
  //       user: {
  //         _id: user?.id,
  //         avatar: user?.avatar,
  //       },
  //       image: imagePath,
  //       file: {
  //         url: ''
  //       }
  //     };
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, newMessage)
  //     );
  //     const { _id, createdAt, text, user,} = messages[0];
  //     addDoc(collection(db, 'chats'), { _id, createdAt,  text, user });
  //     setImagePath('');
  //     setIsAttachImage(false);
  //   } else if (isAttachFile) {
  //     const newMessage = {
  //       _id: messages[0]._id + 1,
  //       text: messageToSend.text,
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         avatar: '',
  //       },
  //       image: '',
  //       file: {
  //         url: filePath
  //       }
  //     };
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, newMessage),
  //     );
  //     setFilePath('');
  //     setIsAttachFile(false);
  //   } else {
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, messages),
  //     );
  //     const { _id, createdAt, text, user,} = messages[0];
  //     addDoc(collection(db, 'chats'), { _id, createdAt,  text, user });
  //   }
  // },
  // [filePath, imagePath, isAttachFile, isAttachImage],
  // );


    useEffect(()=>{
        loaddata();
        findByContinent();
    },[]);

  //   useLayoutEffect(async() => {      
  //     const q = query(collection(db, "chats"), and(
  //       where('from', '==', `${cuser?.id}`), where('receipient', '==', `${id}`),  
  //       or(
  //         where('from', '==', `${id}`),
  //         where('receipient', '==', `${cuser?.id}`)
  //       )
  //     ), orderBy('createdAt', 'desc'));

  //     const doc_refs = await getDocs(q);

  //     const res = []

  //     doc_refs.forEach(snapshot => {
  //         res.push({
  //           _id: doc.data()._id,
  //           createdAt: doc.data().createdAt.toDate(),
  //           text: doc.data().text,
  //           user: doc.data().user,
  //         })
  //     });


      
  //    // console.log('q : ', q);
      
  //     const unsubscribe = onSnapshot(getDocs(q), (snapshot) => setMessages(
  //         snapshot.docs.map(doc => ({
  //             _id: doc.data()._id,
  //             createdAt: doc.data().createdAt.toDate(),
  //             text: doc.data().text,
  //             user: doc.data().user,
  //         }))
  //     ));

  //     return () => {
  //       unsubscribe();
  //     };

  // }, []);
  

  async function findByContinent (){

    // const q = query(collection(db, "chats"), and(
    //   where('from', '==', `${cuser?.id}`), where('receipient', '==', `${id}`),  
    //   or(
    //     where('from', '==', `${id}`),
    //     where('receipient', '==', `${cuser?.id}`)
    //   )
    // ), orderBy('createdAt', 'desc'));

    // const q = query(collection(db, "chats"), where('from', '==', cuser?.id), where('receipient', '==', id),
    //  or( where("from", "==", id),
    // where("receipient", "==", cuser?.id)), orderBy('createdAt', 'desc'));

    const q = query(
      collection(db, 'chats'),
      where('from', '==', id),
      where('receipient', '==', muser),
      orderBy('createdAt', 'desc')
    );

    //console.log("q",q);
    


    const doc_refs = await getDocs(q);

    const res = []

    doc_refs.forEach(doc => {
        res.push({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })
    });

   // console.log("res",res);

    setMessages(res);
  
  }

 

    function fetchcompany() {

        return axios.get(schoolzapi+'/company-report-info/'+id,
        {
            headers: {Accept: 'application/json'
        }
        });
    }

    function fetchcompanyserv() {

        return axios.get(schoolzapi+'/companys-services/'+id,
        {
            headers: {Accept: 'application/json'
        }
        });
    }

    function companyreview() {

        return axios.get(schoolzapi+'/companys-info-review/'+id,
        {
            headers: {Accept: 'application/json'
        }
        });
    }

    const loaddata = () => {
        setLoading(true);
        
        Promise.all([fetchcompany(), fetchcompanyserv(), companyreview()])
        .then(function (results) {

            const company = results[0];
            const serv = results[1];
            const review = results[2];

            setcompany(company.data);
            setItems(serv.data);
            setvItems(review.data);

            console.log("company.data",company.data);

            setLoading(false);

        }).catch(function(error){
            setLoading(false);

            console.log("error",error);

           
            
        });
    }


    return (
      <SafeAreaView>
        <Stack.Screen
            options={{
                headerTitle: "Online Chat",
                presentation: 'formSheet',
                headerShown: true,
                headerLeft: () => (
                  <>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=> router.back()} style={{marginRight: 10}}>
                            <Ionicons name="arrow-back-circle" size={30} />
                        </TouchableOpacity>

                        <Image 
                            source={{ uri: cuser?.role == "User" ? company?.logo : cuser?.avatar }}
                            style={{width: 30, height: 30}}
                        />
                    </View>
                    
                    
                  </>
                )
            }}

        />
        <ScrollView style={{marginBottom: 30}}>
        {isloading ? <ActivityIndicator size="large" color="#1782b6" style={{marginTop: 50}} /> : (
        <Card>
        <Card.Content>

        {/* <ScrollView horizontal={true}>
            <View style={{flexDirection: 'row', justifyContent: "space-around"}}>
                <Button mode="elevated" style={{marginRight: 20}} onPress={()=> router.push(`/admin/location?id=${id}&name=${name}`)}>Location</Button>
                <Button mode="elevated"  style={{marginRight: 20}} onPress={()=> router.push(`/admin/review?id=${id}&name=${name}`)}>Reviews</Button>
                <Button mode="contained"  style={{marginRight: 20}} onPress={()=> router.push(`/admin/chat?id=${id}&name=${name}`)}>Chat</Button>
                {company && <Button mode="elevated"  style={{marginRight: 20}} onPress={()=> Linking.openURL(`tel:${company?.contact}`)}>Call</Button>}
            </View>
        </ScrollView> */}

        <View style={{height: SCREEN_HEIGHT-100}}>

            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                  _id: cuser?.id,
                  name: cuser?.name,
                  avatar: cuser?.avatar
              }}
              //from={cuser?.id}
              //receipient={id}

               // renderBubble={renderBubble}
                alwaysShowSend
               // renderSend={renderSend}
                scrollToBottom
               // scrollToBottomComponent={scrollToBottomComponent}
                //renderChatFooter={renderChatFooter}
            />

    </View>


</Card.Content>
        </Card>
        )}

        </ScrollView>


      </SafeAreaView>
    )
}

export default Onlinechat;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});