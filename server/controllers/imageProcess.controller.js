import axios from 'axios';
import fs from 'fs';
import multer from 'multer';
import FormData from 'form-data';
import BiomassRecord from '../models/biomassRecord.model.js';

const upload = multer({ dest: 'uploads/' });

/**
 * Controller to handle image upload, send to object detection model, and return count.
 */
export const processImage = async (req, res) => {
    try {
        // Check if file is present
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded.' });
        }

        // Prepare form data for model server
        const formData = new FormData();
        formData.append('image', fs.createReadStream(req.file.path));

        // Send image to object detection model server (adjust URL as needed)
        const response = await axios.post(
            'http://localhost:5001/predict', 
            formData,
            {
                headers: formData.getHeaders(),
            }
        );

        // Remove uploaded file after processing
        fs.unlinkSync(req.file.path);

        const {count, calculatedBiomassGrams, recommendedFeedGrams} = response.data;
        
        // Save biomass record to database
        const biomassRecord = new BiomassRecord({
            dateTime: new Date(),
            shrimpCount: count,
            biomass: calculatedBiomassGrams,
            feedMeasurement: recommendedFeedGrams
        });
        await biomassRecord.save();
        

        res.json({
            status: 'success',
            count: count,
            biomass: calculatedBiomassGrams,
            feed: recommendedFeedGrams,
            processedImage: response.data.dataprocessedImageBase64 // base64 string
        });

    } catch (error) {
        res.status(500).json({ message: 'Error processing image', error: error.message });
    }
};

// Export multer upload middleware for use in route
export { upload };