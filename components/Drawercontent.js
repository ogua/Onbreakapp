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
import { images } from './constants';
import { Redirect, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectpermissions, selectroles, selectstaffrole, selectuser, selectuserpermission } from '../features/userinfoSlice';
import { showMessage } from "react-native-flash-message";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  } from "react-native-google-mobile-ads";

import * as Sharing from 'expo-sharing';


 function Drawercontent(props) {
 const [ispressed, setIspressed] = useState(false);
 const [focus, setFocus] = useState();
 const [subfocus, setsubFocus] = useState();
 const user = useSelector(selectuser);
 const router = useRouter();
 const dispatch = useDispatch();
 const permission = useSelector(selectuserpermission);
 const role = useSelector(selectroles);
 const driver = useSelector(selectstaffrole);

 const fileUri = require('../assets/logo.png');

 const osver = Platform.constants['Release'];

 const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5448171275225637~4193774452';

 //console.log("osver",osver);

 const handlelogout = () => {
  
  dispatch(logout());
    showMessage({
      message: 'Logout Successfully!',
      type: 'danger',
      position: 'bottom',
  });

  router.push("/expo-auth-session");
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

 const drawerlist = [
  
  {
    key: 2,
    name: 'Academics',
    icon: 'calendar-month',
    route: 'Academics',
    permission: 'viewacademics',
    role: '',
    children: [
    {
      key: 21,
      name: 'Academic Term',
      icon: 'circle-outline',
      route: 'Academicterm',
      permission: 'viewacademics',
      role: '',
    },
    {
      key: 22,
      name: 'Academic Year',
      icon: 'circle-outline',
      route: 'Academicyear',
      permission: 'viewacademics',
      role: '',
    },
    // {
    //   key: 23,
    //   name: 'Academic Calendar',
    //   icon: 'circle-outline',
    //   route: 'Calendar',
    //   permission: 'viewacademics',
    //   role: '',
    // },
    {
      key: 24,
      name: 'Subject',
      icon: 'circle-outline',
      route: 'Sujects',
      permission: 'viewacademics',
      role: '',
    },
    {
      key: 25,
      name: 'Classes',
      icon: 'circle-outline',
      route: 'Classroom',
      permission: 'viewacademics',
      role: '',
    },
    {
      key: 26,
      name: 'Promote Student',
      icon: 'circle-outline',
      route: 'Promotestudent',
      permission: 'viewacademics',
      role: '',
    },
  ]
  },
  {
    key: 3,
    name: 'Front Desk',
    icon: 'remote-desktop',
    route: 'Front Desk',
    permission: 'viewfrontdesk',
    role: '',
    children: [
      {
        key: 31,
        name: 'Enquiries',
        icon: 'circle-outline',
        route: 'Enquiry',
        permission: 'viewfrontdesk',
        role: '',
      },
      {
        key: 32,
        name: 'Visitors',
        icon: 'circle-outline',
        route: 'Visitors',
        permission: 'viewfrontdesk',
        role: '',
      },
      {
        key: 33,
        name: 'Call Logs',
        icon: 'circle-outline',
        route: 'Calllogs',
        permission: 'viewfrontdesk',
        role: '',
      },
      {
        key: 34,
        name: 'Postal Dispatch',
        icon: 'circle-outline',
        route: 'Postaldispatch',
        permission: 'viewfrontdesk',
        role: '',
      },
      {
        key: 35,
        name: 'Postal Received',
        icon: 'circle-outline',
        route: 'Postalreceived',
        permission: 'viewfrontdesk',
        role: '',
      },
    ]
  },
  {
    key: 4,
    name: 'Add Student',
    icon: 'account',
    route: 'Newstudent',
    permission: 'viewadmission',
    role: '',
    children: []
  },
  {
    key: 5,
    name: 'Students',
    icon: 'account-group',
    route: 'All Students',
    permission: 'viewallstudents',
    role: '',
    children: [
      {
        key: 51,
        name: 'All Students',
        icon: 'circle-outline',
        route: 'Studentlist',
        permission: 'viewallstudents',
        role: '',
      },
      {
        key: 54,
        name: 'All Active Students',
        icon: 'circle-outline',
        route: 'Allactivestudents',
        permission: 'viewallstudents',
        role: '',
      },
      {
        key: 52,
        name: 'All Stopped Students',
        icon: 'circle-outline',
        route: 'Allstoppedstudents',
        permission: 'viewallstudents',
        role: '',
      },
      {
        key: 53,
        name: 'All Dismissed Students',
        icon: 'circle-outline',
        route: 'Alldismissedstudents',
        permission: 'viewallstudents',
        role: '',
      },
      {
        key: 514,
        name: 'All Completed Students',
        icon: 'circle-outline',
        route: 'Allcompletedstudents',
        permission: 'viewallstudents',
        role: '',
      },
    ]
  },
  {
    key: 6,
    name: 'Accounts',
    icon: 'cash',
    route: 'Accounts Management',
    permission: 'viewaccountmanagement',
    role: '',
    children: [
      // {
      //   key: 61,
      //   name: 'Online Fee Payment',
      //   icon: 'circle-outline',
      //   route: 'All Students',
      //   permission: 'viewonlinefeepayment',
      //   role: '',
      //   children: []
      // },
      {
        key: 62,
        name: 'Fees',
        icon: 'circle-outline',
        route: 'Fee',
        permission: 'viewfees',
        role: '',
        children: []
      },
      {
        key: 63,
        name: 'Fee Master',
        icon: 'circle-outline',
        route: 'Feemaster',
        permission: 'viewfeemaster',
        role: '',
        children: []
      },
      {
        key: 64,
        name: 'Dispatch Fees',
        icon: 'circle-outline',
        route: 'Dispacchfees',
        permission: 'viewdispatchfees',
        role: '',
        children: []
      },
      {
        key: 65,
        name: 'View Dispatcted',
        icon: 'circle-outline',
        route: 'Viewdispatched',
        permission: 'viewviewdispatchedfees',
        role: '',
        children: []
      },
      {
        key: 66,
        name: 'All Transactions',
        icon: 'circle-outline',
        route: 'Alltransactions',
        permission: 'viewtransactions',
        role: '',
        children: []
      },
      {
        key: 67,
        name: 'Transactions Per Term',
        icon: 'circle-outline',
        route: 'Transactionsperterm',
        permission: 'viewtransactions',
        role: '',
        children: []
      },
      {
        key: 68,
        name: 'Transactions Per Day',
        icon: 'circle-outline',
        route: 'Transactionsperday',
        permission: 'viewtransactions',
        role: '',
        children: []
      },
      {
        key: 69,
        name: 'Transactions Per Month',
        icon: 'circle-outline',
        route: 'Transactionspermonth',
        permission: 'viewtransactions',
        role: '',
        children: []
      },
      {
        key: 619,
        name: 'Transaction Report',
        icon: 'circle-outline',
        route: 'Sendtransactionbymail',
        permission: 'viewtransactions',
        role: '',
        children: []
      },
      {
        key: 610,
        name: 'Fee Payment',
        icon: 'circle-outline',
        route: 'Feepayment',
        permission: 'viewfeepayment',
        role: '',
        children: []
      },
      {
        key: 611,
        name: 'Debtors',
        icon: 'circle-outline',
        route: 'Debtors',
        permission: 'viewdebtors',
        role: '',
        children: []
      },
      {
        key: 612,
        name: 'Receipts',
        icon: 'circle-outline',
        route: 'Receipttrack',
        permission: 'viewreceipts',
        role: '',
        children: []
      },
      {
        key: 613,
        name: 'Chart of Accounts',
        icon: 'circle-outline',
        route: 'Chartofaccount',
        permission: 'viewchartofaccounts',
        role: '',
        children: []
      },
      {
        key: 614,
        name: 'Bank Transaction',
        icon: 'circle-outline',
        route: 'Banktransaction',
        permission: 'viewbanktransactions',
        role: '',
        children: []
      },
      {
        key: 615,
        name: 'Vendors',
        icon: 'circle-outline',
        route: 'Vendors',
        permission: 'viewvendors',
        role: '',
        children: []
      },
      {
        key: 616,
        name: 'Income Expenses',
        icon: 'circle-outline',
        route: 'Incomeexpense',
        permission: 'viewincomeexpense',
        role: '',
        children: []
      },
      // {
      //   key: 617,
      //   name: 'Accounting',
      //   icon: 'circle-outline',
      //   route: 'All Students',
      //   permission: '',
      //role: '',
      //   children: []
      // },
      
      // {
      //   key: 618,
      //   name: 'Vendors',
      //   icon: 'circle-outline',
      //   route: 'All Students',
      //   permission: '',
      //role: '',
      //   children: []
      // },
    ]
  },
  {
    key: 7,
    name: 'Human Resource',
    icon: 'account-group',
    route: 'Human Resource',
    permission: 'viewhumanresource',
    role: '',
    children: [
      {
        key: 71,
        name: 'Staff',
        icon: 'circle-outline',
        route: 'Allstaff',
        permission: 'viewstaff',
        role: '',
        children: []
      },
      {
        key: 72,
        name: 'Staff Attendance',
        icon: 'circle-outline',
        route: 'Staffattendance',
        permission: 'viewstaffattendance',
        role: '',
        children: []
      },
      {
        key: 73,
        name: 'All Attendance',
        icon: 'circle-outline',
        route: 'Allstaffattendance',
        permission: 'viewallattendance',
        role: '',
        children: []
      },
      {
        key: 74,
        name: 'Payroll',
        icon: 'circle-outline',
        route: 'Allpayroll',
        permission: 'viewpayroll',
        role: '',
        children: []
      },
      {
        key: 75,
        name: 'Staff Leave',
        icon: 'circle-outline',
        route: 'Leave',
        permission: 'viewstaffleave',
        role: '',
        children: []
      },
      {
        key: 76,
        name: 'Teachers Review',
        icon: 'circle-outline',
        route: 'All Students',
        permission: 'viewteachersreview',
        role: '',
        children: []
      }
    ]
  },
  {
    key: 8,
    name: 'Hostel',
    icon: 'home-city-outline',
    route: 'All Students',
    permission: 'viewhostel',
    role: '',
    children: [
    {
      key: 81,
      name: 'Add Hostel',
      icon: 'circle-outline',
      route: 'Hostel',
      permission: 'viewhostel',
      role: '',
      children: []
    },
    {
      key: 82,
      name: 'Allocate Student',
      icon: 'circle-outline',
      route: 'Allocatestudent',
      permission: 'viewhostel',
      role: '',
      children: []
    }
  ]
  },
  {
    key: 9,
    name: 'Teaching Log',
    icon: 'post',
    route: 'Teachinglogs',
    permission: 'viewteachinglog',
    role: '',
    children: []
  },
  {
    key: 10,
    name: 'Report Signature',
    icon: 'draw-pen',
    route: 'Terninalreportsignature',
    permission: 'viewterminalreportsignatures',
    role: '',
    children: []
  },
  {
    key: 11,
    name: 'Weekly Report',
    icon: 'chart-line',
    route: 'All Students',
    permission: 'viewteachersweeklyreport',
    role: '',
    children: []
  },
  {
    key: 1112,
    name: 'Online Quiz',
    icon: 'cast-education',
    route: 'Listexams',
    permission: 'viewonlinequiz',
    role: '',
    children: [
      {
        key: 11121,
        name: 'Questions Bank',
        icon: 'circle-outline',
        route: 'Questionbank',
        permission: 'viewonlinequiz',
        role: '',
        children: []
      },
      {
        key: 11122,
        name: 'Examinations',
        icon: 'circle-outline',
        route: 'Examination',
        permission: 'viewonlinequiz',
        role: '',
        children: []
      },
    ]
  },
  {
    key: 13,
    name: 'Library',
    icon: 'library',
    route: 'All Students',
    permission: 'viewlibrary',
    role: '',
    children: [
      {
        key: 131,
        name: 'Books',
        icon: 'circle-outline',
        route: 'Books',
        permission: 'viewlibrary',
        role: '',
        children: []
      },{
        key: 132,
        name: 'Issue Books',
        icon: 'circle-outline',
        route: 'Issuebooks',
        permission: 'viewlibrary',
        role: '',
        children: []
      },
    ]
  },
  {
    key: 414,
    name: 'Inventory',
    icon: 'book-outline',
    route: 'All Students',
    permission: 'viewinventory',
    role: '',
    children: []
  },
  {
    key: 12,
    name: 'Transportation',
    icon: 'bus-school',
    route: 'All Students',
    permission: 'viewtransportation',
    role: '',
    children: [
      {
        key: 121,
        name: 'Vehicle',
        icon: 'circle-outline',
        route: 'vehicle',
        permission: 'viewtransportation',
        role: '',
        children: []
      },
      {
        key: 122,
        name: 'Waypoints',
        icon: 'circle-outline',
        route: 'waypoint',
        permission: 'viewtransportation',
        role: '',
        children: []
      },
      {
        key: 123,
        name: 'Routes',
        icon: 'circle-outline',
        route: 'Routes',
        permission: 'viewtransportation',
        role: '',
        children: []
      },
      // {
      //   key: 124,
      //   name: 'Waypoint Transfer',
      //   icon: 'circle-outline',
      //   route: 'All Students',
      //   permission: 'viewtransportation',
      //   role: '',
      //   children: []
      // },
    ]
  },
  {
    key: 20,
    name: 'E Learning',
    icon: 'video-vintage',
    route: 'Onlinelearning',
    permission: 'viewe-learning',
    role: '',
    children: []
  },
  // {
  //   key: 102,
  //   name: 'Live Class',
  //   icon: 'google-classroom',
  //   route: 'Zoommeetings',
  //   permission: 'viewonlineclass',
  //   role: '',
  //   children: []
  // },
  {
    key: 21,
    name: 'Home work',
    icon: 'book-open-outline',
    route: 'Listhomework',
    permission: 'viewonlineassignment',
    role: '',
    children: []
  },
  {
    key: 14,
    name: 'Student Attendance',
    icon: 'account-check-outline',
    route: 'Studentattendance',
    permission: 'viewstudentattendance',
    role: '',
    children: [
      {
        key: 141,
        name: 'Record Attendance',
        icon: 'circle-outline',
        route: 'Studentattendance',
        permission: 'viewstudentattendance',
        role: '',
        children: []
      },
      {
        key: 142,
        name: 'Total Attendance',
        icon: 'circle-outline',
        route: 'Totalattendance',
        permission: 'viewstudentattendance',
        role: '',
        children: []
      },
    ]
  },
  {
    key: 15,
    name: 'Student Results',
    icon: 'chart-timeline',
    route: 'All Students',
    permission: 'viewstudentresults',
    role: '',
    children: [
      {
        key: 151,
        name: 'Enter Results',
        icon: 'circle-outline',
        route: 'Enterresults',
        permission: 'viewstudentresults',
        role: '',
        children: []
      },
      {
        key: 152,
        name: 'Results per subject',
        icon: 'circle-outline',
        route: 'Resultspersubject',
        permission: 'viewstudentresults',
        role: '',
        children: []
      },
      // {
      //   key: 153,
      //   name: 'Results per student',
      //   icon: 'circle-outline',
      //   route: 'All Students',
      //   permission: 'viewstudentresults',
      //   role: '',
      //   children: []
      // },
    ]
  },
  {
    key: 16,
    name: 'Questionaires',
    icon: 'help-circle-outline',
    route: 'All Students',
    permission: 'viewquestionnaires',
    role: '',
    children: [
      {
        key: 161,
        name: 'Questionaire 1',
        icon: 'circle-outline',
        route: 'Questionnaire 1',
        permission: 'viewquestionnaires',
        role: '',
        children: []
      },
      {
        key: 162,
        name: 'Questionaire 2',
        icon: 'circle-outline',
        route: 'Questionnaire 2',
        permission: 'viewquestionnaires',
        role: '',
        children: []
      },
    ]
  },
  {
    key: 17,
    name: 'Terminal Report',
    icon: 'chart-line',
    route: 'Normalreport',
    permission: 'viewterminalreport',
    role: '',
    children: []
  },
  {
    key: 18,
    name: 'Communicate',
    icon: 'email-box',
    route: 'All Students',
    permission: 'viewcommunicate',
    role: '',
    children: [
      {
        key: 181,
        name: 'Noticeboard',
        icon: 'circle-outline',
        route: 'Noticeboard',
        permission: 'viewnoticeboard',
        role: '',
        children: []
      },
      {
        key: 182,
        name: 'Message Template',
        icon: 'circle-outline',
        route: 'Messagetemplate',
        permission: 'viewmessagetemplate',
        role: '',
        children: []
      },
      {
        key: 183,
        name: 'Send SMS',
        icon: 'circle-outline',
        route: 'Sendsms',
        permission: 'viewsendsms',
        role: '',
        children: []
      },
      {
        key: 184,
        name: 'Send Mail',
        icon: 'circle-outline',
        route: 'Sendmail',
        permission: 'viewsendmail',
        role: '',
        children: []
      },
      {
        key: 185,
        name: 'Send Notification',
        icon: 'circle-outline',
        route: 'Sendpushnotification',
        permission: 'viewsendmail',
        role: '',
        children: []
      }
    ]
  },
  {
    key: 19,
    name: 'Settings',
    icon: 'cog',
    route: 'All Students',
    permission: 'viewsettings',
    role: '',
    children: [
      {
        key: 191,
        name: 'School Information',
        icon: 'circle-outline',
        route: 'Schoolinformation',
        permission: 'viewsettings',
        role: '',
        children: []
      },
      {
        key: 192,
        name: 'SMS Settings',
        icon: 'circle-outline',
        route: 'Smssettings',
        permission: 'viewsettings',
        role: '',
        children: []
      },
      {
        key: 193,
        name: 'Notification Settings',
        icon: 'circle-outline',
        route: 'Notificationsettings',
        permission: 'viewsettings',
        role: '',
        children: []
      },
      {
      key: 194,
      name: 'Mail Settings',
      icon: 'circle-outline',
      route: 'Mailsettings',
      permission: 'viewsettings',
      role: '',
      children: []
    }
    ]
  },






 ];

const setfocustate  = (key) => {
  //console.log("Focus",focus);
  if(focus > 0){
    setFocus(0);
  }else{
    setFocus(key);
  }
}

permission !== null && permission.includes("viewaccountmanagement")


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
                            source={images.softwarelogo}
                            size={30}
                        />

                        <Text style={{fontSize: 15, marginLeft: 10}}>OguaSchoolz</Text>
                    </View>

                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',padding: 10, alignItems: 'center'}}>
                            <Avatar.Image 
                                source={{uri: props.user.avatar}}
                                size={50}
                            />
                            <View style={{ marginLeft: 10}}>
                                <Title style={styles.title}>{props.user.name}</Title>
                            </View>
                        </View>
                    </View>

                    {permission !== null && (

                  
                  <Drawer.Section style={styles.drawerSection}>

                  <DrawerItem 
                      focused={focus == `1` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="monitor-dashboard"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>Dashboard</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`1`);
                        setsubFocus(0);
                        props.navigation.navigate("Dashboard");

                      }}
                     />


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
                        props.navigation.navigate("Profile");

                      }}
                     />


                    {role[0] == "Student" && (
                      <DrawerItem 
                      focused={focus == `00220` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="cash"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>My Transaction</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`00220`);
                        setsubFocus(0);
                        props.navigation.navigate("Studenttransaction");

                      }}
                     />
                    )}

                {driver == "Driver" && (
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
                                <Text {...focused}>Driver</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`003330`);
                        setsubFocus(0);
                        props.navigation.navigate("Trackroute");

                      }}
                     />
                    )}


                   {role[0] == "Staff" && (
                      <DrawerItem 
                      focused={focus == `00220` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="cash"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>My Payroll</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`00220`);
                        setsubFocus(0);
                        props.navigation.navigate("Studenttransaction");

                      }}
                     />
                    )}

                    {drawerlist.map(item => {
                      
                      if(item.permission !=""){

                        if(permission.includes(item.permission)){

                          return (
                          <>
                          {item.key == 14 ? (
                            <>

                            {role[0] == 'Student' ? (
                              <>
                          <DrawerItem 
                            focused={focus == `1092` ? true: false}
                            icon={({color, size}) => (
                                <Icon 
                                  name="account-check-outline"
                                    color={color}
                                    size={size}
                                    />
                                )}
                              label={({color, focused}) => (
                                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <Text {...focused}>Attendance</Text>
                                  </View>
                              )}   
                            onPress={() => {
                              setitemfocus(`1092`);
                              setsubFocus(0);
                              props.navigation.navigate("Myattendance");

                            }}
                          />
                              
                              </>
                            ) : (
                              <DrawerItem 
                              focused={focus == item.key ? true: false}
                              icon={({color, size}) => (
                                  <Icon 
                                    name={item.icon}
                                      color={color}
                                      size={size}
                                      />
                                  )}
                                label={({color, focused}) => (
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text {...focused}>{item.name}</Text>
                                        {item.children.length > 0 && (
                                          <>
                                          {focus == item.key ? (
                                              <Ionicons name='arrow-down' size={25} color={color} />
                                          ): (
                                            <Ionicons name='arrow-up' size={25} color={color} />
                                          )}
                                          </>
                                        )}
                                    </View>
                                )}   
                              onPress={() => {
                                setitemfocus(item.key);
                                if(item.children.length > 0){

                                }else{
                                  setsubFocus(0);
                                  props.navigation.navigate(item.route);
                                }

                              }}
                            />
                            )}
                            
                            
                            </>
                          ) : (
                            <>

                            {item.key == `1112` ? 
                            (
                              <>
                              {role[0] == "Student" ? (
                                <DrawerItem 
                                focused={focus == `111112` ? true: false}
                                icon={({color, size}) => (
                                    <Icon 
                                      name="cash"
                                        color={color}
                                        size={size}
                                        />
                                    )}
                                  label={({color, focused}) => (
                                      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                          <Text {...focused}>Online Quiz</Text>
                                      </View>
                                  )}   
                                onPress={() => {
                                  setitemfocus(`111112`);
                                  setsubFocus(0);
                                  props.navigation.navigate("Examination");

                                }}
                              />
                              ) : (
                                <>
                              <DrawerItem 
                                focused={focus == item.key ? true: false}
                                icon={({color, size}) => (
                                    <Icon 
                                      name={item.icon}
                                        color={color}
                                        size={size}
                                        />
                                    )}
                                  label={({color, focused}) => (
                                      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                          <Text {...focused}>{item.name}</Text>
                                          {item.children.length > 0 && (
                                            <>
                                            {focus == item.key ? (
                                                <Ionicons name='arrow-down' size={25} color={color} />
                                            ): (
                                              <Ionicons name='arrow-up' size={25} color={color} />
                                            )}
                                            </>
                                          )}
                                      </View>
                                  )}   
                                onPress={() => {
                                  setitemfocus(item.key);
                                  if(item.children.length > 0){

                                  }else{
                                    setsubFocus(0);
                                    props.navigation.navigate(item.route);
                                  }

                                }}
                              />
                                
                                </>
                              )}
                              
                              </>
                            ) : 
                            (<>

                             <DrawerItem 
                              focused={focus == item.key ? true: false}
                              icon={({color, size}) => (
                                  <Icon 
                                    name={item.icon}
                                      color={color}
                                      size={size}
                                      />
                                  )}
                                label={({color, focused}) => (
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text {...focused}>{item.name}</Text>
                                        {item.children.length > 0 && (
                                          <>
                                          {focus == item.key ? (
                                              <Ionicons name='arrow-down' size={25} color={color} />
                                          ): (
                                            <Ionicons name='arrow-up' size={25} color={color} />
                                          )}
                                          </>
                                        )}
                                    </View>
                                )}   
                              onPress={() => {
                                setitemfocus(item.key);
                                if(item.children.length > 0){

                                }else{
                                  setsubFocus(0);
                                  props.navigation.navigate(item.route);
                                }

                              }}
                            />

                            
                            </>)}
                            
                            </>
                          )}

                          {focus == item.key && (
                          <>
                          {item.children.map(children => {
                            if(permission.includes(children.permission)){
                              return (
                            <DrawerItem 
                            focused={focus == item.key &&  subfocus == children.key ? true: false}
                            icon={({color, size}) => (
                                <Icon 
                                  name={children.icon}
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label={({color, focused}) => (
                                  <Text>{children.name}</Text>
                              )}  
                            onPress={() => {
                                setsubFocus(children.key);
                                props.navigation.navigate(children.route);
                            }}
                            />
                              );
                            }
                          })}

                        </>
                       )}

                          </>

                          );

                        }
                      }else{
                        return (
                        <DrawerItem 
                          focused={focus == item.key ? true: false}
                          icon={({color, size}) => (
                              <Icon 
                                name={item.icon}
                                  color={color}
                                  size={size}
                                  />
                              )}
                            label={({color, focused}) => (
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text {...focused}>{item.name}</Text>
                                    {item.children.length > 0 && (
                                      <>
                                      {focus == item.key ? (
                                          <Ionicons name='arrow-down' size={25} color={color} />
                                      ): (
                                        <Ionicons name='arrow-up' size={25} color={color} />
                                      )}
                                      </>
                                    )}
                                </View>
                            )}   
                          onPress={() => {
                            setitemfocus(item.key);
                            if(item.children.length > 0){

                            }else{
                              setsubFocus(0);
                              props.navigation.navigate(item.route);
                            }

                          }}
                      />
                        );
                      }
                    })}

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
                                <Text {...focused}>Track School Bus</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`003330`);
                        setsubFocus(0);
                        props.navigation.navigate("Trackroute");

                      }}
                     />


                   {role[0] == "Student" && (
                      <DrawerItem 
                      focused={focus == `002220` ? true: false}
                      icon={({color, size}) => (
                          <Icon 
                            name="cash"
                              color={color}
                              size={size}
                              />
                          )}
                        label={({color, focused}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text {...focused}>My Results</Text>
                            </View>
                        )}   
                      onPress={() => {
                        setitemfocus(`002220`);
                        setsubFocus(0);
                        props.navigation.navigate("Myresults");

                      }}
                     />
                    )}




                    {/* {drawerlist.map(item => (
                        <>
                          <DrawerItem 
                            focused={focus == item.key ? true: false}
                            icon={({color, size}) => (
                                <Icon 
                                  name={item.icon}
                                    color={color}
                                    size={size}
                                    />
                                )}
                              label={({color, focused}) => (
                                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <Text {...focused}>{item.name}</Text>
                                      {item.children.length > 0 && (
                                        <>
                                        {focus == item.key ? (
                                            <Ionicons name='arrow-down' size={25} color={color} />
                                        ): (
                                          <Ionicons name='arrow-up' size={25} color={color} />
                                        )}
                                        </>
                                      )}
                                  </View>
                              )}   
                            onPress={() => {
                              setitemfocus(item.key);
                              if(item.children.length > 0){

                              }else{
                                setsubFocus(0);
                                props.navigation.navigate(item.route);
                              }

                            }}
                        />

                        {focus == item.key && (
                          <>
                          {item.children.map(children => (

                            <DrawerItem 
                            focused={focus == item.key &&  subfocus == children.key ? true: false}
                            icon={({color, size}) => (
                                <Icon 
                                  name={children.icon}
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label={({color, focused}) => (
                                  <Text>{children.name}</Text>
                              )}  
                            onPress={() => {
                                setsubFocus(children.key);
                                props.navigation.navigate(children.route);
                            }}
                            />

                          ))}

                        </>
                       )}

                        </>

                        
                    ))} */}
                
                        
                </Drawer.Section>

                )}

                    
                </View>
                
            </DrawerContentScrollView>
          
            <Drawer.Section style={styles.bottomDrawerSection}>
            
                
                
                {checkpermission()}

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
                        name="help" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Help"
                    onPress={() => {
                      setitemfocus(`44430`);
                      setsubFocus(0);
                      props.navigation.navigate("Help");

                    }}
                   // onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=+233545819229&text=Hello%20OguaSchoolz%20Please%20i%20need%20your%20help`)}
                />


                
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


            <View style={{marginLeft: 15, marginBottom: 10}}>

              <BannerAd
                  unitId={adUnitId}
                  size={'250x50'}
                  requestOptions={{ requestNonPersonalizedAdsOnly: true }}
              />

            </View>

            

        </View>
    );
}

export default Drawercontent;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      marginTop: -4
    },
    userInfoSection: {
      backgroundColor: '#fff',
      borderBottomColor: '#000',
      borderTopWidth: 1,
      borderBottomWidth: 1
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
