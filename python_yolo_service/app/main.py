from fastapi import FastAPI, File, UploadFile
from yolo import detect_plate
from ocr import read_plate

app = FastAPI()

@app.post("/detect-plate")
async def plate_endpoint(file: UploadFile = File(...)):
    frame = await file.read()
    plate_img = detect_plate(frame)      
    plate_text = read_plate(plate_img)  
    return {"plate": plate_text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
    print("Server is running on port 5000")



