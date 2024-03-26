import { SiReact } from "react-icons/si";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SiMoleculer } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getArrangementsNumber,
  getNH4AverageData,
  getPxOyAverageData,
  getRecentData,
  getNO3AverageData,
  postFile,
} from "../apiCalls/dataApiCall";
import { postPredictionFile } from "../apiCalls/dataPredictionApiCall";
import { toast } from "react-toastify";
import RecentNH4Data from "./charts/RecentNH4Data";
import RecentPxOyData from "./charts/RecentPxOyData";
import RecentNO3Data from "./charts/RecentNO3Data";
import ArrangmentPieChart from "./charts/ArrangmentPieChart";

const Main = () => {
  const [fileSelected, setFileSelected] = useState(null);
  const [predictionfileSelected, setPredictionFileSelected] = useState(null);

  const dispatch = useDispatch();
  const { NH4AverageRates } = useSelector((state) => state.data);
  const { PxOyAverageRates } = useSelector((state) => state.data);
  const { NO3AverageRates } = useSelector((state) => state.data);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileSelected(selectedFile);
    }
  };

  const handlePredictionChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPredictionFileSelected(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileSelected) {
      toast.error("No file provided");
      return;
    } else {
      const formData = new FormData();
      formData.append("file", fileSelected);
      dispatch(postFile(formData));
      setFileSelected(null);
    }
  };

  const handlePredictionSubmit = (e) => {
    e.preventDefault();
    if (!predictionfileSelected) {
      toast.error("No file provided");
      return;
    } else {
      const formData = new FormData();
      formData.append("file", predictionfileSelected);
      dispatch(postPredictionFile(formData));
      setPredictionFileSelected(null)
    }
  };

  useEffect(() => {
    dispatch(getNH4AverageData());
    dispatch(getPxOyAverageData());
    dispatch(getNO3AverageData());
    dispatch(getRecentData("NH4"));
    dispatch(getRecentData("PxOy"));
    dispatch(getRecentData("NO3"));
    dispatch(getArrangementsNumber());
    
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-5 mx-auto">
      <h1 className="text-blue-900 text-2xl font-bold py-1">Global Dashboard</h1>
      <div className="flex flex-wrap gap-2 justify-between items-stretch py-2">
        <div className="shadow-xl flex">
          <div className="text-center p-6 bg-blue-600 flex justify-center items-center rounded-l text-2xl text-gray-50">
            <SiMoleculer />
          </div>
          <div className="flex pb-5 pt-1 pl-2 pr-4 justify-start flex-col">
            <p className="text-sm">NH4 average rate</p>
            <div className="font-bold text-lg">{NH4AverageRates}</div>
          </div>
        </div>
        <div className="shadow-xl rounded flex">
          <div className="text-center p-6 bg-red-600 flex justify-center items-center rounded-l text-gray-50 text-2xl">
            <SiMoleculer />
          </div>
          <div className="flex pb-5 pt-1 pl-2 pr-4 justify-start flex-col">
            <p className="text-sm">PxOy average rate</p>
            <div className="font-bold text-lg">{PxOyAverageRates}</div>
          </div>
        </div>
        <div className="shadow-xl flex rounded">
          <div className="text-center p-6 bg-green-600 flex justify-center rounded-l items-center text-2xl text-gray-50">
            <SiReact />
          </div>
          <div className="flex pb-5 pt-1 pl-2 pr-4 justify-start flex-col">
            <p className="text-sm">NO3 average rate</p>
            <div className="font-bold text-lg">{NO3AverageRates}</div>
          </div>
        </div>
        <div className="shadow-xl rounded flex pr-4">
          <div className="text-center p-6 bg-yellow-500 flex justify-center items-center rounded-l text-2xl text-gray-50">
            <IoMdAddCircleOutline />
          </div>
          <div className="flex pb-3 pt-1 pl-2 pr-4 items-center justify-center">
            <form
              className={`w-40 ${!fileSelected && "flex flex-col"}`}
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="file"
                className="cursor-pointer p-1 my-2 bg-green-400 text-white text-xs rounded"
              >
                Upload file
              </label>
              <input
                type="file"
                id="file"
                name="file"
                className="hidden"
                onChange={handleChange}
              />
              {fileSelected && <p className="text-xs truncate my-2">{fileSelected.name}</p>}
              <input
                type="submit"
                value="Add Data"
                className="cursor-pointer border border-gray-400 text-xs my-2"
              />
            </form>
          </div>
        </div>
        
        </div>
        <div className="flex justify-end w-full">
        <div className="shadow-xl rounded flex pr-4">
          <div className="text-center p-6 bg-yellow-500 flex justify-center items-center rounded-l text-2xl text-gray-50">
            <IoMdAddCircleOutline />
          </div>
          <div className="flex pb-3 pt-1 pl-2 pr-4 items-center justify-center">
            <form
              className={`w-40 ${!predictionfileSelected && "flex flex-col"}`}
              onSubmit={handlePredictionSubmit}
            >
              <label
                htmlFor="predictionFile"  // Unique ID for the prediction file input
                className="cursor-pointer p-1 my-2 bg-green-400 text-white text-xs rounded"
              >
                Upload Predictions file
              </label>
              <input
                type="file"
                id="predictionFile"  // Unique ID for the prediction file input
                name="file"
                className="hidden"
                onChange={handlePredictionChange}
              />
              {predictionfileSelected && (
                <p className="text-xs truncate my-2">{predictionfileSelected.name}</p>
              )}
              <input
                type="submit"
                value="Add Prediction Data"
                className="cursor-pointer border border-gray-400 text-xs my-2"
              />
            </form>
          </div>
        </div>
        </div>

<div className="flex flex-col gap-3 mt-4">
  <p className="text-xl text-blue-900">Recent analysis</p>
  <div className="grid grid-cols-2 grid-rows-1 gap-5 h-80">
    <div className="bg-gray-50 shadow-xl">
      <RecentNH4Data />
    </div>
    <div className="bg-gray-50 shadow-xl">
      <RecentPxOyData />
    </div>
  </div>
  <div className="grid grid-cols-2 grid-rows-1 gap-5 h-80">
    <div className="bg-gray-50 shadow-xl">
      <RecentNO3Data />
    </div>
    <div className="bg-gray-50 shadow-xl">
      <ArrangmentPieChart />
    </div>
  </div>
</div>
</div>
);
};

export default Main;

