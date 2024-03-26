import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import {useSelector} from 'react-redux'


const PxOyLineChartPerMonth = () => {
  const {PxOyDataPerMonth}=useSelector(state => state.data);
  const data={
    labels: PxOyDataPerMonth.map(data => new Date(data.date).toISOString().split('T')[0]),
    datasets: [
      {
        label: "PxOy Monthly Rates",
        data: PxOyDataPerMonth.map((data) => data?.data.dataRate),
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

export default PxOyLineChartPerMonth
