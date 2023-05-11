import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const Notification = () => {
  const [notificationScheduled, setNotificationScheduled] = useState(false);

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          console.log('Failed to get push token for push notification!');
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Push token:', token);
      } else {
        console.log('Must use physical device for Push Notifications');
      }
    }
    registerForPushNotificationsAsync();
    const scheduleNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Car Maintainance',
          body: 'Hello,Your Next Check Data Is On 12/05/2023',
        },
        trigger: {
          seconds: 10,
        },
      });
      setNotificationScheduled(true);
    };
    scheduleNotification();
  }, []);

  return (
    <View style={styles.container}>
      {notificationScheduled ? (
        <Text>Notification scheduled!</Text>
      ) : (
        <Button title="Schedule notification" onPress={() => {}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Notification;