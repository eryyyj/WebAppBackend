import mongoose from 'mongoose';

const biomassRecordSchema = new mongoose.Schema({
  dashboardId: mongoose.Schema.Types.ObjectId,
  shrimpCount: Number,
  biomass: Number,
  feedMeasurement: Number,
  dateTime: Date,
  recordId: String,
});

export default mongoose.model('BiomassRecord', biomassRecordSchema);