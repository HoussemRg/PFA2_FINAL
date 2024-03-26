import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import {useSelector} from 'react-redux'

const RecentNH4Data = () => {
    const {NH4RecentData}=useSelector(state => state.data);
    const data={
      labels: NH4RecentData?.map(data => new Date(data.date).toISOString().split('T')[0]),
      datasets: [
        {
          label: "NH4 Rates",
          data: NH4RecentData?.map((data) => data?.data.dataRate),
          borderColor: 'rgb(59, 130, 246)',
          
        },
      ],
    }
    
    return (
      <div className="h-[300px] flex justify-center items-center">
         <Line data={data} />
      </div>
    )
}

export default RecentNH4Data
