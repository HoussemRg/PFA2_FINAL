const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
require('dotenv').config();
const port=process.env.PORT || 3001;
const path=require('path');
const { authRoutes } = require('./routes/authRoutes');
const { dataRoutes } = require('./routes/dataRoutes');
const { predictionRoutes } = require('./routes/predictionRoutes');
const { notFound, errorHandler } = require('./middlewares/errors');
const { userRoutes } = require('./routes/userRoutes');
const { alertsRoutes } = require('./routes/alertsRoutes');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:5173'
}));

app.use('/api/auth',authRoutes);
app.use('/api/data',dataRoutes);
app.use('/api/prediction',predictionRoutes);
app.use('/api/user',userRoutes);
app.use('/api/alerts',alertsRoutes);


//not found middleware
app.use(notFound);

//error handler middleware
app.use(errorHandler);


mongoose.connect(process.env.DB_URI).then(
    ()=>{
        app.listen(port,()=>{
            console.log(`connected to database`);
            console.log(`http://localhost:${port}`);
            
        })
    }
).catch((err)=> console.log(err.message));