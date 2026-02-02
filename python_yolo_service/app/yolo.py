import cv2
from dotenv import load_dotenv 
from ultralytics import YOLO
import os

load_dotenv()


MODEL_PATH = "./models/yolov8n.pt"
PLATE_DETECTOR_PATH = "./models/plate_detector.pt"


model = YOLO(MODEL_PATH)         
plate_model = YOLO(PLATE_DETECTOR_PATH)

STREAM_URL = "./testvideos/test7.mp4"
video_capture = None

# Track vehicles and their best plate detections
vehicle_tracking = {}
# Track which vehicles we've already reported
reported_vehicles = set()


def get_video_capture_persistent():
    global video_capture
    
    if video_capture is None or not video_capture.isOpened():
        print(f"Opening video: {STREAM_URL}")
        video_capture = cv2.VideoCapture(STREAM_URL)
        
        if not video_capture.isOpened():
            print("Cannot open video stream")
            return None
        
        print("Connected to camera stream")
    
    return video_capture


def detect_plate_from_frame(frame):
    
    global vehicle_tracking, reported_vehicles
    
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
            if cls not in vehicle_classes or conf < 0.7:
                continue

            # Get vehicle tracking ID (essential for tracking same vehicle)
            if box.id is None:
                continue
            
            vehicle_id = int(box.id[0])

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # Safety bounds check
            h, w, _ = frame.shape
            x1, y1 = max(0, x1), max(0, y1)
            x2, y2 = min(w, x2), min(h, y2)

            vehicle_img = frame[y1:y2, x1:x2]

            if vehicle_img.size == 0:
                continue

            plate_results = plate_model(vehicle_img)

            for plate in plate_results:
                if len(plate.boxes) == 0:
                    continue

                # Take the first detected plate
                plate_box = plate.boxes[0]
                plate_conf = float(plate_box.conf[0])
                
                # Filter by plate confidence
                if plate_conf < 0.5:
                    continue
                
                px1, py1, px2, py2 = map(int, plate_box.xyxy[0])
                px1, py1 = max(0, px1), max(0, py1)
                px2, py2 = min(vehicle_img.shape[1], px2), min(vehicle_img.shape[0], py2)

                plate_img = vehicle_img[py1:py2, px1:px2]

                if plate_img.size == 0:
                    continue

                # Track this detection for the vehicle
                if vehicle_id not in vehicle_tracking:
                    vehicle_tracking[vehicle_id] = {
                        'plate_img': plate_img.copy(),
                        'confidence': plate_conf,
                        'frame_count': 1,
                        'last_seen_frame': 0
                    }
                else:
                    # Update if this is a better detection
                    vehicle_tracking[vehicle_id]['frame_count'] += 1
                    vehicle_tracking[vehicle_id]['last_seen_frame'] = 0
                    
                    if plate_conf > vehicle_tracking[vehicle_id]['confidence']:
                        vehicle_tracking[vehicle_id]['plate_img'] = plate_img.copy()
                        vehicle_tracking[vehicle_id]['confidence'] = plate_conf

    for vehicle_id, data in list(vehicle_tracking.items()):
        data['last_seen_frame'] += 1
        
        if data['last_seen_frame'] > 10 and vehicle_id not in reported_vehicles:
            if data['frame_count'] >= 3 and data['confidence'] >= 0.3:
                reported_vehicles.add(vehicle_id)
                print(f"Vehicle {vehicle_id}: Best confidence {data['confidence']:.2f} over {data['frame_count']} frames")
                
                # Clean up this vehicle from tracking
                plate_to_return = data['plate_img']
                conf_to_return = data['confidence']
                del vehicle_tracking[vehicle_id]
                
                return plate_to_return, conf_to_return

    return None, 0.0


def get_plate_image():    
    cap = get_video_capture_persistent()
    if cap is None:
        return None, 0.0

    ret, frame = cap.read()
    
    # If video ended, reset tracking and loop back to start
    if not ret:
        print("End of video reached, looping back to start")
        global vehicle_tracking, reported_vehicles
        vehicle_tracking = {}
        reported_vehicles = set()
        
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        ret, frame = cap.read()
    
    if not ret:
        print("Failed to read frame")
        return None, 0.0

    plate_img, confidence = detect_plate_from_frame(frame)
    
    if plate_img is not None:
        print(f"✓ New unique plate detected with confidence: {confidence:.2f}")
       
        cv2.imshow("Detected License Plate", plate_img)
        cv2.waitKey(0)  
        cv2.destroyAllWindows()

    return plate_img, confidence


def reset_tracking():
   
    global vehicle_tracking, reported_vehicles
    vehicle_tracking = {}
    reported_vehicles = set()
    print("Tracking reset")


def release_video_capture():
    
    global video_capture
    if video_capture is not None:
        video_capture.release()
        video_capture = None
        print("Video capture released")

