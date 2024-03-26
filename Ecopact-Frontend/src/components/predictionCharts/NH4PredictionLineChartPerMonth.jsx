import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import {useSelector} from 'react-redux'

const NH4PredictionLineChartPerMonth = () => {
  
  const {NH4PredictionDataPerMonth}=useSelector(state => state.prediction);
  const data={
    labels: NH4PredictionDataPerMonth.map(data => new Date(data.date).toISOString().split('T')[0]),
    datasets: [
      {
        label: "NH4 Prediction Rates",
        data: NH4PredictionDataPerMonth.map((data) => data?.data.dataRate),
        borderColor: 'rgb(75, 192, 192)',
        
      },
    ],
  }
  
  return (
    <div className="h-[300px] flex justify-center items-center">
       <Line data={data} />
    </div>
  )
}

export default NH4PredictionLineChartPerMonth
