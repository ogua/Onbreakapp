import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency } from "../features/userinfoSlice";
import { StyleSheet } from "react-native";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

function Incomeexpenslist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const currency = useSelector(selectcurrency);
    const router = useRouter();
    
    const downloadFromUrl = async (file,filename) => {
        const result = await FileSystem.downloadAsync(file,
          FileSystem.documentDirectory + filename
        );
        console.log(result);
    
        save(result.uri, filename, result.headers["Content-Type"]);
    };

    const save = async (uri, filename, mimetype) => {
        if (Platform.OS === "android") {
          const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (permissions.granted) {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
            await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
              .then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
              })
              .catch(e => console.log(e));
          } else {
            shareAsync(uri);
          }
        } else {
          shareAsync(uri);
        }
      };


    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <List.Item
            title={()=> (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Ionicons name="cash" size={20} style={{marginRight: 10}} />
                    <Text style={{flex: 1, fontSize: 18}}>{item?.title.toUpperCase()} ({item?.in_ex_type})</Text>
                     <Text style={{fontSize: 10}}>{item?.trdate}</Text>
                     {/* <Ionicons name="ellipsis-vertical-sharp" size={20} /> */}
                </View>
            )}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                <Text style={{fontSize: 13, marginLeft: 30}}>{item?.acctitle} ({item?.ref})</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                       <Text style={{fontSize: 12,color: '#abc',marginLeft: 30}}>{item?.vendor_name}</Text>
                       <Text style={{fontSize: 12,color: '#abc',marginLeft: 30}}>Paid {currency}{item?.amount}</Text>
                       <Text style={{fontSize: 12,color: '#abc',marginLeft: 30}}>{item?.paymethod}</Text>
                    </View>
                </View>
                </>
            )}
            descriptionNumberOfLines={5}
        />
            
        </TouchableOpacity>

        {visible && (
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item disabled={item?.file == "" ? true: false} style={{marginLeft: 10}} leadingIcon="download-circle" title="Downlaod Attachment" onPress={() => Linking.openURL(item?.file)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/Accounts/create-edit-income-expense?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.title)} />
            </View>
        )}
        </>
    )
}

export default Incomeexpenslist;

const styles = StyleSheet.create({
    ribbon: {
        position: "absolute",
        bottom: -15,
        right: -70,
        zIndex: 1,
        paddingTop: 10,
        overflow: "hidden",
        width: 120,
        height: 80,
        textAlign: "right",
    },
    ribbontext: {
        transform: [{ rotate: "295deg" }],
        color: '#9BC90D',
        fontSize: 20
    }
});