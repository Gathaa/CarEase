import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function Group7381(props) {
  return (
    <View style={styles.Group7381}>
      <View style={styles.Group324}>
        <Image
          style={styles.Vector}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/s09o1y6oszb-1006%3A672?alt=media&token=2057b072-a37d-4993-adb1-98cadfc9724c",
          }}
        />
        <Text style={styles.OilChange}>Oil change</Text>
   
            <Text style={styles.Aygo}>12/12/2020</Text>
       
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
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
    margin:9
  },
  Group324: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent:"space-between",
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
})
