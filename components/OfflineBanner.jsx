import {Text,View,StyleSheet} from 'react-native';

const OfflineBanner = () => {
  return (
   <View>
    <Text style={styles.offlineText}>You are currently offline</Text>
   </View>
  )
}

export default OfflineBanner;
const styles= StyleSheet.create({
    offlineText:{
        height:40,
        marginTop:65,
        backgroundColor:"rgb(30, 127, 159)",
        borderRadius:40,
        fontSize: 20,
        color: 'white',
        textAlign: 'center', 
    }
})
