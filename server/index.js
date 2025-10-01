import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.config.js';

import postsRoutes from './routes/posts.route.js';
import authRoutes from './routes/auth.route.js';
import biomassRecordsRoutes from './routes/biomassRecords.route.js';
import imageProcessRoutes from './routes/imageProcess.route.js';


const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json({ limit: "30mb", extended:true}) );
app.use(bodyParser.urlencoded({ limit: "30mb", extended:true}) );
app.use('/api/posts', postsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/biomass-records', biomassRecordsRoutes);
app.use('/api/uploadimage', imageProcessRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});
