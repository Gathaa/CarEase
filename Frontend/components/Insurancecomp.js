import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function Insurance1(props) {
  return (
    <View style={styles.Insurance1}>
      <View style={styles.Group041}>
        <Image
          style={styles.Vector}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/1vojjr2yowr-1161%3A73?alt=media&token=e77a7493-8034-4fed-a281-98b1f146d538",
          }}
        />
        <Text style={styles.Insurance}>Insurance</Text>
       
            <Text style={styles.Aygo}>06/11/2023</Text>
        
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    margin:9,
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
})
