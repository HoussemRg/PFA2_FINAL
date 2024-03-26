import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import {useSelector} from 'react-redux'

const NO3PredictionLineChartPerMonth = () => {
    const {NO3PredictionDataPerMonth}=useSelector(state => state.prediction);
    const data={
      labels: NO3PredictionDataPerMonth.map(data => new Date(data.date).toISOString().split('T')[0]),
      datasets: [
        {
          label: "NO3 Prediction Rates",
          data: NO3PredictionDataPerMonth.map((data) => data?.data.dataRate),
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

export default NO3PredictionLineChartPerMonth
