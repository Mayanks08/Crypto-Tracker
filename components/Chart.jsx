import { Dimensions } from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import dayjs from 'dayjs';


const Chart = ({data,currency}) => {
  
  if (!data || !Array.isArray(data)) {
    return null;
  }

  const skipPoints=(num)=>{
    let arr=[];
    for (let i=0;i<data.length;i++){
      if(i%num===0){
        continue
    }
    arr.push(i)
  }
  return arr;
  }

  return (
  <LineChart
    data={{
      labels: data.map((el)=> dayjs(el[0]).format("ddd hA")),
      datasets: [
        {
          data: data.map((el)=>el[1])
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={420}
    verticalLabelRotation={30}
    yAxisLabel={currency.toUpperCase()}
    // yAxisSuffix="k"
    hidePointsAtIndex={skipPoints(30)}
    yAxisInterval={25} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "rgb(154, 103, 58)",
      backgroundGradientFrom: "rgb(45, 43, 41)",
      backgroundGradientTo: "rgb(49, 44, 37)",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "rgb(255, 56, 38)"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 26,
     
     
    }}
  />
)
}

export default Chart