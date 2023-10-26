import React, { Component } from 'react'
import { Stack, useRouter } from 'expo-router';
import { FlatList,Image, Platform, RefreshControl, SafeAreaView,
   ScrollView, StyleSheet, Text, TouchableOpacity, 
   View, DeviceEventEmitter, Alert } from 'react-native'
import { useEffect } from 'react';
import { Card, Dialog, List, Menu, Portal,Button, Provider, Searchbar, FAB } from 'react-native-paper';
import { useState } from 'react';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import * as Imagepicker from 'expo-image-picker';
import { selecttoken } from '../features/userinfoSlice';
import { schoolzapi } from './constants';
import Teachingloglist from '../lists/Teachinglolist';
import Terminalsiglist from '../lists/Terminalsignatures';

function Terninalreportsignature () {

    const token = useSelector(selecttoken);
    const [search, setSearch] = useState();
    const [isloading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filterdata, setFilterdata] = useState([]);
    const router = useRouter();
    const [visible, setVisible] = useState(0);
    const [showdialog, setShowdialog] = useState(false);
    const showDialog = () => setShowdialog(true);
    const hideDialog = () => setShowdialog(false);
    const [showsnakbar, setShowsnakbar] = useState(false);
    

    useEffect(()=> {
      
      // DeviceEventEmitter.addListener("subject.added", (event)=>{
      //   console.log('how many time');
      //   loaddata();
      //   DeviceEventEmitter.removeAllListeners("event.test");
      // });

       loaddata();

    },[]);


    const loaddata = () => {
        setLoading(true);
        axios.get(schoolzapi+'/terminal-report-signatures',
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        })
          .then(function (response) {
            console.log(response.data.data);
            setData(response.data.data);
            setFilterdata(response.data.data);
            setLoading(false);
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error);
          });
    }


    const deletedata = (id,delname) => {

        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to delete "+delname+" info",
            [
              {
                text: "No",
              },
              {
                text: "Yes Delete",
                onPress: () => {
                    setLoading(true);
                    axios.delete(schoolzapi+'/terminal-report-signatures/'+id,
                    {
                        headers: {Accept: 'application/json',
                        Authorization: "Bearer "+token
                    }
                    })
                        .then(function (response) {
                            const newData = data.filter((item) => item.id != id);
                            setFilterdata(newData);
                            setData(newData);
                            loaddata();
                            //setLoading(false);
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
  

    return (
      <Provider>
      <SafeAreaView style={{flexGrow: 1}}>
        <Stack.Screen options={{
            headerTitle: 'Terminal Report Signatures'
        }}
        />
        <ScrollView style={{backgroundColor: '#fff'}}
        refreshControl={
            <RefreshControl refreshing={isloading} onRefresh={loaddata} />
        }
        >
          
        {/* {isloading ? null : (
           <View style={{marginVertical: 20}}>
                <View style={{flexDirection: 'row',justifyContent: 'flex-end', marginHorizontal: 20}}>
                    
                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=> router.push('/admin/custom/create-edit-terminal-sig')}>
                        <Ionicons name='add-circle' size={22} color="#17a2b8"/>
                        <Text style={{fontSize: 18}}>New</Text> 
                    </TouchableOpacity>
                </View>
            </View>)} */}
            
            <Card>
                <Card.Content>
                <FlatList
                    data={filterdata}
                    renderItem={({item})=> <Terminalsiglist item={item} deletedata={deletedata} /> }
                    ItemSeparatorComponent={()=> <View style={styles.separator} />}
                      contentContainerStyle={{
                         marginBottom: 10
                    }}
                    keyExtractor={item => item.id}
                />
                </Card.Content>
            </Card> 

        </ScrollView>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={()=> router.push('/admin/custom/create-edit-terminal-sig')}
        />
      </SafeAreaView>
      </Provider>
    )
}

export default Terninalreportsignature;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
  },
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
