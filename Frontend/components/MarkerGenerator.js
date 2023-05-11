import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Button, Text, Pressable, Image } from 'react-native';
import * as Location from 'expo-location';
import ShopCreation from '../screens/ShopCreation';
import { TextInput } from 'react-native-paper';

export default function MarkerGenerator({ navigation }) {
  const [region, setRegion] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    userLocation();
  }, []);
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErroMsg('permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync();
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const coord = [
    {
      coordinates: { latitude: 36.794829, longitude: 10.073459 },
      title: 'Hama Shop',
      link: 'ViewInfo',
    },
    {
      coordinates: { latitude: 36.81861, longitude: 10.16596 },
      title: 'Stoufa Shop',
      link: 'ViewInfo',
    },
    {
      coordinates: { latitude: 36.851711, longitude: 10.199877 },
      title: '3jeli Tn',
      link: 'ViewInfo',
    },
    {
      coordinates: { latitude: 36.855452, longitude: 10.238358 },
      title: 'Mercedez Benz',
      link: 'ViewInfo',
    },
    {
      coordinates: { latitude: 36.802279, longitude: 10.232275 },
      title: 'salim shop',
      link: 'ViewInfo',
    },
  ];

  const handleSearch = () => {
    const match = coord.find((marker) =>
      marker.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (match) {
      setRegion({
        latitude: match.coordinates.latitude,
        longitude: match.coordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          label="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
          style={styles.input}
        />
        <Pressable style={{backgroundColor:'#1E293B',width:110, borderRadius:5,color:'white'}} title="Search" onPress={handleSearch}>
                <Text style={{color:'white', textAlign:'center',paddingTop:15}}>Search</Text>
        </Pressable>
        
      </View>
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
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width:260
    },  
    searchBox:{
        position:'absolute',
        flexDirection:'row',
        // justifyContent:'space-between',
        backgroundColor:'#fff',
        width:'90%',
        marginTop:20,
        alignSelf:'center',
        borderRadius:5,
        elevation:10,
        zIndex: 1,
        top: 20,
    },
    searchInput: {
        flex: 1,
        padding: 10,
    },
    map: {  
        width: '100%',
        height: '100%',
    },
    calloutContainer: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calloutText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
