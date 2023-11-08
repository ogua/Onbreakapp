import {View,StyleSheet, FlatList, Linking, Platform } from 'react-native';

import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { schoolzapi, images } from '../../components/constants';
import { Redirect, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectpermissions, selectroles, selectstaffrole, selectuser, selectuserpermission } from '../../features/userinfoSlice';
import { showMessage } from "react-native-flash-message";

//import * as Sharing from 'expo-sharing';


 function Usercontent(props) {

 const [ispressed, setIspressed] = useState(false);
 const [focus, setFocus] = useState();
 const [subfocus, setsubFocus] = useState();
 const user = useSelector(selectuser);
 const router = useRouter();
 const dispatch = useDispatch();
 const permission = useSelector(selectuserpermission);
 const role = useSelector(selectroles);
 const driver = useSelector(selectstaffrole);

 const handlelogout = () => {
  
  dispatch(logout());
    showMessage({
      message: 'Logout Successfully!',
      type: 'danger',
      position: 'bottom',
  });

  router.push("/");
 // return <Redirect href="/login" />;
 };

 //console.log("permission",permission);

const setitemfocus = (itemid) => {

  if(focus === itemid){
    setFocus(111111111);
  }else{
    setFocus(itemid);
  }

}


const setfocustate  = (key) => {
  //console.log("Focus",focus);
  if(focus > 0){
    setFocus(0);
  }else{
    setFocus(key);
  }
}


function checkpermission(){

  if(permission !== null){
    if(permission.includes("viewaccountmanagement")){
      return (
         <DrawerItem 
                icon={({color, size}) => (
                    <Icon 
                    name="cash" 
                    color={color}
                    size={size}
                    />
                )}
                label="Make Payment"
                onPress={()=> props.navigation.navigate("Makepayment")}
          /> 
      );
    }
  }

}

    const paperTheme = useTheme();
        return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={{backgroundColor: '#fff',
                    flexDirection: 'row', alignItems: 'center',padding: 10}}>
                       <Avatar.Image 
                            source={images.splashbus}
                            size={30}
                        />

                        <Text style={{fontSize: 15, marginLeft: 10}}>Breakdown Report</Text>
                    </View>

                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',padding: 10, alignItems: 'center'}}>
                            <Avatar.Image 
                                source={{uri: props.user?.avatar}}
                                size={50}
                            />
                            <View style={{ marginLeft: 10}}>
                                <Title style={styles.title}>{props.user?.name}</Title>
                            </View>
                        </View>
                    </View>
                  
                  <Drawer.Section style={styles.drawerSection}>

                  <DrawerItem 
                      focused={focus == `2112` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="account-outline"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>Profile</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`2112`);
                        setsubFocus(0);
                        props.navigation.navigate("profile");

                      }}
                     />

                  {props.user?.role == "User" ? (
                    <>

                    <DrawerItem 
                      focused={focus == `1` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="map-marker-circle"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>Report Breakdown</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`1`);
                        setsubFocus(0);
                        props.navigation.navigate("userdashboard");

                      }}
                     />


                 <DrawerItem 
                      focused={focus == `00220` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="bus-school"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>Vehicles</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`00220`);
                        setsubFocus(0);
                        props.navigation.navigate("Allvehicle");

                      }}
                     />

                   <DrawerItem 
                      focused={focus == `003330` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="map-marker-circle"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>History</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`003330`);
                        setsubFocus(0);
                        props.navigation.navigate("History");

                      }}
                     />


                    {/* <DrawerItem 
                      focused={focus == `00650` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="mail"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>Chat</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`00650`);
                        setsubFocus(0);
                        props.navigation.navigate("Providers");

                      }}
                     /> */}


                    
                    </>
                  ) : (
                    <>

                  <DrawerItem 
                      focused={focus == `124` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="monitor-dashboard"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>Company Information</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`124`);
                        setsubFocus(0);
                        props.navigation.navigate("Companyinfo");

                      }}
                     />

                   <DrawerItem 
                      focused={focus == `145` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="monitor-dashboard"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>Services</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`145`);
                        setsubFocus(0);
                        props.navigation.navigate("Services");

                      }}
                     />

                <DrawerItem 
                      focused={focus == `002330` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="map-marker-circle"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>Requests</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`002330`);
                        setsubFocus(0);
                        props.navigation.navigate("Requests");

                      }}
                     />

                     <DrawerItem 
                      focused={focus == `00330` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="map-marker-circle"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>Reviews</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`00330`);
                        setsubFocus(0);
                        props.navigation.navigate("Review");

                      }}
                     />

                   {/* <DrawerItem 
                      focused={focus == `00650` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="mail"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>Chat</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`00650`);
                        setsubFocus(0);
                        props.navigation.navigate("Users");

                      }}
                     /> */}


                    
                    </>
                  )}
                
                        
                </Drawer.Section>
                    
                </View>
                
            </DrawerContentScrollView>
          
            <Drawer.Section style={styles.bottomDrawerSection}>

                {/* <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="share" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Share"
                    onPress={() => {

                      Sharing.isAvailableAsync().then((available) => {
                        if (available) {

                          Sharing.shareAsync("https://oguaschoolz.com/images/logo.png")
                            .then((data) => {
                              alert('Shared');
                            })
                            .catch((err) => {
                              alert('Error sharing image');
                              console.log(JSON.stringify(err));
                            });


                          //alert('Sharing is available');
                        } else {
                          alert('Sharing is NOT available');
                        }
                      });

                    }}
                /> */}

                
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {handlelogout()}}
                />

                  

            </Drawer.Section>


        
        </View>
    );
}

export default Usercontent;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      marginTop: -4
    },
    userInfoSection: {
      backgroundColor: '#fff',
      borderBottomColor: '#000',
      borderTopWidth: 1,
      borderBottomWidths: 1
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#000',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 10,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#000',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
