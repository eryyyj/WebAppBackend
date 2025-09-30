import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  liveFeedData: String,
  currentShrimpCount: Number,
  currentBiomass: Number,
  currentFeedMeasurement: Number,
  dateTime: Date,
  countThreshold: Number,
});

export default mongoose.model('Dashboard', dashboardSchema);