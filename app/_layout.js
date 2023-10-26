import { Slot, Stack } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import {store,persistor} from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { selectuser } from '../features/userinfoSlice';
import * as Linking from "expo-linking";
import { useEffect } from 'react';

const Root = () => {

    // return (
    //   <Provider store={store}>
    //      <Slot />
    //      <FlashMessage position="top"/>
    //   </Provider>
    // );

    
    function handleDeepLink(event) {
      let data = Linking.parse(event.url);
      console.log(data);
    }
  
    useEffect(() => {
      Linking.addEventListener("url", handleDeepLink);
      return () => {
        Linking.removeEventListener("url");
      };
    }, []);

    return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Slot />
          </PersistGate>
          <FlashMessage position="top"/>
      </Provider>
  );
}

export default Root;