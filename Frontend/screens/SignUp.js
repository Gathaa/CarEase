import { Image, Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { Component } from 'react'
import { RadioButton } from 'react-native-paper';
import Button from "../components/Button";
import Axios from 'axios'
import LogIn from './LogIn';
import { useState } from 'react';
const serverport = process.env.serverport;
const CustomButton = ({ title, onPress, buttonStyle, textStyle, disabled }, { navigation }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.customButton,
                buttonStyle,
                { backgroundColor: disabled ? "#cccccc" : "#334155" }
            ]}
            disabled={disabled}
        >
            <Text style={[styles.customButtonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}
const SignUp = ({ navigation }) => {
    const [name, Setusername] = useState("")
    const [email, Setemail] = useState("");
    const [phonenumber, SetphoneNumber] = useState("");
    const [password, Setpassword] = useState("");

    const [mecorcar, Setmecorcar] = useState("");
    const [user, Setuser] = useState(false)
    const [userlist, Setuserlist] = useState([])
    const isDisabled =
        name.trim() === "" || (email.trim() === "" || !email.includes("@")) || (phonenumber.trim() === "" || phonenumber.toString().length < 8) || password.trim() === "";
    const adduser = async () => {
        try {
            const response = await Axios.post(`http:/IpAddress:ServerPort/register`, {
                name: name,
                email: email,
                phonenumber: phonenumber,
                password: password,
                mecorcar: mecorcar,
            });
            console.log(response.data);
            if (response.data.includes('Email already exists, please choose another one')) {
                alert('Email already exists, please choose another one');
            }
            if (response.data.includes('All the attributes were inserted')) {
                alert(`Your Data Has Been Stored Successfully In Our Database Welcome ${name}`)
                Setuser(true)
                console.log(user)
                navigation.navigate('LogIn');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <KeyboardAvoidingView behavior='padding' style={{ backgroundColor: '#94A3B8', flex: 1, alignItems: 'center', textAlign: 'center' }}>
            <View>
                <Text style={styles.mainword}>Sign Up</Text>
                <Text style={styles.labelname}>Username :</Text>
                <TextInput
                    style={styles.inputname}
                    value={name}
                    onChangeText={Setusername}
                    autoCapitalize='sentences'
                    keyboardType='default'
                    required={true}
                />
                <View
                    style={[
                        styles.boxcheckname,
                        { backgroundColor: name === "" ? "red" : "green" }
                    ]}
                >
                </View>
                <Text style={styles.labelemail}>Email :</Text>
                <TextInput
                    style={styles.inputemail}
                    value={email}
                    onChangeText={Setemail}
                    autoCapitalize='sentences'
                    keyboardType='email-address'
                    required={true}
                />
                <View style={[
                    styles.boxcheckemail,
                    { backgroundColor: (email === "" || !email.includes("@")) ? "red" : "green" }
                ]}>
                </View>
                <Text style={styles.labelphone}>Phone Number :</Text>
                <TextInput
                    style={styles.inputphone}
                    keyboardType='phone-pad'
                    value={phonenumber}
                    onChangeText={SetphoneNumber}
                    required={true}


                />
                <View

                    style={[
                        styles.boxcheckphone,
                        { backgroundColor: (phonenumber === "" || phonenumber.toString().length != 8) ? "red" : "green" }
                    ]}>

                </View>
                <Text style={styles.labelpass}>Password : </Text>
                <TextInput
                    style={styles.inputpass}
                    value={password}
                    onChangeText={Setpassword}
                    secureTextEntry={true}
                    keyboardType='sentences'
                    required={true}
                />
                <View

                    style={[
                        styles.boxcheckpassword,
                        { backgroundColor: password === "" ? "red" : "green" }
                    ]}>

                </View>

               
                <Text style={styles.labelmec}>Sign Up As a</Text>
                <RadioButton.Group onValueChange={newValue => Setmecorcar(newValue)} value={mecorcar}>
                    <View style={styles.radioContainer}>
                        <Text style={styles.label}>Mechanical</Text>
                        <RadioButton.Android value="Mechanical" color="white" uncheckedColor="#ccc" />
                    </View>
                    <View style={styles.radioContainer}>
                        <Text style={styles.label}>Car Owner</Text>
                        <RadioButton.Android value="Car Owner" color="white" uncheckedColor="#ccc" />
                    </View>
                </RadioButton.Group>
                <CustomButton
                    title="SignUp"
                    onPress={adduser}
                    buttonStyle={{ marginTop:20, borderRadius: 10 }}
                    textStyle={{ fontSize: 20 }}
                    disabled={isDisabled}
                />
                <TouchableOpacity
                    style={{ marginTop: 30, paddingBottom: 10, alignItems: 'center' }} onPress={

                        () => navigation.navigate("LogIn")} title="Already Have An Account ?">
                    <Text
                        style={{ color: 'white', textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 15, }}> Already Have An Account ?
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("LogIn");
                    }} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    boxcheckpassword: {
        backgroundColor: 'red',
        width: 15,
        height: 15,
        paddingtop: 56,
        marginLeft: 270,
        borderRadius: 50,
    },
    boxcheckemail: {
        backgroundColor: 'red',
        width: 15,
        height: 15,
        paddingtop: 56,
        marginLeft: 270,
        borderRadius: 50,
    },
    boxcheckphone: {
        backgroundColor: 'red',
        width: 15,
        height: 15,
        paddingtop: 56,
        marginLeft: 270,
        borderRadius: 50,
    },
    boxcheckname: {
        backgroundColor: 'red',
        width: 15,
        height: 15,
        paddingtop: 56,
        marginLeft: 270,
        borderRadius: 50,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    radioButtonLabel: {
        marginLeft: 10
    },
    mainword: {
        position: 'absolute',
        width: 160,
        height: 50,
        marginTop: 65,
        marginLeft: 70,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: 35,
        lineHeight: 40,
        color: '#FFFFFF',
    },
    logc: {
        position: 'absolute',
        width: 500,
        height: 20,
        left: 89,
        top: 790,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        //fontWeight:400,
        fontSize: 15,
        lineHeight: 18,
    },
    continue: {
        position: 'absolute',
        width: 230,
        height: 16,
        left: 140,
        top: 700,
        lineHeight: 16,
        fontSize: 16,
        //fontWeight: 400,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
    },
    customButton: {
        backgroundColor: '#334155',
        width: 270,
        height: 40,
    },
    customButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    inputmec: {
        position: 'absolute',
        width: 270,
        height: 130,
        paddingTop: 110,
        marginTop: 450,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    labelmec: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        width: 250,
        marginTop: 60,
        height: 25,
        fontSize: 12,
        color: '#FFFFFF',
    },
    labelpass: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        width: 200,
        height: 20,
        fontSize: 12,
        marginTop: 59,
        color: '#FFFFFF',
    },
    inputpass: {
        position: 'absolute',
        width: 270,
        height: 100,
        paddingTop: 78,
        marginTop: 420,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
    inputphone: {
        position: 'absolute',
        width: 270,
        height: 80,
        marginTop: 350,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
    labelphone: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        width: 110,
        height: 20,
        marginTop: 68,
        fontSize: 12,
        color: '#FFFFFF',
    },
    inputemail: {
        position: 'absolute',
        width: 270,
        height: 65,
        marginRight: 160,
        marginTop: 250,
        marginBottom: 50,
        paddingTop: 37,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
    labelemail: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        marginRight: 160,
        marginTop: 68,
        width: 100,
        height: 20,
        fontSize: 12,
        color: '#FFFFFF',
    },
    labelname: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        marginRight: 160,
        marginTop: 170,
        width: 100,
        height: 20,
        fontSize: 12,
        color: '#FFFFFF',
    },
    inputname: {
        position: 'absolute',
        marginRight: 160,
        marginTop: 200,
        width: 270,
        height: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
});
export default SignUp;