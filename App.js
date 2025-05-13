import { Alert, StyleSheet,  } from 'react-native';
import { HomeScreen } from './components/HomeScreen';
import CoinDetails from './components/CoinDetails';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CurrencyProvider } from './currencycontext.js';
import NetInfo from "@react-native-community/netinfo"
import { useEffect, useState } from 'react';
import OfflineBanner from './components/OfflineBanner.jsx';
import * as Notifications from 'expo-notifications';
import bugsnag from "./bugsang.js";
const Bugsnag = bugsnag();
// Bugsnag.notify(new Error('Test error'))
const stack = createStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  })
})
export default function App() {

  const [isConnected, setIsConnected] = useState(true);
  const [notification,setNotification]= useState(null);

  useEffect(() =>{
    registerForPushNotificationsAsync();

    NetInfo.addEventListener((state) => {
      if (state.isConnected !==isConnected) {
        setIsConnected(state.isConnected)
      } 
    });

    Notifications.addNotificationReceivedListener(notification =>setNotification(notification))

    schedulePushNotifications()
  },[])

 
   async function schedulePushNotifications(){
   await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Crypto Alert',
        body: 'Crypto price has changed',
        data:{id : "bitcoin"}, 
      },
      trigger: {
        seconds: 4,
      }
    }); 
   }

  async function registerForPushNotificationsAsync(){
    let token;
    const {status :existingStatus} = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if(existingStatus !== 'granted'){
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if(finalStatus !== 'granted'){
      Alert.alert('User Denied Permission');
      return;
    }
    const {data}= await Notifications.getExpoPushTokenAsync({
      projectId:"79cf3bea-eab4-4485-a807-6c4f4d096502"
    });
    token = data;
    // Alert.alert(token);
    console.log(token)
    //Some code to store token in the database and response with user id
  }

  return (
    <CurrencyProvider>
      {!isConnected && <OfflineBanner/>}
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen 
        name="Home" 
        component={HomeScreen}
        isConnected={isConnected} 
        />
        <stack.Screen
         name="Coin Details" 
        component={CoinDetails}
        isConnected={isConnected}
         />
      </stack.Navigator>
    </NavigationContainer>
    </CurrencyProvider>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(125, 89, 89, 0.89)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
