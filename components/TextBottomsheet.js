import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
// import ImagePicker, { openPicker } from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useRef } from 'react';

export default function TextBottomsheet() {

  const [image, setImage] = useState(null);

  const pickImage = async () => {

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  };

  const takePhotoFromCamera = () => {

  
  }



  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
      <TouchableOpacity  onPress={pickImage}>
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );

  const sheetRef = useRef(null);
  fall = new Animated.Value(1);

  return (
    <>
      <View
        style={{
          backgroundColor: 'papayawhip',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
        renderHeader={()=>(<View><Text>Bottom Sheet</Text></View>)}
        enabledBottomInitialAnimation={true}
      />
    </>
  );
}
