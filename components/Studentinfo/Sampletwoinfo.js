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

  
  function Sampletwoinfo ({stndid,termid,stclassid,term,stclass,from,to}) {
    
    const token = useSelector(selecttoken);
    const role = useSelector(selectroles);
    const user = useSelector(selectuser);
    const [isloading, setLoading] = useState(true);
    const router = useRouter();
    const [visible, setVisible] = useState(0);
    const scrollViewRef = useRef();

    const [data, setdata] = useState([]);
    const [answer, setanswer] = useState("");

    const tableHead = [];
    const  widthArr = [600, 100, 100, 100];
    const tableData = [];
   
    useEffect(()=> {

      loaddata();

    },[]);
    
    
    const loaddata = () => {
      setLoading(true);
      
      axios.get(schoolzapi+`/report-sample-two/${stndid}/${termid}/${stclassid}/${from}/${to}`,
      {
        headers: {Accept: 'application/json',
        Authorization: "Bearer "+token
      }
    })
    .then(function (results) {

      // console.log("report one",results.data.quanswers.answers);
      //loadtititle(results.data.data);

      //loadresults(results.data.data,results.data.quanswers);
      setdata(results.data.data);
      setanswer(results.data.quanswers);
      setLoading(false);
      
      
    }).catch(function(error){
      setLoading(false);
      console.log(error);
    });
  }

  const loadtititle = (data) => {
            
    const mddatas = data;
        
     mddatas.map((item,index) =>  tableHead.push([item.title, 'ALWAYS', 'SOMETMES', 'NOTYET']));
    
     console.log(tableHead);
}


  const loadresults = (data,answer) => {
            
    const mddatas = data;
    
    let mdata = [];
    
    const myanswer = answer?.answers ?? '';

     mddatas.map((item,index) =>  mdata.push([item.title.toUpperCase(), 'ALWAYS', 'SOMETMES', 'NOTYET']));
    
     tableHead(mdata);

     console.log(mdata);
}


function showquestions(qrowData,qindex){

  if(answer.answers !== ""){
    const answersplit = answer.answers.split("|");
    let always = answersplit[qindex] == 'ALWAYS' ? 'Yes' : '';
    let somtimes = answersplit[qindex] == 'SOMETMES' ? 'Yes' : '';
    let notyet = answersplit[qindex] == 'NOTYET' ? 'Yes' : '';
    return (
            <Row
                key={qindex}
                data={[`${qindex + 1}. ${qrowData.question}`,`${always}`,`${somtimes}`,`${notyet}`]}
                widthArr={widthArr}
                style={[styles.row,{borderBottom: '#fff', borderWidth: 0.5}]}
                textStyle={{fontWeight: '100', marginLeft: 10}}
          />
    );
  }else{
    return (
      <Row
          key={qindex}
          data={[`${qindex + 1}. ${qrowData.question}`,'','','']}
          widthArr={widthArr}
          style={[styles.row,{borderBottom: '#fff', borderWidth: 0.5}]}
          textStyle={{fontWeight: '100', marginLeft: 10}}
    />
);
  }

}



return (
        <>
        <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#000'}}>
              <Row data={[`${stclass} ${term} Results`]} style={ { height: 50, backgroundColor: '#fff', borderBottom: '#000', borderWidth: 1,borderRight: 0, borderLeft: 0, borderTop: 0, fontWeight: 400 }} textStyle={styles.textleft}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {
                  data.map((rowData, index) => (
                    <>
                    <Row
                      key={index}
                      data={[rowData?.title.toUpperCase(),'ALWAYS','SOMETMES','NOT YET']}
                      widthArr={widthArr}
                      style={styles.header} 
                      textStyle={{fontWeight: '100', marginLeft: 10}}
                    />
                    {
                       // console.log("questions",rowData.questions)
                        rowData.questions.map((qrowData, qindex) => (
                          <>
                          {answer !== "" ? (
                            <>
                            {
                              showquestions(qrowData,qindex)
                            }
                            </>

                          ) : (
                            <Row
                              key={qindex}
                              data={[`${qindex + 1}. ${qrowData.question}`, '', '', '']}
                              widthArr={widthArr}
                              style={[styles.row,{borderBottom: '#fff', borderWidth: 0.5}]}
                              textStyle={{fontWeight: '100', marginLeft: 10}}
                            />

                          )}
                          </>

                        ))
                    }
                    
                    </>
                  ))
                }
                <TableWrapper style={{flexDirection: 'row'}}>
                   <Col data={['GENERAL REMARKS AND CONDUCT : '+answer.genremarknconduct]} heightArr={[60]} textStyle={{fontWeight: '100', marginLeft: 10}} />
               </TableWrapper>
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>

        </>      
      )
}
    
    export default Sampletwoinfo;
    
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