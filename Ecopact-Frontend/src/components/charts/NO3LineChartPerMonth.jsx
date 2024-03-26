import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import {useSelector} from 'react-redux'

const NO3LineChartPerMonth = () => {
    const {NO3DataPerMonth}=useSelector(state => state.data);
    const data={
      labels: NO3DataPerMonth.map(data => new Date(data.date).toISOString().split('T')[0]),
      datasets: [
        {
          label: "NO3 Rates",
          data: NO3DataPerMonth.map((data) => data?.data.dataRate),
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

export default NO3LineChartPerMonth
