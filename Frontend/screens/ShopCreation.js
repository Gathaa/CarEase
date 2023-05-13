import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React , {useState,useEffect} from 'react'
import Axios from 'axios'

export default function ShopCreation({ navigation , route }) {
   
    const [longitude,setLongitude] = useState(0)
    const [latitude,setLatitude] = useState(0)
    const [store_name,setName] = useState('')
    const [categories,setCategories] = useState('')
    const [description,setDescription] = useState('')

    useEffect(()=>{
        // console.log(route.params)
        if(route.params !== undefined ){
            setLatitude(route.params.propLatitude)
            setLongitude(route.params.propLongitude)
            console.log(longitude,latitude)
        }
        else{
            console.log(longitude,latitude)
        }
    },[route.params])

    const addShopInfo = async ()=>{
        const shopData ={
            store_name : store_name,
            latitude:latitude,
            longitude : longitude,
            categories:categories,
            description : description
        }
            try{
                const result = await Axios.post("http:/192.168.103.3:3000/location",shopData)
                console.log('data added successfully', result.data);
                if (result.data.includes("Great Success")){
                    navigation.navigate("ViewInfo")
                }
                else{
                    alert("Error Occured")
                }
            }catch (err){
                console.log(err)
            }
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.textdecoration, styles.mainText]}>Adding A Store</Text>

            <View style={[styles.form1]}>
                <View style={{ marginTop: 30 }}>
                    <Text style={[styles.textdecoration, styles.labels]}>Give It A Specific Name :</Text>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={setName}
                    />
                </View>

                <View style={{ marginTop: 30 }}>

                    <Text style={[styles.textdecoration, styles.labels]}>Speciality of the store :</Text>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={setCategories
                        }
                    />
                    <Text style={[styles.textdecoration, styles.labels]}>Description :</Text>
                    <TextInput
                        style={[styles.inputs, styles.desc]}
                        onChangeText={setDescription
                        }
                    />
                </View>

                <Pressable style={{ marginTop: 30}}
                    onPress={() => {
                        navigation.navigate("Map")
                    }}>
                    <Text style={[styles.textdecoration, styles.locationButton, styles.addloc]}
                    >Add Location</Text>
                </Pressable>

            </View>

            <View style={styles.form2}>

                <Pressable style={styles.addbutton} >
                    <Text style={[styles.textdecoration, styles.addbuttonText]} onPress={addShopInfo}>Add Shop!</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addloc: {
        textDecorationLine: 'underline',
    },
    container: {
        flex: 1,
        backgroundColor: '#1E293B'
    },
    mainText: {
        textAlign: 'center',
        margin: 20,
        fontSize: 22
    },
    desc:{
        height:100
    },
    form1: {
        flex: 0.7,
        // backgroundColor:'blue'
    },
    form2: {
        flex: 0.3
    },
    textdecoration: {
        color: 'white',
    },
    labels: {
        paddingLeft: 20,
        left: 20,
    },
    inputs: {
        width: 330,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 6,
        paddingLeft: 5,
        left: 25,
    },
    addbutton: {
        width: 320,
        backgroundColor: '#7389F4',
        margin: 20,
        height: 58.55,
        borderRadius: 12,
        left:20,

    },
    addbuttonText: {
        textAlign: 'center',
        paddingTop: 19

    },
    locationButton: {
        textAlign: 'center'
    }
})