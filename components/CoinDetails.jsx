import { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import axios from 'axios';
import Chart from './Chart';
import CurrencyPicker from './CurrencyPicker';
import { useCurrency } from '../currencycontext';
import Bugsnag from '@bugsnag/expo';

const CoinDetails = ({route}) => {
    const [coinData,setCoinData] = useState(null);
    const [isloading, setLoading] = useState(false);
    const[marketData,setMarketData] = useState(null);
    const[isMarketDataLoading,setIsMarketLoading] = useState(false);
    const { selectedCurrency } = useCurrency();
    const {id, currency} = route.params;

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(({data})=>setCoinData(data))
        .catch((ex) => Bugsnag.notify(ex))
        .finally(() =>setLoading(false))
    },[])
    useEffect(()=>{
        setIsMarketLoading(true)
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${selectedCurrency}&days=1`)

        .then(({data})=>setMarketData(data))
        .catch((ex) => Bugsnag.notify(ex))
        .finally(() => setIsMarketLoading(false))

    },[selectedCurrency,id])

    if (!coinData) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Coin data is not available</Text>
            </SafeAreaView>
        );
    }

    return (
        
        <SafeAreaView style={styles.container}>
            
            {isloading ?( <ActivityIndicator/>) :(  
                coinData && ( 
                <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* Coin Image */}
                <View style={styles.imageContainer}>
                    <Image style={styles.Coinimg} source={{ uri: coinData?.image?.large }} />
                </View>
                <CurrencyPicker
                  selectedCurrency={selectedCurrency} 
                  />
                {/* <Text>{id}</Text>
                <Text>{currency}</Text> */}
                {/* Coin Info  */}
                 <View style={styles.infoCard}>
                    <Text style={styles.InfoText}>🔥 Rank: <Text style={styles.highlight}>{coinData?.market_cap_rank ?? "N/A"}</Text></Text>
                    <Text
                     style={styles.InfoText}>💰 Price:
                      <Text 
                      style={styles.highlight}>
                        {/* {""} {coinData?.market_data?.current_price[currency]}{''}{selectedCurrency.toUpperCase() ?? "N/A"} */}
                        {coinData?.market_data?.current_price?.[selectedCurrency.toLowerCase()] ?? "N/A"}{" "}
                         {selectedCurrency?.toUpperCase() ?? ""}
                      </Text>
                      </Text>
                </View>
                { isMarketDataLoading ?( <ActivityIndicator/> ) : (
                <Chart
                 data={marketData?.prices || {}} 
                    currency={selectedCurrency} />
                )}
                 {/* Coin Name  */}
                <Text style={styles.CoinName}>{coinData?.name ?? "N/A"}</Text>
                {/* Description */}
                <Text style={styles.CoinDescription}>
                    {coinData?.description?.en?.substring(0, 700) ?? "No description available..."}
                </Text>
            </ScrollView>
            </>
             )
              )}
           
              
         </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        padding: 15,
    },
    scrollView: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop:50,
    },
    Coinimg: {
        width: 120,
        height: 120,
        borderRadius: 40, // Rounded Image
        borderWidth: 2,
        borderColor: "#FFD700", // Gold Border
    },
    infoCard: {
        backgroundColor: "rgb(155, 155, 155)",
        padding: 15,
        borderRadius: 10,
        width: "90%",
        elevation: 5, // Shadow for Android
        shadowColor: "#FFD700", // Gold shadow
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        marginBottom: 20,
    },
    InfoText: {
        fontSize: 25,
        color: 'white',
        fontWeight: '600',
        marginBottom: 8,
    },
    highlight: {
        color: '#FFD700', // Gold color for highlights
        fontWeight: 'bold',
    },
    CoinName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFD700", // Gold color
        textAlign: 'center',
        marginVertical: 10,
    },
    CoinDescription: {
        fontSize: 16,
        color: 'rgb(19, 18, 18)', // Light grey for readability
        textAlign: 'justify',
        paddingHorizontal: 15,
        lineHeight: 25,
    },
    errorText: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
        marginTop: 50,
    }
});

export default CoinDetails;
