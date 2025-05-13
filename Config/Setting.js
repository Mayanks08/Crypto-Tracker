import {Constants} from expo-constants

const setting ={
    dev:{
        apiurl:'https://api.coingecko.com/api/v3/coins/markets'
    },
    staging:{
         apiurl:'https://staging.api.coingecko.com/api/v3/coins/markets'
    },
    prod:{
         apiurl:'https://prop.api.coingecko.com/api/v3/coins/markets'
    }
}

const getCurrentSettings= ()=>{
    if(_DEV_){
        return setting.dev
    }

    if(Constants.manifest.releaseChannel === "staging"){
        return setting.staging

    }
    return setting.prod
}

export default getCurrentSettings()