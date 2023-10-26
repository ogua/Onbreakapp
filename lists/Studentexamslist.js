import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Linking, ToastAndroid, TouchableOpacity, View, StyleSheet } from "react-native";
import {RadioButton, Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text, TextInput } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency, selecttoken } from "../features/userinfoSlice";
import RadioGroup from 'react-native-radio-buttons-group';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import axios from "axios";
import { schoolzapi } from "../components/constants";
import { TimePickerModal } from 'react-native-paper-dates';
import { showMessage } from "react-native-flash-message";


function Studentexamslist ({item,answerinoput,retry,index}) {
    
    return (
        <View style={{marginBottom: 30, backgroundColor: retry ? (item.response == 'Correct' ? '#17a2b8' : 'red') : '#ccc', padding: 10}} key={item?.id}>
            
        <Text style={{fontSize: 18, marginBottom: 15, color: retry ? '#fff' : '#000'}}>{index+1}:: {item.question}</Text>
          <RadioButton.Group onValueChange={newValue => answerinoput(index,newValue)} value={item?.useranser}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: 20, color: retry ? '#fff' : '#000'}}>A</Text>
              <RadioButton value="a" />
              <Text style={{color: retry ? '#fff' : '#000'}}>{item.optiona}</Text>
              
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: 20,color: retry ? '#fff' : '#000'}}>B</Text>
              <RadioButton value="b" />
              <Text style={{color: retry ? '#fff' : '#000'}}>{item.optionb}</Text>
              
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: 20,color: retry ? '#fff' : '#000'}}>C</Text>
              <RadioButton value="c" />
              <Text style={{color: retry ? '#fff' : '#000'}}>{item.optionc}</Text>
              
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: 20,color: retry ? '#fff' : '#000'}}>D</Text>
              <RadioButton value="d" />
              <Text style={{color: retry ? '#fff' : '#000'}}>{item.optiond}</Text>
              
          </View>

          </RadioButton.Group>

         {retry && (
          <>
          <Text style={{marginTop: 20, color: '#fff'}}>Answer:: {item.answer.toUpperCase()}</Text>
          </>
          
         )}   
    </View>
    )
}

export default Studentexamslist;

const styles = StyleSheet.create({
    Forminput: {
        marginBottom: 20
    }
});