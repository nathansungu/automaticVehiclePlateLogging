import cv2
from ultralytics import YOLO
model = YOLO("yolov8n.pt")

STREAM_URL = "http://192.168.1.5:8080/video"  


def get_video_capture():
    """Connect to phone camera stream"""
    cap = cv2.VideoCapture(STREAM_URL)

    if not cap.isOpened():
        print("Cannot connect to camera stream")
        return None

    print("✅ Connected to camera stream")
    return cap


def detect_plate_from_frame(frame):

    results = model(frame)

    for result in results:
        boxes = result.boxes
        if boxes is None:
            continue

        for box in boxes:
            conf = float(box.conf[0])
            if conf < 0.4:
                continue

            x1, y1, x2, y2 = map(int, box.xyxy[0])
            plate_img = frame[y1:y2, x1:x2]

            if plate_img.size == 0:
                continue

            return plate_img 

    return None


def get_plate_image():

    cap = get_video_capture()
    if cap is None:
        return None

    ret, frame = cap.read()
    cap.release()

    if not ret:
        print(" Failed to read frame")
        return None

    plate_img = detect_plate_from_frame(frame)
    return plate_img
