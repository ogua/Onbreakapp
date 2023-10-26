import React, { Component, useCallback, useRef } from 'react'
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { FlatList,Image, Platform, RefreshControl, SafeAreaView,
  ScrollView, StyleSheet, Text, TouchableOpacity, 
  View, DeviceEventEmitter, Alert, StatusBar, ActivityIndicator } from 'react-native'
  import { useEffect } from 'react';
  import {RadioButton, Card, Dialog, List, Menu, Portal,Button, Provider, Searchbar, Avatar, TextInput, Divider } from 'react-native-paper';
  import { useState } from 'react';
  import axios from 'axios';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { useSelector } from 'react-redux';
  import * as Imagepicker from 'expo-image-picker';
  import { showMessage } from "react-native-flash-message";
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  import DropDownPicker from 'react-native-dropdown-picker';
//  import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { selectroles, selecttoken, selectuser } from '../../features/userinfoSlice';
import { schoolzapi } from '../constants';
import { Table, Row, Rows, TableWrapper, Col } from 'react-native-table-component';

  
  function Tinysampletwo ({stndid,termid,stclassid,term,stclass,from,to}) {
    
    const token = useSelector(selecttoken);
    const role = useSelector(selectroles);
    const user = useSelector(selectuser);
    const [isloading, setLoading] = useState(true);
    const router = useRouter();
    const [visible, setVisible] = useState(0);
    const scrollViewRef = useRef();

    const [data, setdata] = useState({});
    const [answer, setanswer] = useState({});

    const tableHeadone = ['Colours Can', 'Red', 'Yellow','Pink','Green','Orange','Purple','Blue','Grey','Black','White','Brown'];
    const  onewidthArr = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

    const tableHeadtwo = ['Numbers', 'Can count up to', 'Can identify', 'Quantities', 'Can sort in groups', 'Can write', 'Can add', 'Can take away'];
    const  twowidthArr = [100, 100, 100, 100, 100, 100, 100, 100];

    const tableHeadthree = ['Letters', 'Can say A-Z', 'Can identify', 'Can write', 'Can write name', 'Can associate "a"-apple etc', '', ''];
    const  threewidthArr = [100, 100, 100, 100, 100, 100, 100, 100];

    const tableHeadfour = ['Shape Can', 'Circle', 'Square', 'Triangle', 'Oblong', 'Star', 'Oval', 'Semi-circle'];
    const  fourwidthArr = [100, 100, 100, 100, 100, 100, 100, 100];

    
   
    useEffect(()=> {

      loaddata();

    },[]);
    
    
    const loaddata = () => {
      setLoading(true);
      
      axios.get(schoolzapi+`/report-sample-two-tinnytower/${stndid}/${termid}/${stclassid}`,
      {
        headers: {Accept: 'application/json',
        Authorization: "Bearer "+token
      }
    })
    .then(function (results) {

      //console.log("report one",results.data.data);
      setdata(results.data.data);
      setLoading(false);
      
      
    }).catch(function(error){
      setLoading(false);
      console.log(error);
    });
  }


  const loadresults = (data,answer) => {
            
    const mddatas = data;
    
    let mdata = [];
    
    const myanswer = answer?.answers ?? '';

     mddatas.map((item,index) =>  mdata.push([item.question !== "" ? item.question.toUpperCase() : '', myanswer !== "" ? myanswer.split('|')[index++].toUpperCase() : '']));
    
     setdata(mdata);

     console.log(mdata);
}



return (
        <>
        <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#000'}}>
              <Row data={[`${stclass} ${term} Results`]} style={styles.header} textStyle={styles.textleft}/>
              <Row data={tableHeadone} widthArr={onewidthArr} style={styles.header} textStyle={{fontWeight: '100', marginLeft: 10}}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                   <Row
                      data={[`Identify`,`${data?.identifyred == undefined ? `` : `${data?.identifyred !=="" && `Yes`}`}`,`${data?.identifyyell == undefined ? `` : `${data?.identifyyell !=="" && `Yes`}`}`,`${data?.identifypink == undefined ? `` : `${data?.identifypink !=="" && `Yes`}`}`,`${data?.identifygreen == undefined ? `` : `${data?.identifygreen !=="" && `Yes`}`}`,`${data?.identifyoran == undefined ? `` : `${data?.identifyoran !=="" && `Yes`}`}`,`${data?.identifypurp == undefined ? `` : `${data?.identifypurp !=="" && `Yes`}`}`,`${data?.identifyblue == undefined ? `` : `${data?.identifyblue !=="" && `Yes`}`}`,`${data?.identifygrey == undefined ? `` : `${data?.identifygrey !=="" && `Yes`}`}`,`${data?.identifyblack == undefined ? `` : `${data?.identifyblack !=="" && `Yes`}`}`,`${data?.identifywhite == undefined ? `` : `${data?.identifywhite !=="" && `Yes`}`}`,`${data?.identifybrown == undefined ? `` : `${data?.identifybrown !=="" && `Yes`}`}`]}
                      widthArr={onewidthArr}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                    <Row                
                      data={[`Sort`,`${data?.sortred == undefined ? `` : `${data?.sortred !=="" && `Yes`}`}`,
                      `${data?.sortyell == undefined ? `` : `${data?.sortyell !=="" && `Yes`}`}`,`${data?.sortpink == undefined ? `` : `${data?.sortpink !=="" && `Yes`}`}`,`${data?.sortgreen == undefined ? `` : `${data?.sortgreen !=="" && `Yes`}`}`,`${data?.sortoran == undefined ? `` : `${data?.sortoran !=="" && `Yes`}`}`,`${data?.sortpurp == undefined ? `` : `${data?.sortpurp !=="" && `Yes`}`}`,`${data?.sortblue == undefined ? `` : `${data?.sortblue !=="" && `Yes`}`}`,
                      ,`${data?.sortgrey == undefined ? `` : `${data?.sortgrey !=="" && `Yes`}`}`,
                      ,`${data?.sortblack == undefined ? `` : `${data?.sortblack !=="" && `Yes`}`}`,
                      ,`${data?.sortwhite == undefined ? `` : `${data?.sortwhite !=="" && `Yes`}`}`,
                      ,`${data?.sortbrown == undefined ? `` : `${data?.sortbrown !=="" && `Yes`}`}`
                    ]}
                      widthArr={onewidthArr}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                   
                   
                   <Row 
                    data={tableHeadtwo} 
                        widthArr={twowidthArr} 
                        style={styles.header} 
                        textStyle={{fontWeight: '100', marginLeft: 10}}
                   />

                   <Row
                      data={[``,`${data?.Cancountupto == undefined ? `` : `${data?.Cancountupto !=="" && `Yes`}`}`,`${data?.Canidentify == undefined ? `` : `${data?.Canidentify !=="" && `Yes`}`}`,`${data?.Quantities == undefined ? `` : `${data?.Quantities !=="" && `Yes`}`}`,`${data?.Cansortingroups == undefined ? `` : `${data?.Cansortingroups !=="" && `Yes`}`}`,`${data?.Canwritenum == undefined ? `` : `${data?.Canwritenum !=="" && `Yes`}`}`,`${data?.Canadd == undefined ? `` : `${data?.Canadd !=="" && `Yes`}`}`,`${data?.Cantakeaway == undefined ? `` : `${data?.Cantakeaway !=="" && `Yes`}`}`]}
                      widthArr={twowidthArr}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                  <Row 
                    data={tableHeadthree} 
                        widthArr={threewidthArr} 
                        style={styles.header} 
                        textStyle={{fontWeight: '100', marginLeft: 10}}
                   />

                   <Row
                      data={[``
                      ,`${data?.CansayAZ == undefined ? `` : `${data?.CansayAZ !=="" && `${data?.CansayAZ}`}`}`,
                      `${data?.Canidentifyletter == undefined ? `` : `${data?.Canidentifyletter !=="" && `${data?.Canidentifyletter}`}`}`,
                      `${data?.Canwrite == undefined ? `` : `${data?.Canwrite !=="" && `${data?.Canwrite}`}`}`,
                      `${data?.Canwritename == undefined ? `` : `${data?.Canwritename !=="" && `${data?.Canwritename}`}`}`,
                      `${data?.Canassociate == undefined ? `` : `${data?.Canassociate !=="" && `${data?.Canassociate}`}`}`,
                      ``,
                      ``]}
                      widthArr={threewidthArr}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                   <Row 
                    data={tableHeadfour} 
                    widthArr={fourwidthArr} 
                        style={styles.header} 
                        textStyle={{fontWeight: '100', marginLeft: 10}}
                   />

                   <Row
                      data={[`Draw`,
                      `${data?.drawCircle == undefined ? `` : `${data?.drawCircle !=="" && `Yes`}`}`,
                      `${data?.drawSquare == undefined ? `` : `${data?.drawSquare !=="" && `Yes`}`}`,
                      `${data?.drawTriangle == undefined ? `` : `${data?.drawTriangle !=="" && `Yes`}`}`,
                      `${data?.drawOblong == undefined ? `` : `${data?.drawOblong !=="" && `Yes`}`}`,
                      `${data?.drawStar == undefined ? `` : `${data?.drawStar !=="" && `Yes`}`}`,
                      `${data?.drawOval == undefined ? `` : `${data?.drawOval !=="" && `Yes`}`}`,
                      `${data?.drawSemi == undefined ? `` : `${data?.drawSemi !=="" && `Yes`}`}`]}
                      widthArr={fourwidthArr}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                     <Row
                      data={[`Identify`,
                      `${data?.IdentifyCircle == undefined ? `` : `${data?.IdentifyCircle !=="" && `Yes`}`}`,
                      `${data?.IdentifySquare == undefined ? `` : `${data?.IdentifySquare !=="" && `Yes`}`}`,
                      `${data?.IdentifyTriangle == undefined ? `` : `${data?.IdentifyTriangle !=="" && `Yes`}`}`,
                      `${data?.IdentifyOblong == undefined ? `` : `${data?.IdentifyOblong !=="" && `Yes`}`}`,
                      `${data?.IdentifyStar == undefined ? `` : `${data?.IdentifyStar !=="" && `Yes`}`}`,
                      `${data?.IdentifyOval == undefined ? `` : `${data?.IdentifyOval !=="" && `Yes`}`}`,
                      `${data?.IdentifySemi == undefined ? `` : `${data?.IdentifySemi !=="" && `Yes`}`}`]}
                      widthArr={fourwidthArr}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                   <Row
                      data={['Paper work : '+data?.Paperwork]}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                  <Row
                      data={['Painting/Art & craft : '+data?.Painting]}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                  <Row 
                    data={['Co-ordination']} 
                        style={styles.header} 
                        textStyle={{fontWeight: '100', marginLeft: 10}}
                   />

                   <Row
                      data={['Hand eye : '+data?.Handeye]}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                    <Row
                      data={['Large Motor : '+data?.LargeMotor]}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />
                    <Row
                      data={['How well does he/she listen ?: '+data?.listen]}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                    <Row
                      data={['Work alone: '+data?.Workalone]}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                  <Row
                      data={['Group interaction: '+data?.interaction]}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />

                  <Row
                      data={['Interacts with adults: '+data?.Interacts]}
                      style={[styles.row,{backgroundColor: '#F7F6E7'}]}
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />
              
                <TableWrapper style={{flexDirection: 'row'}}>
                   <Col data={['ADDITIONAL COMMENTS : '+data?.addinfo]} heightArr={[60]} textStyle={{fontWeight: '100', marginLeft: 10}} />
               </TableWrapper>
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>

        </>      
      )
}
    
    export default Tinysampletwo;
    
    const styles = StyleSheet.create({
      
      separator: {
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.4)',
      },
      calendarWrapper: {
        padding: 0,
        margin: 0,
        height: '100%',
        width: '100%'
      },
      container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
      header: { height: 50, backgroundColor: '#fff' },
      text: { textAlign: 'center', fontWeight: '100' },
      textleft: { textAlign: 'left', marginLeft: 10, fontSize: 18 },
      dataWrapper: { marginTop: -1 },
      row: { height: 40, backgroundColor: '#E7E6E1' }
    });