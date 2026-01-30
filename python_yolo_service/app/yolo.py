import cv2
from dotenv import load_dotenv 
import os
from ultralytics import YOLO
load_dotenv()

model = YOLO("yolov8n.pt")
STREAM_URL = "./testvideos/test2.mp4"

def get_video_capture():
    print(STREAM_URL)
    cap = cv2.VideoCapture(STREAM_URL)
    if cap is None:
        return None          

    if not cap.isOpened():
        print("Cannot connect to camera stream")
        return None

    print("Connected to camera stream")
    return cap


def detect_plate_from_frame(frame):
    # Track objects across frames
    results = model.track(frame, persist=True)
   
    vehicle_classes = [2, 3, 5, 7]  # car, motorbike, bus, truck

    for result in results:
        boxes = result.boxes
        if boxes is None:
            continue

        for box in boxes:
            conf = float(box.conf[0])
            cls = int(box.cls[0])

            # Only consider vehicles
            if cls not in vehicle_classes or conf < 0.4:
                continue

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # Safety bounds check
            h, w, _ = frame.shape
            x1, y1 = max(0, x1), max(0, y1)
            x2, y2 = min(w, x2), min(h, y2)

            plate_img = frame[y1:y2, x1:x2]

            if plate_img.size == 0:
                continue
            return plate_img, conf

    return None, 0.0


def get_plate_image():
    cap = get_video_capture()
    if cap is None:
        return None, 0.0

    ret, frame = cap.read()
    cap.release()

    if not ret:
        print("Failed to read frame")
        return None, 0.0

    plate_img, confidence  = detect_plate_from_frame(frame)
    return plate_img, confidence
