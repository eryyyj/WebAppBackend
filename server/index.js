
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


import postsRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';



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


//mongoose.connect('mongodb://127.0.0.1:27017/shrimp_app')
mongoose.connect('mongodb+srv://qajgvalencia:BUxIhYb4nDlfH4DV@cluster0.h07iggq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));




import User from './models/userModel.js';
import Dashboard from './models/dashboardModel.js';
import BiomassRecord from './models/biomassRecordModel.js';



app.get('/dashboard', async (req, res) => {
    try {
        const dashboard = await Dashboard.findOne();
        if (!dashboard) return res.status(404).json({ message: 'No dashboard data found' });
        res.json(dashboard);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard' });
    }
});


app.post('/dashboard', async (req, res) => {
    const {
        userId,
        liveFeedData,
        currentShrimpCount,
        currentBiomass,
        currentFeedMeasurement,
        dateTime,
        countThreshold
    } = req.body;
    try {
        const dashboard = new Dashboard({
            userId,
            liveFeedData,
            currentShrimpCount,
            currentBiomass,
            currentFeedMeasurement,
            dateTime,
            countThreshold
        });
        await dashboard.save();
        res.status(201).json(dashboard);
    } catch (error) {
        res.status(400).json({ message: 'Error creating dashboard', error });
    }
});


app.get('/biomass-records', async (req, res) => {
    try {
        const records = await BiomassRecord.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching biomass records' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
