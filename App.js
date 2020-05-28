import { Notifications } from 'expo';
import Constants from 'expo-constants';
import { askAsync, getAsync, NOTIFICATIONS } from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  Vibration,
  View
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function App() {
  const [expoPushToken, setExpoPushToken] = useState();
  const [notification, setNotification] = useState();

  async function registerForPushNotificationsAsync() {
    if (Constants.isDevice) {
      const { status: existingStatus } = await getAsync(NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await askAsync(NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      setExpoPushToken(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250]
      });
    }
  }

  function handleNotification(notification) {
    Vibration.vibrate();
    console.log(notification);
    setNotification(notification);
  }

  async function sendPushNotification() {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'New message from Sinan',
      body: "Hey there! What's up?",
      data: { data: 'goes here' },
      _displayInForeground: true
    };
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addListener(handleNotification);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginBottom: 8 }}>Hello world!</Text>
      {notification && <Text>Data: {JSON.stringify(notification.data)}</Text>}
      <Text style={{ fontSize: 16, opacity: 0.5 }}>
        This is my first React Native app
      </Text>
      <TouchableHighlight style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            console.log('this is great!');
            alert('You tapped the button!');
          }}
        >
          Press on me
        </Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button}>
        <Text style={styles.buttonText} onPress={sendPushNotification}>
          Receive a notification
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export default App;

/*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS

    curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
      "ids": ["YOUR RECEIPTID STRING HERE"]
      }'
*/
