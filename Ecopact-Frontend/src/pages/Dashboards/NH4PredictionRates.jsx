import NH4PredictionLineChartPerMonth from "../../components/predictionCharts/NH4PredictionLineChartPerMonth";
import NH4PredictionLineChartPerYear from "../../components/predictionCharts/NH4PredictionLineChartPerYear";
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch,useSelector} from 'react-redux' 
import { getPredictionDataPerDate, getPredictionDataPerMonth, getPredictionDataPerYear, getNH4AveragePredictionData } from "../../apiCalls/dataPredictionApiCall";
import { useEffect,useState } from "react";
import { predictionActions } from "../../slices/predictionSlice";

import TopBar from "../../components/TopBar";

const NH4PredictionRates = () => {
  const dispatch=useDispatch();
  const {NH4PredictionDataPerDate,NH4PredictionDataPerMonth,NH4PredictionDataPerYear,recentPredictionNH4Year,NH4PredictionAverageRates}=useSelector(state=>state.prediction)
  const [NH4AverageRatePerMonth,setNH4AverageRatePerMonth]=useState(null)
  const [NH4RatesNumberPerMonth,setNH4RatesNumberPerMonth]=useState(null)
  const [NH4AverageRatePerYear,setNH4AverageRatePerYear]=useState(null)
  const [NH4RatesNumberPerYear,setNH4RatesNumberPerYear]=useState(null)
  
  const specificDateSchema=yup.object().shape({
    date:yup.date().required("Full date is required"),
  });
  const monthSchema=yup.object().shape({
    month:yup.string().required("Month is required"),
  });
  const yearSchema=yup.object().shape({
    year:yup.number().required("Year is required"),
  });
  const {register:registerSpecificDate, handleSubmit:handleSubmitSpecificDate, formState:{errors:errorsSpecificDate}} = useForm({
    resolver: yupResolver(specificDateSchema), 
  });
  const {register:registerMonth, handleSubmit:handleSubmitMonth, formState:{errors:errorsMonth}} = useForm({
    resolver: yupResolver(monthSchema), 
  });
  const {register:registerYear, handleSubmit:handleSubmitYear, formState:{errors:errorsYear}} = useForm({
    resolver: yupResolver(yearSchema), 
  });
  
  const submitSpecificDate=(data)=>{
    const date=new Date(data.date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    dispatch(getPredictionDataPerDate('NH4',year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)));
  }
  const submitMonth=(data)=>{
    const [year,month]=data.month.split("-");
    dispatch(getPredictionDataPerMonth('NH4',month,year))
  }
  const submitYear=(data)=>{
    const year=data.year;
    dispatch(predictionActions.setRecentNH4PredictionYear(year))
    dispatch(getPredictionDataPerYear('NH4',year));
  }
  const calculateNH4AverageRateAndNumberPerMonth=()=>{
    if(NH4PredictionDataPerMonth.length!==0){
      let avg=0;
      for(let i=0;i<NH4PredictionDataPerMonth.length;i++){
        avg+=NH4PredictionDataPerMonth[i].data.dataRate;
      }
      avg=(avg/NH4PredictionDataPerMonth.length).toFixed(2);
      setNH4AverageRatePerMonth(avg);
      setNH4RatesNumberPerMonth(NH4PredictionDataPerMonth.length)
    }
  }
  const calculateNH4AverageRateAndNumberPerYear=()=>{
    if(NH4PredictionDataPerYear.length!==0){
      let avg=0;
      for(let i=0;i<NH4PredictionDataPerYear.length;i++){
        avg+=NH4PredictionDataPerYear[i].data.dataRate;
      }
      avg=(avg/NH4PredictionDataPerYear.length).toFixed(2);
      setNH4AverageRatePerYear(avg);
      setNH4RatesNumberPerYear(NH4PredictionDataPerYear.length)
    }
  }
  useEffect(()=>{
    calculateNH4AverageRateAndNumberPerMonth();
    calculateNH4AverageRateAndNumberPerYear();
    dispatch(getNH4AveragePredictionData());
  },[NH4PredictionDataPerMonth,NH4PredictionDataPerYear,recentPredictionNH4Year])

  return (
    <div className="w-full flex">
    <div className="flex flex-col gap-8 w-full">
      <div className="top w-full h-[50px]">
        <TopBar/>
      </div>
  <div className=" w-11/12 h-full flex flex-col  gap-5 mx-auto mb-12 ">
  <div className=" w-full h-full flex flex-col  gap-5 mx-auto ">
    <h1 className=" text-blue-900 text-2xl font-bold py-1">Global Dashboard</h1>
    <div className=" grid grid-cols-3 grid-rows-1  gap-10  ">
      <div className="col-span-2 bg-gray-50 shadow-xl flex border rounded  items-start">
        <div className="flex flex-col h-full border-r-2 border-r-gray-300 w-1/2 ">
          <p className="text-blue-900 px-2 py-4 font-bold">Specific Data</p>
          <form className="flex flex-col w-2/3 gap-1 pl-2 outline-none  " onSubmit={handleSubmitSpecificDate(submitSpecificDate)}>
            <label htmlFor="date" className=" text-xs ">Select date</label>
            <input type="date" name="date" id="date" className="border" {...registerSpecificDate("date")} />
            <p className=' text-sm text-red-700'>{errorsSpecificDate.date?.message}</p>
            <div className="text-center"><input type="submit" value="Get Rate" className="w-1/2 p-2 text-white hover:bg-green-500 cursor-pointer bg-green-600 my-2 rounded-md " /></div>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-blue-900 px-2 py-4 font-bold">Result</div>
          { NH4PredictionDataPerDate ? <div className="text-lg font-bold pl-4 ">{NH4PredictionDataPerDate}</div> : <div className="text-lg pl-4">No data found</div> }
        </div>
      </div>
      <div className="flex flex-col gap-1 w-2/3">
        <div className="flex flex-col gap-3 px-2 py-2 border-2 border-gray-300 rounded shadow-xl bg-gray-50   col-span-1 text-blue-950">
          <p className="  font-bold">Global average rate</p>
          <div className="text-2xl font-bold ">{NH4PredictionAverageRates}</div>

          
        </div>
        <div className="flex flex-col gap-3 px-2 py-2 border-2 rounded border-gray-300 shadow-xl bg-gray-50  col-span-1 text-blue-950">
          <p className="  font-bold">Threshold limit</p>
          <div className="text-2xl font-bold ">1</div>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-3 mt-4">
      <p className="text-xl  text-blue-900 ">Monthly analysis</p>
      <div className="grid grid-cols-3 grid-rows-1 gap-5 h-80">
      <div className="bg-gray-50  col-span-2 shadow-xl border-2">
          <NH4PredictionLineChartPerMonth />
      </div>
      <div className="bg-gray-50 flex flex-col gap-4 items-center w-full shadow-xl border-2">
          <form className="w-2/3  mt-4 flex flex-col  gap-2" onSubmit={handleSubmitMonth(submitMonth)}>
            <label htmlFor="month" className="text-sm font-bold">Select month</label>
            <div className="flex justify-between items-center w-full gap-2">
              <div className="flex flex-col h-full gap-1">
                <input type="month" id="month" name="month" className="outline-none flex w-11/12 h-full border-2 pl-2" {...registerMonth("month")} />
                <p className=' text-sm text-red-700'>{errorsMonth.month?.message}</p>
              </div>
              <div className="bg-green-600 hover:bg-green-400  text-white rounded-md p-1"><input type="submit" value="Get data" className="cursor-pointer text-sm" /></div>
            </div>
          </form>
          <div className="flex w-2/3  flex-col gap-3  py-2 border-2 border-gray-300 rounded  col-span-1 text-blue-950">
            <p className=" pl-2  font-bold"> Average rate</p>
            {NH4AverageRatePerMonth ? <div className="pl-2 text-2xl font-bold ">{NH4AverageRatePerMonth}</div>: <div className="pl-2 text-xs font-bold ">No Data Found</div> }
          </div>
          <div className="flex w-2/3  flex-col gap-3  py-2 border-2 rounded border-gray-300 col-span-1 text-blue-950">
            <p className=" pl-2 font-bold">Number of arrangements</p>
            {NH4RatesNumberPerMonth ? <div className=" pl-2 text-2xl font-bold ">{NH4RatesNumberPerMonth}</div>: <div className=" pl-2 text-xs font-bold ">No Data Found</div> }
        </div>
      </div>
    </div>
    </div>
    <div className="flex flex-col gap-3 mt-4">
      <p className="text-xl  text-blue-900 my-2">Yearly analysis</p>
      <div className="grid grid-cols-3 grid-rows-1 gap-5 h-96">
      <div className="bg-gray-50 col-span-2  shadow-xl border-2 ">
          <NH4PredictionLineChartPerYear year={recentPredictionNH4Year} />
      </div>
      <div className="bg-gray-50 flex flex-col gap-4 items-center w-full shadow-xl border-2">
          <form className="w-2/3  mt-4 flex flex-col  gap-2" onSubmit={handleSubmitYear(submitYear)}>
            <label htmlFor="month" className="text-sm font-bold">Select Year</label>
            <div className="flex justify-between items-center w-full gap-2">
              <div className="flex flex-col h-full gap-1">
                <input type="number" id="month" name="year" min="1970" className="outline-none w-11/12 flex h-full border-2 pl-2" {...registerYear("year")} />
                <p className=' text-sm text-red-700'>{errorsYear.year?.message}</p>
              </div>
              <div className="bg-green-600 hover:bg-green-400  text-white rounded-md p-1"><input type="submit" value="Get data" className="cursor-pointer text-sm" /></div>
            </div>
          </form>
          <div className="flex w-2/3  flex-col gap-3  py-2 border-2 border-gray-300 rounded  col-span-1 text-blue-950">
            <p className=" pl-2  font-bold"> Average rate</p>
            {NH4AverageRatePerYear ? <div className="pl-2 text-2xl font-bold ">{NH4AverageRatePerYear}</div> : <div className="pl-2 text-xs font-bold ">No Data Found</div>}
          </div>
          <div className="flex w-2/3  flex-col gap-3  py-2 border-2 rounded border-gray-300 col-span-1 text-blue-950">
            <p className=" pl-2 font-bold">Number of arrangements</p>
            {NH4RatesNumberPerYear ? <div className=" pl-2 text-2xl font-bold ">{NH4RatesNumberPerYear}</div> : <div className=" pl-2 text-xs font-bold ">No Data Found</div>}
        </div>
      </div>
    </div>
    </div>
    
  </div>
  </div>
  </div>
  </div>
  )
}

export default NH4PredictionRates
