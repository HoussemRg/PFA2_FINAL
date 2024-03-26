import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import {useSelector} from 'react-redux'

const RecentNO3Data = () => {
    const  {NO3RecentData}=useSelector(state => state.data);
    const data={
      labels: NO3RecentData?.map(data => new Date(data.date).toISOString().split('T')[0]),
      datasets: [
        {
          label: "NO3 Rates",
          data: NO3RecentData?.map((data) => data?.data.dataRate),
          borderColor: 'rgb(5, 150, 105)',
          
        },
      ],
    }
    
    return (
      <div className="h-[300px] flex justify-center items-center">
         <Line data={data} />
      </div>
    )
}

export default RecentNO3Data
