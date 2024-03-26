import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import {useSelector} from 'react-redux'

const NH4LineChartPerMonth = () => {
  
  const {NH4DataPerMonth}=useSelector(state => state.data);
  const data={
    labels: NH4DataPerMonth.map(data => new Date(data.date).toISOString().split('T')[0]),
    datasets: [
      {
        label: "NH4 Rates",
        data: NH4DataPerMonth.map((data) => data?.data.dataRate),
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

export default NH4LineChartPerMonth
