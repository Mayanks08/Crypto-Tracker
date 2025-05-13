import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'

import axios from 'axios';
import { useCurrency } from '../currencycontext.js';
import CurrencyPicker from './CurrencyPicker.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bugsnag from '@bugsnag/expo';


export const HomeScreen = ({navigation,isConnected}) => {

    const [searchInput,setSearchInput]=useState("");
    // const [selectedCurrency, setSelectedCurrency]= useState("usd");
    const [coinsData, setCoinData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   
    const [currencyData,setCurrencyData] = useState([]);
    const { selectedCurrency } = useCurrency();
    
    useEffect(()=>{
        console.log('isConnected:', isConnected); 
        if (isConnected ){
            AsyncStorage.getItem("currencyData").then((data)=>
                setCurrencyData(data ? JSON.parse(data) : []))
             .catch((ex) => Bugsnag.notify(ex));
        }else{
        axios.get("https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true")
        .then(async({data})=> {
            const currencyData= Object.keys(data.market_data.market_cap)
            setCurrencyData(currencyData)
            await AsyncStorage.setItem(
                'currencyData',
                JSON.stringify(currencyData));
              }) 
              .catch((ex) =>Bugsnag.notify(ex)) 
         }
    },[]);

      

 useEffect(() => {
    if (isConnected ) {
        AsyncStorage.getItem("coins").then((data) =>
            setCoinData(data ? JSON.parse(data) : []))
                
    }else {
            setIsLoading(true);
            axios
              .get("https://api.coingecko.com/api/v3/coins/markets", {
                params: {
                  vs_currency: selectedCurrency.toLowerCase(),
                },
              })
              .then(async({data}) => {
                setCoinData(data);
                await AsyncStorage.setItem('coins', JSON.stringify(data));
              })
              .catch( (ex) =>Bugsnag.notify(ex))
              .finally(() => 
                setIsLoading(false)
              );
          };
               
}, [selectedCurrency]);


    const filteredData = coinsData.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    // const filteredData = (coinsData || []).filter((item) =>
    //     item.name.toLowerCase().includes(searchInput.toLowerCase())
    //   );

    const handlePress=(item) =>{
        navigation.navigate('Coin Details',{
            id:item.id,
            currency:selectedCurrency,
        })
    }

    const renderItem =({item})=>(
        <TouchableOpacity style={styles.coinRow} onPress={()=>handlePress(item)} >
            <View style={styles.coinImageContainer}>
                <Image source={{ uri: item.image }} 
                    style={styles.image} />
            </View>
         <Text style={styles.coinName}>{item.name}</Text>
            <Text style={styles.coinPrice}ext>{item.current_price}</Text>
        </TouchableOpacity>
    )
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
    <TextInput placeholder='Search For Coin...'
     style={styles.searchInput} 
     value={searchInput} 
     onChangeText={(text) =>(setSearchInput(text))}
     />
       <CurrencyPicker
            selectedCurrency={selectedCurrency} 
            />
    
     </View>
     {   isLoading ? (
        <ActivityIndicator/>
    ) : (
        <FlatList data={ filteredData }  renderItem={renderItem}
        keyExtractor={(item) => item.id} />
        )}
    
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
       flex: 1, 
     
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center"
    },
    coinRow:{
        flexDirection: 'row',
        justifyContent:"space-between",
        padding: 10,
        alignItems: "center"
    },
    coinName:{
        fontSize: 18,
        // color: 'white',
        width:"30%",
        marginTop: 15,
        
    },
    coinPrice:{
        // color:"white",
        fontSize: 18,
        width:"25%"

    },
    coinImageContainer:{
        width: "20%",
        height: "30%",
    },
    image: {
        width: 50,  // Set specific dimensions for the image
        height: 50,
        resizeMode: 'contain'
    },
    introText: {
        fontSize: 20,
       
       
    },
    searchInput:{
        height: 50,
        fontSize: 18,
        // color: 'white',
        borderWidth:2,
        borderColor: 'lightgrey',
        padding:10,
        marginTop:10,
        width: "60%",
        borderRadius:10,
    },
    Picker:{
        width: "50%",
        height:" 75%",
        // color:"white",
        marginTop:10,
        backgroundColor:"grey",
       
       
    }

})
