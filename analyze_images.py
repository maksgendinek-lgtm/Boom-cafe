import os
from PIL import Image
from PIL.ExifTags import TAGS
import json

photos_dir = "BOOM EDIT/BOOM EDIT/Photos"
output_file = "image_info.json"

results = []

files = sorted([f for f in os.listdir(photos_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])

for filename in files:
    filepath = os.path.join(photos_dir, filename)
    try:
        img = Image.open(filepath)
        
        info = {
            "filename": filename,
            "size": img.size,
            "mode": img.mode,
            "format": img.format,
            "file_size_kb": os.path.getsize(filepath) / 1024
        }
        
        # Try to get EXIF data
        exif_data = {}
        if hasattr(img, '_getexif') and img._getexif():
            for tag_id, value in img._getexif().items():
                tag = TAGS.get(tag_id, tag_id)
                exif_data[str(tag)] = str(value)
        
        info["exif"] = exif_data
        results.append(info)
        
    except Exception as e:
        results.append({
            "filename": filename,
            "error": str(e)
        })

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"Analyzed {len(results)} images. Results saved to {output_file}")