import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import formRouter from './formRoute.js'
import authRouter from './authRoute.js';
import cookieParser from 'cookie-parser';
const app = express();
const port = 5000;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/form', formRouter)
app.use('/api/auth', authRouter)

app.use(
    (err, req, res, next) => {
        const errorStatus = err.status || 500
        const errorMsg = err.message || 'Something Went Wrong'

        return res.status(500).json({
            success: false,
            status: errorStatus,
            message: errorMsg,
            stack:err.stack
        })
    }
)

mongoose.connect('mongodb+srv://riteshraj10241089:0Bh00uZi2XPTuPpB@cluster0.rf2gy3r.mongodb.net/form-data').then(
    () => {
        console.log('connected to backend')
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    }
).catch(
    (err) => {
        console.log('error occured')
    }
)

