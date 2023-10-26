import React, { Component } from 'react'
import { Stack, useRouter } from 'expo-router';
import { FlatList,Image, Platform, RefreshControl, SafeAreaView,
   ScrollView, StyleSheet, Text, TouchableOpacity, 
   View, DeviceEventEmitter, Alert } from 'react-native'
import { useEffect } from 'react';
import { Card, Dialog, List, Menu, Portal,Button, Provider, Searchbar, ActivityIndicator } from 'react-native-paper';
import { useState } from 'react';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import * as Imagepicker from 'expo-image-picker';
import { schoolzapi } from '../constants';
import { selecttoken } from '../../features/userinfoSlice';
import Visitorslist from '../../lists/Visitorslist';
import Studentlist from '../../lists/Studentlist';
import Normallist from '../../lists/Normallist';
import { showMessage } from "react-native-flash-message";


function Allstudents () {

    const token = useSelector(selecttoken);
    const [search, setSearch] = useState();
    const [isloading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filterdata, setFilterdata] = useState([]);
    const [studentclass, setStudentclass] = useState([]);
    const router = useRouter();
    const [visible, setVisible] = useState(0);
    const [showdialog, setShowdialog] = useState(false);
    const showDialog = () => setShowdialog(true);
    const hideDialog = () => setShowdialog(false);
    const [showsnakbar, setShowsnakbar] = useState(false);
    const [active, setActive] = useState("");

    useEffect(()=> {
      
      DeviceEventEmitter.addListener("subject.added", (event)=>{
        console.log('how many time');
        loaddata();
        DeviceEventEmitter.removeAllListeners("event.test");
      });

       loaddata();

    },[]);

    function getUserAccount() {

        return axios.get(schoolzapi+'/student-info',
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        });
      }
      
      function getstudentclass() {

        return axios.get(schoolzapi+'/student-classes',
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        });
      }


    const loaddata = () => {
        setLoading(true);
        
        Promise.all([getUserAccount(), getstudentclass()])
        .then(function (results) {
            setLoading(false);
            const acct = results[0];
            const studeclass = results[1];

            setData(acct.data.data);
            setFilterdata(acct.data.data);
            setStudentclass(studeclass.data.data);
            //studentclass.push({id: 1222333333, "name": 'All'});
            ///let newall = [...studentclass];
            //setStudentclass([...newall,{id: 1222333333, "name": 'All'}]);
            //setStudentclass([...studentclass,{id: 1222333333, "name": 'All'}]);
           // console.log('studeclass 1',studentclass);
            

           // console.log('userdata', acct).data;
          // console.log('studeclass 2',studentclass);

        }).catch(function(error){
            setLoading(false);
            const acct = error[0];
            const studeclass = error[1];
            
        });
    }


    const deletedata = (id,delname) => {

        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to delete "+delname+" from records",
            [
              {
                text: "No",
              },
              {
                text: "Yes Delete",
                onPress: () => {
                    setLoading(true);
                    axios.delete(schoolzapi+'/student-info/'+id,
                    {
                        headers: {Accept: 'application/json',
                        Authorization: "Bearer "+token
                    }
                    })
                        .then(function (response) {
                            const newData = data.filter((item) => item.id != id);
                            setFilterdata(newData);
                            setData(newData);
                            //loaddata();
                            setLoading(false);

                            showMessage({
                              message: 'Student Information Deleted Successfully!',
                              type: "success",
                              position: 'bottom',
                          });

                        })
                        .catch(function (error) {
                        setLoading(false);
                        console.log(error);
                        });
                },
              },
            ]
          );

    }

    const updatestatus = (id,delname,value) => {

      return Alert.alert(
          "Are your sure?",
          "You want update "+delname+" Current Status",
          [
            {
              text: "No",
            },
            {
              text: "Yes Update",
              onPress: () => {
                  setLoading(true);
                  axios.get(schoolzapi+`/student-status-update/${id}/${value}`,
                  {
                      headers: {Accept: 'application/json',
                      Authorization: "Bearer "+token
                  }
                  })
                      .then(function (response) {

                          showMessage({
                            message: 'Student status updated Successfully!',
                            type: "success",
                            position: 'bottom',
                        });

                        loaddata();

                      })
                      .catch(function (error) {
                      setLoading(false);
                      console.log(error);
                      });
              },
            },
          ]
        );

  }

  const updatesstclass = (id,delname,value) => {

    return Alert.alert(
        "Are your sure?",
        "You want update "+delname+" Current Class",
        [
          {
            text: "No",
          },
          {
            text: "Yes Update",
            onPress: () => {
                setLoading(true);
                axios.get(schoolzapi+`/student-class-update/${id}/${value}`,
                {
                    headers: {Accept: 'application/json',
                    Authorization: "Bearer "+token
                }
                })
                    .then(function (response) {

                        showMessage({
                          message: 'Student class updated Successfully!',
                          type: "success",
                          position: 'bottom',
                      });

                      loaddata();

                    })
                    .catch(function (error) {
                    setLoading(false);
                    console.log(error);
                    });
            },
          },
        ]
      );

}


  
  
      const searchFilterFunction = (text) => {
  
          if (text) {
              
            const newData = data.filter(function (item) {
              const itemData = item.fullname
                ? item.fullname.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            setFilterdata(newData);
            setSearch(text);
          } else {
            setFilterdata(data);
            setSearch(text);
          }
    };


    const checkclassselected = (id) => {

      if(active == id){
        setActive("All");
        searchFilterclassFunction("All");
      }else{
        setActive(id);
        searchFilterclassFunction(id);
      }
    }


    const stclasslist = (item) => (
        <>
        <TouchableOpacity style={{backgroundColor: `${active == item.id ? `#1782b6` : `#fff` }`, borderRadius: 30, marginTop: 10, marginRight: 20}}
        onPress={()=> {
            checkclassselected(item.id);
        }}
        >
        <List.Item
            title={item?.name}
            titleStyle={{color: `${active == item.id ? `#fff` : `#000` }`}}
            titleEllipsizeMode="middle"/>
        </TouchableOpacity>
        </>
    );

    const searchFilterclassFunction = (text) => {
        
        if (text) {
            if(text == "All"){

              setFilterdata(data);

            }else{
              const newData = data.filter(item => item.currentlevel == text);
              setFilterdata(newData);
            }
          //setSearch(text);
        } else {
          setFilterdata(data);
          //setSearch(text);
        }
  };

    return (
      <Provider>
      <SafeAreaView>
        <Stack.Screen
         options={{
          headerTitle: 'Students List'
         }}
        />

        {isloading ? <ActivityIndicator size="large" /> : (
          <>
          
       <Searchbar
            placeholder='Search....'
            mode="outlined"
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
        />

        <View>
           <FlatList
                data={studentclass}
                renderItem={({item})=> stclasslist(item) }
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                }}
                keyExtractor={item => item.id}
                horizontal
            />
        </View>

        <ScrollView
        refreshControl={
            <RefreshControl refreshing={false} onRefresh={loaddata} />
        }
        >
                <Card>
                <Card.Content>
                <FlatList
                    data={filterdata}
                    renderItem={({item})=> <Studentlist item={item} deletedata={deletedata} studentclasslist={studentclass} updatestatus={updatestatus} updatesstclass={updatesstclass} /> }
                      contentContainerStyle={{
                        marginBottom: 200
                    }}
                    keyExtractor={item => item.id}
                />
                </Card.Content>
            </Card> 

        </ScrollView>
        </>
        )}
      </SafeAreaView>
      </Provider>
    )
}

export default Allstudents;

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
  }
});