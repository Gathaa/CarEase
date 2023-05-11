import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopCreation from "../screens/ShopCreation";
import Map from '../components/Map';
import LogIn from '../screens/LogIn'
import ViewInfo from '../screens/ViewInfo';
import Dashboard from "../screens/Dashboard.js";
import Schedule from '../screens/Schedule';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignUp from '../screens/SignUp';
import SearchMechanicsProfile from '../screens/SearchMechanicsProfile';
import OTPScreen1 from "../screens/OtpScreen1";
import { StyleSheet } from 'react-native';
import CustomTabBarButton from "../components/CustomTabBarButton";
import MarkerGenerator from "../components/MarkerGenerator";
import SearchShop from "../screens/Search";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import AddCar from "../screens/AddCar";
import { Marker } from "react-native-maps";
import CarDetails from "../screens/CarDetails";
import CarComponent from "../components/CarComponent";

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'My Cars') {
            iconName = focused
              ? 'car-sport'
              : 'car-sport-outline';
          } else if (route.name === 'Schedule') {
            iconName = focused ? 'calendar' : 'calendar';
          }
          else if (route.name === 'View Shop') {
            iconName = focused ? 'basket-outline' : 'basket-sharp';
          }
          else if (route.name === 'YourProfile') {
            iconName = focused ? 'profile' : 'profile'; // No functional 
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },

      })}

      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='My Cars' component={Dashboard} />
      <Tab.Screen name='Schedule' component={Schedule} />
      {/* <Tab.Screen name='ShopList' component={Dashboard} />   */}
      <Tab.Screen name='View Shop' component={MarkerGenerator} />
    </Tab.Navigator>

  );
}

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Sign' component={SignUp} />
      <Stack.Screen name='Marker' component={MarkerGenerator} />
      <Stack.Screen name="Shop" component={ShopCreation} />
      <Stack.Screen name='LogIn' component={LogIn} />
      <Stack.Screen name="AddCars" component={AddCar} />
      <Stack.Screen name='tab' component={Tabs}/> 
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="ViewInfo" component={ViewInfo} />
      <Stack.Screen name='Details' component={CarDetails} />
      <Stack.Screen name='OtpScreen' component={OTPScreen1} />
      <Stack.Screen name='CarComponent' component={CarComponent} />
    </Stack.Navigator>
  );
};

export default RootNavigator;


const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    bottom: 5,
    right: 15,
    left: 15,
    height: 88,
  },
});