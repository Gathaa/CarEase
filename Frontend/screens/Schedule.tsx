

import * as React from "react";
import { Text, View, StyleSheet, Image, ScrollView, StatusBar, TouchableOpacity, Alert } from "react-native";
import Button from "../components/Button";
import { Calendar, CalendarList, Agenda, DateData } from 'react-native-calendars';
import Axios from 'axios'
import { useState,useEffect } from "react";
import { Pressable } from "react-native";
import {Card, Avatar, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Item ={
  Event: string
}


const Schedule = ({ navigation }) => {
  
  const today = new Date().toISOString().slice(0, 10);
  const[EventTxt, setEventTxt] =useState("")
  const [selectedDay, setSelectedDay] = useState(today);
  const[selectTimer, setselectTimer] = useState('');
  const[status, setStatus] = useState(true);
  const [items, setItems] = useState<{[key: string]: Item[]}>({'2023-04-26': [{Event: 'test1'}]})
  const [Scheduleinfo,Setschedule] = useState([])
  
  useEffect(()=>{
    
    handleDayPress
    getScheduleInfo()
  },

    [EventTxt])

    const getScheduleInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(token)
        const response = await Axios.get(
          `http://192.168.103.3:3000/getscheduele`,
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
          Setschedule(response.data)
          console.log(Scheduleinfo)
        }
      } catch (error) {
        console.error(error);
      }
    };
  
  const addScheduleInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token)
      const response = await Axios.post(
        `http://192.168.103.3:3000/Schedule`,
        {   
        EventTxt:EventTxt,
        selectedDay:selectedDay,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.includes("Great Success")) {
        alert("Schedueled!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  
  
  const renderItem = (item :Item ) => {
    return (
      
            <View style={styles.itemContainer}>
              <Text>{item.Event}</Text>
              <Text>press</Text>
            </View>
          
    );
  };

  const timeToString =(time: number) =>{
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
   
  }
  
  const renderEmptyDate = (item :Item, day:DateData) => {
    return (
      <View style={styles.emptyDate}>
        
        <TextInput style={styles.TextInput}placeholder="Add an event or reminder"
        placeholderTextColor="white"
        
        onChangeText={setEventTxt}
        >
          {Scheduleinfo.map((data, index) => {
      return (
        <View>
        <Text>{data.EventTxt}</Text>
        <Text>{data.selectedDay}</Text>
        </View>
      )}
      )}
        </TextInput>
        <Pressable style={{padding: 12}}onPress={addScheduleInfo}>
          <Text>Submit</Text>
        </Pressable>
     
      </View>
      
    );
    
  }
  const HandleEvent =() =>{
    
    setItems({[selectedDay]: [ {Event: EventTxt} ]})
    
  }
  const theme = {
    calendarBackground: '#94A3B8',
    textSectionTitleColor: '#b6c1cd',
    dayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    monthTextColor: '#2d4150',
    selectedDayBackgroundColor: '#00adf5',
    
    arrowColor: '#ffffff',
    'stylesheet.calendar.header': {
      week: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    },
    'stylesheet.calendar.main': {
      container: {
        borderWidth: 1, // border width
        borderHeight: 1,
        borderColor: '#cccccc', // border color
        backgroundColor: '#94A3B8'
      }
    },
    //'stylesheet.calendar.weekday': {
      //text: {
       // color: '#ffffff' // change text color of week days
      //}
    //}
  };
  return (
    <View style={{flex: 1}}>
    <Agenda 
    theme={theme}
    onDayPress={handleDayPress}
    selected={selectedDay}
    items={items}
    renderItem={renderItem}
    renderEmptyData={renderEmptyDate} 
    
    
    
    />
    
  </View>
  
  );
  
};



const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  TextInput:{
      left: 20,
      width: '90%',
      height: '2%',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 4,
      resizeMode: 'vertical',
      backgroundColor: 'white',
  },
  Text1:{
    left:20,
    fontSize: 18,
    color:'black',
  }
  

});

export default Schedule;