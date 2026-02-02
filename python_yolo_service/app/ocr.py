import cv2
import easyocr
import re

reader = easyocr.Reader(['en'], gpu=False)


def preprocess_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.bilateralFilter(gray, 11, 17, 17)
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    return thresh


def clean_plate_text(text):
    text = text.upper()
    text = re.sub(r'[^A-Z0-9]', '', text)
    return text


def read_plate(plate_img):
    if plate_img is None:
        return None

    processed = preprocess_image(plate_img)
    results = reader.readtext(processed)

    if not results or len(results) == 0:
        return None

    # Get most confident OCR result
    best = max(results, key=lambda x: x[2])
    raw_text = best[1]
    ocr_confidence = float(best[2])
    if ocr_confidence < 0.2:
        return None
    print("OCR raw text:", raw_text, "Confidence:", ocr_confidence)
    cleaned_text = clean_plate_text(raw_text)

    return {
        "plate_text": cleaned_text,
        "ocr_confidence": round(ocr_confidence, 3)
    }
