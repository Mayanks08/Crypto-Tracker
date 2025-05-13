// CurrencyPicker.js
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useCurrency } from '../currencycontext.js';

const CurrencyPicker = () => {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const [currencyData, setCurrencyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true"
        );
        setCurrencyData(Object.keys(data.market_data.market_cap));
      } catch (error) {
        console.error("Failed to fetch currencies", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrencyData();
  }, [selectedCurrency]);

  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedCurrency}
        onValueChange={(value) => setSelectedCurrency(value)}
        style={styles.picker}
      >
        {currencyData.map((currency) => (
          <Picker.Item
            key={currency}
            label={currency.toUpperCase()}
            value={currency}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: '29%',
    height: 45, 
    backgroundColor: 'rgb(220, 222, 222)',
    marginTop:10,
    marginRight:10,
    borderRadius: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    fontWeight: 'bold',
    
  },
});

export default CurrencyPicker;
