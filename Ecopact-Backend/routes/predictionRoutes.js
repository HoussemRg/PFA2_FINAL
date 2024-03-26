const express=require('express');
const uploadFile = require('../middlewares/uploadFile');
const { addNewPredictionReport, getAverageOfAllPredictionData, getPredictionDataPerMonth, getPredictionDataPerYear,  getPredictionDataPerDate,getRecentPredictionData,getNumberArrangements} = require('../controllers/predictionController');
const { verifyToken } = require('../middlewares/verifyToken');

const predictionRoutes=express.Router();
//predictions 

predictionRoutes.post('/addPrediction',verifyToken,uploadFile.single('file'),addNewPredictionReport);


// get data per month of a given dataType
predictionRoutes.post('/predictiondataPerMonth',verifyToken,getPredictionDataPerMonth)

// get data per year of a given dataType
predictionRoutes.post('/predictiondataPerYear',verifyToken,getPredictionDataPerYear)

// get average of all data per dataType
predictionRoutes.get(`/recentprediction/:type`,verifyToken,getRecentPredictionData)

// get data per dataType and specific date
predictionRoutes.post('/predictiondataPerDate',verifyToken,getPredictionDataPerDate)

// get average of all data per dataType
predictionRoutes.get(`/averageprediction/:type`,verifyToken,getAverageOfAllPredictionData)


// get data per year of a given dataType
predictionRoutes.get('/arrangements',verifyToken,getNumberArrangements);

module.exports={predictionRoutes}