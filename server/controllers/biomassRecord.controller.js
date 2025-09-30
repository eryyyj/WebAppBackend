import BiomassRecord from '../models/biomassRecord.model.js';

export const getBiomassRecords = async (req, res) => {
    try {
        const records = await BiomassRecord.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching biomass records' });
    }
};
