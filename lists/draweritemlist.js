import { useRouter } from 'expo-router';
import React, { Component, useState } from 'react'
import { Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Ionicons from '@expo/vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


function Customdrawerlist({item,props}){
   console.log(props);

    const [ispressed, setIspressed] = useState(false);
    const [focus, setFocus] = useState();
    const [subfocus, setsubFocus] = useState();
    const router = useRouter();

    const setfocustate  = (key) => {

        if(focus > 0){
          setFocus(key);
        }else{
          setFocus(0);
        }
      }

    return (
      <>
       <DrawerItem 
            focused={focus == item.key ? true: false}
                            icon={({color, size}) => (
                                <Icon 
                                  name={item.icon}
                                    color={color}
                                    size={size}
                                    />
                                )}
                              label={({color, focused}) => (
                                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <Text {...focused}>{item.name}</Text>
                                      {item.children.length > 0 && (
                                        <>
                                        {focus == item.key ? (
                                            <Ionicons name='arrow-down-circle' size={25} color={color} />
                                        ): (
                                          <Ionicons name='arrow-up-circle' size={25} color={color} />
                                        )}
                                        </>
                                      )}
                                  </View>
                              )}   
                            onPress={() => {

                              if(item.children.length > 0){
                                setfocustate(item.key);
                              }else{
                                setfocustate(item.key);
                                props.navigation.navigate(item.route);

                              }

                            }}
                        />

                        {item.children.map(children => (

                        <DrawerItem 
                        focused={focus == item.key &&  subfocus == children.key ? true: false}
                        icon={({color, size}) => (
                            <Icon 
                            name={children.icon}
                                color={color}
                                size={size}
                                />
                            )}
                            label={({color, focused}) => (
                            <Text>{children.name}</Text>
                        )}  
                        onPress={() => {
                            setsubFocus(children.key);
                            props.navigation.navigate(children.route);
                        }}
                        />

                        ))}
      </>
    )
}
export default Customdrawerlist;
