import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import {useSelector} from 'react-redux'


const PxOyPredictionLineChartPerMonth = () => {
  const {PxOyPredictionDataPerMonth}=useSelector(state => state.prediction);
  const data={
    labels: PxOyPredictionDataPerMonth.map(data => new Date(data.date).toISOString().split('T')[0]),
    datasets: [
      {
        label: "PxOy Prediction Monthly Rates",
        data: PxOyPredictionDataPerMonth.map((data) => data?.data.dataRate),
        borderColor: 'rgb(239, 68, 68)',
        
      },
    ],
  }
  
  return (
    <div className="h-[300px] flex justify-center items-center">
       <Line data={data} />
    </div>
  )
  
}

export default PxOyPredictionLineChartPerMonth
