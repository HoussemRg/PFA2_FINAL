import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import {useSelector} from 'react-redux'


const ArrangmentPieChart = () => {
  
  const {Arrangements}=useSelector(state=> state.data)
    const data = {
        labels: ['NH4', 'PxOy', 'NO3'],
        datasets: [
          {
            label: 'Arrangements',
            data: [Arrangements[0],Arrangements[1],Arrangements[2]],
            backgroundColor: [
            'rgb(59, 130, 246)',
            'rgb(239, 68, 68)',
            'rgb(75, 192, 192)',
            ],
            hoverOffset: 4,
          },
        ],
      };
    
      return (
        <div className=' h-52 w-72 flex-col flex  items-center my-10 mx-auto'>
          <h2 className=' font-semibold text-gray-600'>Number Of Arrangements</h2>
          {(Arrangements[0]!==0 && Arrangements[1]!==0 || Arrangements[0]!==0 && Arrangements[2]!==0 || Arrangements[1]!==0 && Arrangements[2]!==0) ? <Pie data={data} /> : <h1 className='text-xl font-semibold mt-8 text-gray-600'>No Data Found, Please Enter Some Data</h1>}
        </div>
      );
}

export default ArrangmentPieChart
