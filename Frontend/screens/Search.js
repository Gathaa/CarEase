
import SearchInput from '../components/SearchInput'


import { MaterialIcons } from '@expo/vector-icons';
// import Garage from '../assets/garage.jpeg'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Button, Text, Pressable, Image,Dimensions } from 'react-native';
import * as Location from 'expo-location';

export default function Search() {
    const [region, setRegion] = useState()
    useEffect(() => {
        userLocation()
    }, [])
    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErroMsg('permission denied')
            return
        }
        let location = await Location.getCurrentPositionAsync()
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })

    }
    const coord = [
        { coordinates: { latitude: 36.794829, longitude: 10.073459 }, title: 'Hama Shop' , link:'ViewInfo'},
        { coordinates: { latitude: 36.818610, longitude: 10.165960 }, title: 'Stoufa Shop', link:'ViewInfo' },
        { coordinates: { latitude: 36.851711, longitude: 10.199877 }, title: '3jeli Tn' , link:'ViewInfo'},
        { coordinates: { latitude: 36.855452, longitude: 10.238358 }, title: 'Mercedez Benz', link:'ViewInfo' },
        { coordinates: { latitude: 36.802279, longitude: 10.232275 }, title: 'salim shop', link:'ViewInfo' }
    ];

    const handleSearchChange = (text) => {
    
        // Do something with the search value, like filtering a list
    };
    const handleMenuPress = () => {
        // Do something when the menu button is pressed, like opening a drawer
    };

    return (
        <View style={styles.search}>
            <SearchInput
                style={styles.input}
               
                onChangeText={handleSearchChange}
                onMenuPress={handleMenuPress}
            />
            <MapView style={styles.map} region={region}>
                {coord.map((item, index) => (
                    <Marker
                        key={index}
                        coordinate={item.coordinates}
                        title={item.title}
                    >
                        <Callout onPress={() => navigation.navigate(item.link)}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{item.title}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.garage}>
                {/* <Image
                    style={styles.img}
                    source={Garage}>
                </Image> */}
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: "center",
                    padding: 10,

                }}>
                    <Text style={{
                        color: "white",
                        fontSize: 15,
                    }}>
                        Top Auto Repair
                    </Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: "center",
                    }} >
                        <AntDesign name="star" size={14} color="gold" />
                        <Text style={{
                            color: "white",
                        }}> 4.5</Text>
                    </View>
                    <View style={{
                        padding: 5,
                        borderColor: "white",
                        borderWidth: 1,
                        borderRadius: 50,
                    }}>
                        <Feather name="bookmark" size={16} color="white" />
                    </View>

                </View >
                <View style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                }}>


                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: "center",
                            fontSize: 10
                        }}>
                        <EvilIcons name="location" size={24} color="purple" />
                        <Text style={{ color: "grey" }}>Muralla,Intramurors,Manila,Philippines</Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <Text style={{
                            color: "grey",
                            fontSize: 15,
                        }}>
                            Top Auto Repair
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: "center",
                        }}>

                            <AntDesign name="car" size={16} color="grey" />
                            <Text style={{
                                color: "grey",
                                fontSize: 15,
                            }} >42min</Text>

                        </View>
                    </View>


                    <Text style={{
                        color: "grey",
                        fontSize: 15,
                    }}>Open From 8.00 to 18.00</Text>
                </View>
                <View style={{
                    justifyContent:'space-between',
                    display:'flex',
                    flexDirection:'row',
                    padding:10,
                }}>
                   

                </View>

            </View>


        </View>
    )
}
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    search: {
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        height: height,
        backgroundColor: '#161A32',
        shadowColor: '#171717',
        padding: 30,
    },
    input: {

    },
    garage: {
        height: '30%',
        backgroundColor: '#222745',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: 10,
        borderRadius: 10,
        overflow: "hidden",

    },
    map: {
        width: '100%',
        height: '60%',

        // display:'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    locator: {
        marginRight: 10,
        marginTop: 20,
        backgroundColor: '#222745',
        padding: 10,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: 10,
        position: 'absolute',
        bottom: 20,
        right: 10



    },
    img: {
        resizeMode: 'cover',
        width: '100%',
        height: '35%'
    },
    button1: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#8978DC',
        borderRadius: 10,
        width: '35%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
   

    },
    button2: {
        alignItems: 'center',
        padding: 10,
       borderRadius: 10,
       borderColor:'grey',
       borderWidth:1,
     width: '25%',
     display:'flex',
     flexDirection:'row',
     justifyContent:'center',
     alignItems:'center',


    }


})
