const express=require('express');
const uploadFile = require('../middlewares/uploadFile');
const { addNewReport, getAverageOfAllData, getDataPerMonth, getDataPerYear,  getDataPerDate, getRecentData, getNumberArrangements } = require('../controllers/dataController');
const { verifyToken } = require('../middlewares/verifyToken');

const dataRoutes=express.Router();

// add new report
dataRoutes.post('/add',verifyToken,uploadFile.single('file'),addNewReport);

// get data per dataType and specific date
dataRoutes.post('/dataPerDate',verifyToken,getDataPerDate)

// get average of all data per dataType
dataRoutes.get(`/average/:type`,verifyToken,getAverageOfAllData)

// get average of all data per dataType
dataRoutes.get(`/recent/:type`,verifyToken,getRecentData)


// get data per month of a given dataType
dataRoutes.post('/dataPerMonth',verifyToken,getDataPerMonth)

// get data per year of a given dataType
dataRoutes.post('/dataPerYear',verifyToken,getDataPerYear)


// get data per year of a given dataType
dataRoutes.get('/arrangements',verifyToken,getNumberArrangements);

module.exports={dataRoutes}