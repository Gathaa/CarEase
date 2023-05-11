import { NavigationContainer } from "@react-navigation/native";
import { Component } from "react";
import RootNavigator from "./navigators/RootNavigator";
import Map from "./components/Map"
// import SearchMechanicsProfile from './Component/SearchMechanicsProfile'
export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
      
    </NavigationContainer>
  );
}