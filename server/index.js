import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.config.js';

import postsRoutes from './routes/posts.route.js';
import authRoutes from './routes/auth.route.js';
import dashboardRoutes from './routes/dashboard.route.js';
import biomassRecordsRoutes from './routes/biomassRecords.route.js';



const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json({ limit: "30mb", extended:true}) );
app.use(bodyParser.urlencoded({ limit: "30mb", extended:true}) );
app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/biomass-records', biomassRecordsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});
