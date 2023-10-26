import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Dialog, Divider, List, Menu, Portal, Snackbar, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
import StarRating from 'react-native-star-rating-widget';


function Reviewlist ({item,deletedata}) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();    

    return (
        <>
        <TouchableOpacity style={{backgroundColor: '#fff', padding: 10}}
        onPress={() => setVisible(! visible)}
        >
        <Card>
            <Card.Title title={`${item?.user_name}`} 
            left={() => (

            <Avatar.Image 
                 source={{uri: item.user_logo}}
                size={30}
            />
            
            )} />
            <Card.Content>
                <Text>{item?.note}</Text>
                <Divider style={{marginVertical: 10}}/>
                <StarRating
                        rating={item?.rate}
                        starSize={15}
                    />
            </Card.Content>

            
        </Card>
            
        </TouchableOpacity>
        </>
    )
}

export default Reviewlist;