const express=require('express');
const { getANPEAlertData, checkAlertData, getClientAlertData, getSingleReportData, viewAlertData, getAllAlertData } = require('../controllers/alertController');
const { verifyTokenForAdmin, verifyTokenForOnlyUser, verifyToken } = require('../middlewares/verifyToken');
const { validateId } = require('../middlewares/verifyId');

const alertsRoutes=express.Router();

// get All Alerts
alertsRoutes.get('/',verifyTokenForAdmin,getAllAlertData);
// get ANPE Alerts
alertsRoutes.get('/ANPE',verifyTokenForAdmin,getANPEAlertData);
// get Client Alerts
alertsRoutes.get('/client/:id',validateId,verifyTokenForOnlyUser,getClientAlertData);
// check the alert and send worning to the client
alertsRoutes.put('/ANPE/:id',validateId,verifyTokenForAdmin,checkAlertData);
// get alert data 
alertsRoutes.get('/report/:id',validateId,verifyToken,getSingleReportData);
// get alert data 
alertsRoutes.put('/report/:id',validateId,verifyToken,viewAlertData);



module.exports={alertsRoutes}