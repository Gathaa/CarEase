import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import jwtDecode from 'jwt-decode'
const AddCar = ({ navigation }) => {
  const [Brand, SetBrand] = useState("");
  const [Type, SetType] = useState("");
  const [Kilo, Setkilo] = useState("");
  const [Age, Setage] = useState(0);
  const [Insurance, Setinsurance] = useState("");
  const [Empty, Setempty] = useState("");
  const [Visit, Setvisit] = useState("");  
  const addcar = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token)
      const response = await Axios.post(
        `http://192.168.103.3:3000/addcar`,
        {   
          Brand: Brand,
          Type: Type,
          Kilo: Kilo,
          Age: Age,
          Insurance: Insurance,
          Empty: Empty,
          Visit: Visit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.includes("All Attributes Were Inserted Into The Table Car")) {
        navigation.navigate("tab");
      }
      if (response.data.includes("Error Occured While Adding !")) {
        alert(`Something Went Wrong !!`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Your Car</Text>
      <TextInput
        placeholder='Brand'
        placeholderTextColor='#94A3B8'
        style={styles.inputStyle}
        value={Brand}
        onChangeText={SetBrand} />
      <TextInput
        placeholder='Type'
        placeholderTextColor='#94A3B8'
        style={styles.inputStyle}
        value={Type}
        onChangeText={SetType} />
      <TextInput
        placeholder='Kilometreage'
        placeholderTextColor='#94A3B8'
        style={styles.inputStyle}
        value={Kilo}
        onChangeText={Setkilo} />
      <TextInput
        placeholder='Car Age'
        placeholderTextColor='#94A3B8'
        style={styles.inputStyle}
        value={Age}
        onChangeText={Setage} />
      <TextInput
        placeholder='Insurance Date'
        placeholderTextColor='#94A3B8'
        style={styles.inputStyle}
        value={Insurance}
        onChangeText={Setinsurance} />
      <TextInput
        placeholder='Car Emptying Date'
        placeholderTextColor='#94A3B8'
        style={styles.inputStyle}
        value={Empty}
        onChangeText={Setempty} />
      <TextInput
        placeholder='Technical Visit'
        placeholderTextColor='#94A3B8'
        style={styles.inputStyle}
        value={Visit}
        onChangeText={Setvisit}

      />
      <TouchableOpacity style={styles.button} onPress={addcar}>
        <Text style={{ textAlign: 'center', color: 'white', paddingTop: 10 }}>Add Car</Text>
      </TouchableOpacity>
      <View style={styles.skipSection}>
        <Text style={{ textAlign: 'center', color: 'white' }}>Already Have a Car ?</Text>
        <TouchableOpacity style={styles.skipButton} onPress={()=>{navigation.navigate("tab")}}>
          <Text style={{ textAlign: 'center', color: 'white', paddingTop: 5 }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1E293B',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    margin: 70,
    marginBottom: 10,
    fontSize: 30
  },
  formLabels: {
    color: 'white',
    // margin:10,
    marginLeft: 30
  },
  inputStyle: {
    // backgroundColor:'white',
    margin: 30,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#94A3B8',
    color: 'white',
    padding: 10,
    paddingLeft: 0
  },
  button: {
    backgroundColor: '#334155',
    height: 40,
    margin: 30,
    marginTop: 50
  },
  skipSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 30,
    marginTop: 0,

  },
  skipButton: {
    backgroundColor: '#7389F4',
    height: 30,
    width: 70,
    borderRadius: 5


  }

})
export default AddCar;