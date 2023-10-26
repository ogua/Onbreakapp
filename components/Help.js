import React, { Component } from 'react'
import { Stack, useRouter } from 'expo-router';
import { FlatList,Image, Platform, RefreshControl, SafeAreaView,
   ScrollView, StyleSheet, Text, TouchableOpacity, 
   View, DeviceEventEmitter, Alert, Linking, Share } from 'react-native'
import { useEffect } from 'react';
import { Card, Dialog, List, Menu, Portal,Button, Provider, Searchbar, FAB, Divider, ActivityIndicator } from 'react-native-paper';
import { useState } from 'react';
import * as StoreReview from 'expo-store-review';
import * as Sharing from 'expo-sharing';

function Help () {

    const SURELY_URL = 'https://oguaschoolz.com';
    const APP_STORE_URL = "https://play.google.com/store/apps/details?id=com.oguaschoolz.app&showAllReviews=true";

    const [isloading,setisloading] = useState(false);
    
    async function  shareapp () {
        try {
            const result = await Share.share({
              message:'Ogua Schoolz is also one of the leading ERP solutions for educational institutions across the world. It is a fully customizable solution with major features such as SMS, Admissions Management, Results Management, Online Exam etc. This application can also be integrated with various extensions including Students Management System, Finance and Accounting Package, Human Resources module, and other Utilities. Ogua Schoolz CRM has adopted and customized by over 1,300 schools scattered all over the world. check it out https://oguaschoolz.com, download our mobile app https://play.google.com/store/apps/details?id=com.oguaschoolz.app',
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
            
       
    }

    async function handleReview() {
        setisloading(true);
        if (await StoreReview.hasAction()) {
          StoreReview.requestReview();
          setisloading(false);
        } else {
          setisloading(false); 
          Linking.openURL(APP_STORE_URL);
        }
     }

    return (
      <Provider>
      <SafeAreaView style={{flexGrow: 1}}>
        <Stack.Screen options={{
            headerTitle: 'Help'
        }}
        />
        <ScrollView>
            <Card>
                <Card.Content>

                    <Text>Need Help ?</Text>
                    <Text style={{marginTop: 10}}>You can reach OguaSchoolz out on the following details</Text>
                    <Button icon="phone" style={{marginTop: 10}}  onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=+233545819229&text=Hello%20OguaSchoolz%20Please%20i%20need%20your%20help`)}>whatsapp +233545819229</Button>
                     <Divider bold={true} style={{marginVertical: 10}} />
                    <Button icon="email" onPress={() => Linking.openURL(`mailto:ogusesitsolutions@gmail.com`)}>ogusesitsolutions@gmail.com</Button>
                
                    <Divider bold={true} style={{marginVertical: 20}} />
                    <Button onPress={shareapp}>Share with Friends</Button>

                    {isloading ? <ActivityIndicator size="large" /> : (
                    <Button onPress={handleReview} style={{marginTop: 20}}>Rate or Review the App</Button>
                    )}

                    <Divider bold={true} style={{marginVertical: 10}} />
                    
                    <Button onPress={() => Linking.openURL('https://web.facebook.com/ogusesitsolutions')}>Follow Oguaschoolz</Button>
                    
                    
                </Card.Content>
            </Card> 

        </ScrollView>
      </SafeAreaView>
      </Provider>
    )
}

export default Help;

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
