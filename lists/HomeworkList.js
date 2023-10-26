import { useEffect, useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Button, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectcurrency, selecttoken } from "../features/userinfoSlice";
import { StyleSheet } from "react-native";
import axios from "axios";
import { schoolzapi } from "../components/constants";

function HomeworkList ({item,deletedata,role}) {

    const [visible, setVisible] = useState(false);
    const currency = useSelector(selectcurrency);
    const router = useRouter();
    const [Loading, setLoading] = useState(false);
    const [submitted, setsubmitted] = useState(null);
    const token = useSelector(selecttoken);


    useEffect(()=>{

        if(role == "Student"){
            loaddata();
        }

    },[]);

    const loaddata = () => {
        setLoading(true);
        axios.get(schoolzapi+'/check-submitted-assignment/'+item?.id,
        {
            headers: {Accept: 'application/json',
            Authorization: "Bearer "+token
        }
        })
        .then(function (results) {
  
            setsubmitted(results.data.data);
            console.log("results",results.data.data);
            setLoading(false);
            
        }).catch(function(error){
            setLoading(false);
            console.log(error);
        });
    }



    return (
        <View style={{marginBottom: 20}}>
        {Loading ? <ActivityIndicator size="small" /> : (

        <TouchableOpacity style={{backgroundColor: item?.status == `Elapse` ? `red` : `#fff`, padding: 10}}
        onPress={() => setVisible(! visible)}
        >

        <List.Item
            title={()=> (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Ionicons color={item?.status == `Elapse` ? `#fff` : ``} name="book-outline" size={20} style={{marginRight: 10}} />
                    <Text style={{flex: 1, fontSize: 18,color: item?.status == `Elapse` ? `#fff` : `#000`,}}>{item?.title}</Text>
                     <Text style={{fontSize: 10,color: item?.status == `Elapse` ? `#fff` : `#000`,}}>{item?.studentclass}</Text>
                     {/* <Ionicons name="ellipsis-vertical-sharp" size={20} /> */}
                </View>
            )}
            titleEllipsizeMode="middle"
            description={()=>(
                <>
                <Text style={{fontSize: 10, marginLeft: 30,color: item?.status == `Elapse` ? `#fff` : `#000`,}}>{item?.term}</Text>
                <Text style={{fontSize: 10, marginLeft: 30,color: item?.status == `Elapse` ? `#fff` : `#000`,}}>Submission Date: {item?.subdate} - {item?.time}</Text>
                <Text style={{fontSize: 13, marginLeft: 30,color: item?.status == `Elapse` ? `#fff` : `#000`,}}>{item?.description}</Text>
                <View style={styles.ribbon}>
                <Text style={styles.ribbontext}>{item?.status}</Text>
                </View>
                
                </>
            )}
            descriptionNumberOfLines={5}
            //left={props => <Ionicons name="help-circle" {...props} size={20} />}
            //right={props => <Ionicons name="ellipsis-vertical-sharp" {...props} size={20} />}
        />
            
        </TouchableOpacity>
        )}

        {role !== "Student" ? (
            <>
        <View style={{flexDirection: 'row', backgroundColor: item?.status == `Elapse` ? `red` : `#fff`, justifyContent: 'flex-end'}}>
            <Button  textColor={item?.status == `Elapse` ? `` : ``} onPress={()=> router.push(`/admin/homework/view-assignment-submitted?stclass=${item?.stclass}&assigmtid=${item?.id}`)} style={{marginRight: 10}}>Assignments Received</Button>
            <Button  onPress={()=> router.push(`/admin/homework/enter-assignment-score?stclass=${item?.stclass}&assigmtid=${item?.id}`)}>Enter Score</Button>
        </View>

        {visible && (
            <>
            <Divider bold={true} />
            <View style={{backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                <Menu.Item disabled={item?.file == "" ? true: false} style={{marginLeft: 10}} leadingIcon="download-circle" title="Downlaod Attachment" onPress={() => Linking.openURL(`${item?.file}`)} />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="square-edit-outline" onPress={()=> router.push(`/admin/homework/create-edit-homework?id=${item?.id}`)} title="Edit" />
                <Menu.Item style={{marginLeft: 10}} leadingIcon="delete-forever-outline" title="Delete" onPress={()=> deletedata(item?.id,item?.title)} />
            </View>
            </>
        )}
            
            </>
        ) : (
            <>
            {item?.status !== 'Elapse' ? (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' }}>
              
                <>
                <Button disabled={item?.file == "" ? true: false} icon="download" onPress={() => Linking.openURL(item?.file)}>Download</Button>
                {submitted == undefined ? (
                    <Button onPress={()=> router.push(`/admin/homework/submit-assignment?id=${item?.id}`)}>Submit Assignments</Button>
                ) : (
                    <Button icon="check">Submitted</Button>
                )}
                </>               
            </View>
            ): (
                <View style={{marginBottom: 10}}></View>
            )}

            {submitted !== undefined && (
                <>
                {submitted?.score && (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderBottomColor: '#000', borderBottomWidth: 1 }}>
                      <Button>Score: {submitted?.score}</Button>
                   </View>
                )}
                </>
            
            )}
            </>
            
        )}

        
        </View>
    )
}

export default HomeworkList;

const styles = StyleSheet.create({
    ribbon: {
        position: "absolute",
        bottom: -35,
        right: -30,
        zIndex: 5,
        overflow: "hidden",
        width: 90,
        height: 70,
        textAlign: "right",
    },
    ribbontext: {
        transform: [{ rotate: "295deg" }],
        color: '#9BC90D',
        fontSize: 20
    }
});