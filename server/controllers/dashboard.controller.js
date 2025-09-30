import Dashboard from '../models/dashboard.model.js';

export const getDashboard = async (req, res) => {
    try {
        const dashboard = await Dashboard.findOne();
        if (!dashboard) return res.status(404).json({ message: 'No dashboard data found' });
        res.json(dashboard);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard' });
    }
};

export const createDashboard = async (req, res) => {
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
};
