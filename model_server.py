from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
from ultralytics import RTDETR
import cv2
import numpy as np
import io
import base64
from PIL import Image

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Load Model (runs once at server start)
MODEL_PATH = "server/rtdetr.pt"
model = RTDETR(MODEL_PATH)

def read_imagefile(file_bytes) -> np.ndarray:
    image = np.frombuffer(file_bytes, np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    return image

def encode_image_to_base64(image: np.ndarray) -> str:
    _, buffer = cv2.imencode('.jpg', image)
    return base64.b64encode(buffer).decode('utf-8')

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    # 2. Receive image file
    file_bytes = await image.read()
    img_np = read_imagefile(file_bytes)
    img_rgb = cv2.cvtColor(img_np, cv2.COLOR_BGR2RGB)

    # 3. Run inference
    results = model(img_rgb)

    # 4. Post-processing: count, draw boxes, calculate biomass/feed
    detections = results[0].boxes.xyxy.cpu().numpy()  # [x1, y1, x2, y2, conf, class]
    shrimp_count = len(detections)

    # Example: simple biomass/feed calculation (customize as needed)
    calculated_biomass_grams = round(shrimp_count * 0.035, 2)  # Example: 0.035g per fry
    recommended_feed_grams = round(calculated_biomass_grams * 0.15, 2)  # Example: 15% of biomass

    # Draw bounding boxes
    for box in detections:
        x1, y1, x2, y2 = map(int, box[:4])
        cv2.rectangle(img_np, (x1, y1), (x2, y2), (0, 255, 0), 2)

    # 5. Encode processed image to base64
    processed_image_base64 = encode_image_to_base64(img_np)

    # store the results in json_response
    json_response = {
        "count": shrimp_count,
        "calculatedBiomassGrams": calculated_biomass_grams,
        "recommendedFeedGrams": recommended_feed_grams,
        "processedImageBase64": processed_image_base64
    }
    # reset the values for next prediction
    shrimp_count = 0
    calculated_biomass_grams = 0
    recommended_feed_grams = 0
    #reset processed Image
    processed_image_base64 = ""

    # 6. Return JSON response
    return JSONResponse(json_response)