import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CarComponent from '../components/CarComponent'
import { useEffect } from 'react'
import Axios from 'axios';
import jwtDecode from 'jwt-decode'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function carlist({ navigation }) {
  useEffect(() => {
    getcarname();
    getname();
  }, []);

  const [car, carData] = useState([])
  const getcarname = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token)
      const response = await Axios.get(
        `http://192.168.1.3:3000/getcardata`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.includes("Error Occured While Adding !")) {
        alert(`Something Went Wrong !!`);
      }
      else {
        console.log(response.data)
        carData(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  };



  const [name, Setname] = useState("")
  const getname = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token)
      const response = await Axios.get(
        `http://192.168.1.3:3000/getownername`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.includes("Error Occured While Adding !")) {
        alert(`Something Went Wrong !!`);
      }
      else {
        Setname(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#1E293B", flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 60, paddingLeft: 30, alignItems: 'center' }}>
        <View style={styles.HeadTitle}>
          <Text style={styles.HeadText}>{name}'s Car</Text>
        </View>

        {console.log(car)}
        {/* <CarComponent navigation={navigation} car= {car} /> */}
        <View style={styles.container}>
          <View style={styles.Group7366}>
            <View style={styles.Group395}>
              <Image
                style={styles.Image121}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/t4oe6q8rlr8-1146%3A76?alt=media&token=436dbe1d-bc57-4393-9790-3ad020e76c74",
                }}
              />
              

                  {car.map((item, index) => (
                    <View key={index} style={styles.Group7366}>
                     
                        <View style={styles.Group7410}>
                          <Text style={styles.Aygo}>{item.Brand}</Text>
                          <View style={styles.Group034}></View>
                        </View>
                      
                      <View style={styles.Rectangle2520} />
                    </View>
                  ))}
       
            </View>
            <View style={styles.Rectangle2520} />
          </View>
          <View  >
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
              <Text style={styles.Text}>View More details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  HeadTitle: {
    backgroundColor: '#000113',
    height: 100,
    width: 500,
    bottom: 4
  },
  HeadText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 30,
    fontSize: 30
  },
  container: {
    position: "relative",
    width: 343,
    height: 221,
    boxSizing: "border-box",
    flex: 1,
    paddingLeft: 20,
    marginVertical: 40,
  },
  Group7366: {
    position: "relative",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  },
  Group395: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: 163.39,
    paddingLeft: 12,
    paddingRight: 26,
    paddingTop: 7,
    paddingBottom: 9.39,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    boxSizing: "border-box",
    backgroundColor: "rgba(245,246,248,1)",
  },
  Image121: {
    alignItems: "center",
    width: 280.54,
    height: 97.17,
  },
  Group7410: {
    top: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    boxSizing: "border-box",
  },
  Group034: {
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
  },
  Aygo: {
    color: "rgba(22,22,26,1)",
    // fontSize: "14px",
    // lineHeight: "14px",
    // fontFamily: "Inter, sans-serif",
    fontWeight: "500",
    // letterSpacing: "0.28px",
  },
  Rectangle2520: {
    position: "absolute",
    top: 162.53,
    width: "100%",
    height: 58.47,
    backgroundColor: "rgba(166,174,190,1)",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  Viewdetailsbutton: {
    position: "absolute",
    top: 174.56,
    left: 12.65,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: 196,
    height: 34.4,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    boxSizing: "border-box",
    backgroundColor: "rgba(51,65,85,1)",
  },
  ViewDetails: {
    position: "absolute",
    left: 50,
    top: 1,
    color: "rgba(255,255,255,1)",

  },
  button: {
    position: "absolute",
    left: 12.65,
    alignItems: "center",
    width: 196,
    height: 37.4,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    boxSizing: "border-box",
    backgroundColor: "rgba(51,65,85,1)",
    bottom: 10,
  },
  Text: {
    color: "white",
  }
})