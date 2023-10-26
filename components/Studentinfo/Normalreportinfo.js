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
 // import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { selectroles, selecttoken, selectuser } from '../../features/userinfoSlice';
import { schoolzapi } from '../constants';
import { Table, Row, Rows, TableWrapper, Col } from 'react-native-table-component';

  
  function Normalreportinfo ({stndid,termid,stclassid,term,stclass}) {
    
    const token = useSelector(selecttoken);
    const role = useSelector(selectroles);
    const user = useSelector(selectuser);
    const [isloading, setLoading] = useState(true);
    const router = useRouter();
    const [visible, setVisible] = useState(0);
    const scrollViewRef = useRef();

    const [data, setdata] = useState([]);
    const [answer, setanswer] = useState({});

    const tableHead = ['Subject', 'C.S', 'E.S', 'TOT', 'GR', 'RMKS'];
    const  widthArr = [200, 60, 60, 60, 120, 120];
    const tableData = [];
   
    useEffect(()=> {

      loaddata();

    },[]);
    
    
    const loaddata = () => {
      setLoading(true);
      
      axios.get(schoolzapi+`/normal-results/${stndid}/${termid}/${stclassid}`,
      {
        headers: {Accept: 'application/json',
        Authorization: "Bearer "+token
      }
    })
    .then(function (results) {

      //console.log("report normal",results.data.data);
      loadresults(results.data.data);
      //setdata(results.data.data);
      setanswer(results.data.quanswers);
      setLoading(false);
      
      
    }).catch(function(error){
      setLoading(false);
      console.log(error);
    });
  }


  const loadresults = (data) => {
            
    const mddatas = data;
    
    let mdata = [];

     mddatas.map(item =>  mdata.push([item.subject,item.classtestscore,item.examscore,item.total,item.grade,item.remarks]));
    
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
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {
                  data.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
                <TableWrapper style={{flexDirection: 'row'}}>
                   <Col data={[`GROWTH AND IMPROVEMENT OBSERVED : ${answer?.growthnimprove !== undefined ? answer?.growthnimprove : answer?.growthnimprove !== "" ? answer?.growthnimprove : answer?.growthnimprove}`, 'AREAS NEEDING ADDITIONAL WORK : '+answer?.areasneedwork, 'GROUP WORK : '+answer?.groupwork, 'CONDUCT : '+answer?.genremarknconduct]} heightArr={[60, 60,60,60]} textStyle={{fontWeight: '100', marginLeft: 10}} />
               </TableWrapper>
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>

        </>      
      )
}
    
    export default Normalreportinfo;
    
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