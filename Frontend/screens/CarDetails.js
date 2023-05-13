import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import OilChange from '../components/oilchangeComp';
import Insurance from '../components/Insurancecomp';
import Kilometrage from '../components/Kilometrage';
import CarAge from '../components/CarAge';
import Technicalvisit from '../components/TechnicalVisit';
export default function viewInfo() {
  useEffect(() => {
    getcarname()
  }, [])
  const [car, carData] = useState([])
  const getcarname = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token)
      const response = await Axios.get(
        `http://192.168.103.3:3000/getcardata`,
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
        carData(response.data)
        console.log(car)
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#1E293B" }}>
      <ScrollView>
      {car.map((data, index) => {
      return (
        <View>
        <Text style={styles.type}>{data.Brand}</Text>
        <Text style={styles.brand}>{data.Type}</Text>
        </View>
      )}
      )}
        <Image style={styles.Car} source={require("../assets/image121.png")} />
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 60,
            paddingLeft: -5,
            justifyContent: "space-between",
            marginTop: 350,
          }}
        >
          <Text style={styles.specification}>Specification :</Text>
          {car.map((data, index) => {
      return (
        <View key={index} style={{ flexDirection: "row" }}>
          <View style={styles.Group7381}>
            <View style={styles.Group324}>
              <Image
                style={styles.Vector}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/s09o1y6oszb-1006%3A672?alt=media&token=2057b072-a37d-4993-adb1-98cadfc9724c",
                }}
              />
              <Text style={styles.OilChange}>Oil change</Text>
              <Text style={styles.Every10000Miles}>{data.Emptying}</Text>
            </View>
          </View>
          <View style={styles.Insurance1}>
            <View style={styles.Group041}>
              <Image
                style={styles.Vector}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/1vojjr2yowr-1161%3A73?alt=media&token=e77a7493-8034-4fed-a281-98b1f146d538",
                }}
              />
              <Text style={styles.Insurance}>Insurance</Text>
              <Text style={styles._20230804}>{data.Insurance}</Text>
            </View>
          </View>
          <View style={styles.Kilometreage1}>
            <View style={styles.Group454}>
              <Image
                style={styles.Vector}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/x4atqtncd1-1161%3A81?alt=media&token=ee397e36-599b-456b-a787-39161a9b8108",
                }}
              />
              <Text style={styles.Kilometreage}>Kilometre-age</Text>
              <Text style={styles._450000}>{data.Kilo}</Text>
            </View>
          </View>
        </View>
      );
    })}
    {car.map((data, index) => {
      return (
          <View style={{ flexDirection: "row" }}>
            <View style={styles.Carage}>
              <View style={styles.Group360}>
                <Image
                  style={styles.Vector}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/zfl7sa20b9n-1162%3A120?alt=media&token=0ec79570-8599-4ba6-bd83-b59c37e9706e",
                  }}
                />
                <Text style={styles.CarAge}>Car Age</Text>
                <Text style={styles._20200505}>{data.Age}</Text>
              </View>
            </View>
            <View style={styles.Technicalvisit}>
              <View style={styles.Group575}>
                <Image
                  style={styles.Vector}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/apggzjx4em-1162%3A117?alt=media&token=f6963146-0e89-45b7-8492-2e59be1f271d",
                  }}
                />
                <Text style={styles.TechnicalVisit}>Technical Visit</Text>
                <Text style={styles._20230417}>{data.Visit}</Text>
              </View>
            </View>
            
          </View>
        )})}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  specification: {
    top: 0,
    left: "2.71%",
    right: "66.91%",
    color: "rgba(255,255,255,1)",
    fontWeight: "600",
    fontSize: 30, 
  },
  Car: {
    top: "19%",
    height: 140,
    fontSize: 30,
  },
  type: {
    top: 50,
    left: "2.71%",
    right: "66.91%",
    color: "rgba(255,255,255,1)",
    fontWeight: "600",
    fontSize: 30,
  },
  brand: {
    top: 70,
    left: "2.71%",
    right: "66.91%",
    color: "red",
    fontWeight: "600",
    fontSize: 30,
  },
  Carage: {
    width: 109,
    height: 100,
    paddingLeft: 4,
    paddingRight: 36,
    paddingTop: 11,
    paddingBottom: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    boxSizing: "border-box",
    margin: 9,
  },
  Group360: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    justifyContent: "space-between",
  },
  Vector: {
    width: 18,
    height: 20,
  },
  CarAge: {
    color: "rgba(141,152,168,1)",
    fontWeight: "700",
    textDecoration: "underline",
  },
  _20200505: {
    color: "rgba(112,112,204,1)",
    fontWeight: "500",
    textDecoration: "underline",
  },
  Group7381: {
    width: 109,
    height: 110,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 17,
    paddingBottom: 12,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    boxSizing: "border-box",
    margin: 9,
  },
  Group324: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  Vector: {
    width: 25,
    height: 15,
  },
  OilChange: {
    color: "rgba(141,152,168,1)",

    fontWeight: "700",

    textDecoration: "underline",
  },
  Every10000Miles: {
    color: "rgba(112,112,204,1)",

    fontWeight: "500",

    textDecoration: "underline",
  },
  Kilometreage1: {
    width: 109,
    height: 100,
    paddingLeft: 10,
    paddingRight: 21,
    paddingTop: 18,
    paddingBottom: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    boxSizing: "border-box",
    margin: 9,
  },
  Group454: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    justifyContent: "space-between",
  },
  Vector: {
    width: 19.98,
    height: 16,
  },
  Kilometreage: {
    color: "rgba(141,152,168,1)",
    fontWeight: "500",
    textDecoration: "underline",
  },
  _450000: {
    color: "rgba(112,112,204,1)",
    fontWeight: "500",
    textDecoration: "underline",
  },
  Insurance1: {
    width: 109,
    height: 110,
    paddingLeft: 7,
    paddingRight: 36,
    paddingTop: 9,
    paddingBottom: 21,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    boxSizing: "border-box",
    margin: 9,
  },
  Group041: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },
  Vector: {
    width: 18,
    height: 22,
  },
  Insurance: {
    color: "rgba(141,152,168,1)",
    fontWeight: "700",
    textDecoration: "underline",
  },
  _20230804: {
    color: "rgba(112,112,204,1)",
    fontWeight: "500",
    textDecoration: "underline",
  },
  Technicalvisit: {
    width: 120,
    height: 115,
    paddingLeft: 10,
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    boxSizing: "border-box",
    margin: 9,
  },
  Group575: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    justifyContent: "space-between",
  },
  Vector: {
    width: 20,
    height: 22,
  },
  TechnicalVisit: {
    color: "rgba(141,152,168,1)",
    fontWeight: "700",
    textDecoration: "underline",
  },
  _20230417: {
    color: "rgba(112,112,204,1)",
    fontWeight: "500",
    textDecoration: "underline",
  },
});