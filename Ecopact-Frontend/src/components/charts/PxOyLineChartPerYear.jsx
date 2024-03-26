import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {useSelector} from 'react-redux'

const PxOyLineChartPerYear = (props) => {
  const {PxOyDataPerYear}=useSelector(state => state.data);
  const months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
     const calculateAvg=(userData)=>{
      let array=[];
      let subarray=[]; 
      for (let i = 0; i < 12; i++) {
        subarray = userData.filter(data => {
            const date = new Date(data.date);
            return date.getMonth() === i && date.getFullYear() === props.year;
        });
        if (subarray.length > 0) {
            array.push({ month: months[i], subarray: subarray });
        }
      }
      
      let moyArr=[];
      for(let i=0;i<array.length;i++){
        let moy=0;
        for(let j=0;j<array[i].subarray.length;j++){
          moy=moy+array[i].subarray[j].data.dataRate
        }
        moyArr.push({month:array[i].month,moyenne:moy/array[i].subarray.length});
      }
      return moyArr
     }
     
     const colorArray = [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)',
      'rgb(255, 0, 0)',
      'rgb(0, 255, 0)',
      'rgb(0, 0, 255)',
      'rgb(255, 255, 0)',
      'rgb(255, 0, 255)',
      'rgb(0, 255, 255)'
    ];
     const data=calculateAvg(PxOyDataPerYear);
    
     const finalData={
      labels: data.map(item => item.month),
        datasets: [
          {
            label: "NH4 Average Rates",
            data:data.map(item => item.moyenne),
            backgroundColor:colorArray,
            
          },
        ],
     }
      const options={
        plugins: {
          title: {
            display: true,
            text: "PxOy Average Rates in 2024"
          },
          legend: {
            display:false
          }
        }
      }
      return (
        <div className="h-[300px] flex justify-center items-center">
           <Bar data={finalData} options={options} />
        </div>
      )
}

export default PxOyLineChartPerYear
