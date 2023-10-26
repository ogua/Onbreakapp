import axios from 'axios';
import { Redirect, Stack, useRouter, useSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, DeviceEventEmitter, Dimensions, KeyboardAvoidingView, Linking, PermissionsAndroid, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Avatar, Button, Card, Divider, Modal, TextInput, PaperProvider, Portal  } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import { schoolzapi, images } from '../../components/constants';
import { FlatList,Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from "react-native-maps-directions";
import { selectdesaddress, selectdestination, selectorgaddress, seleteorigin, setDestination, setOrgaddress, setOrigin } from '../../features/examSlice';
import * as Location from 'expo-location';
import { selecttoken } from '../../features/userinfoSlice';

function Markers() {

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <>

            <Marker
              ref={markerRef}
              coordinate={{latitude: parseFloat(item.lat),longitude: parseFloat(item.lng)}}
              title={`${item.name}`}
              description={item.loc}
              identifier='origin'
            >
              <Image source={{ uri: item.logo }}
                  resizeMode="contain"
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  />

            </Marker>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
        
        </>
    )
}

export default Markers;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});