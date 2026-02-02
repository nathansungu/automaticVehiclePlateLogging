from fastapi import FastAPI
from app.yolo import get_plate_image
from app.ocr import read_plate
from dotenv import load_dotenv 
from ultralytics import YOLO
load_dotenv()

app = FastAPI()

@app.get("/detect-plate")
async def plate_endpoint():
    plate_img, confidence = get_plate_image() 
    

    if plate_img is None:
        return {
            "plateNo": None,
            "confidenceScore": 0
        }

    plate_text = read_plate(plate_img)          
    print("plate_text", plate_text)
    return {
        
        "plate": plate_text,
        "confidenceScore": confidence
    }



