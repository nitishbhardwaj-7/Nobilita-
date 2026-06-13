from PIL import Image
import os

images = [
    'public/images/Links/Arabescato Vagli Face 1_1.jpg',
    'public/images/Links/Calacatta Oyster Face 1.jpg',
    'public/images/Calacatta Oyster/Bookmatch.jpg'
]

for img_path in images:
    if os.path.exists(img_path):
        try:
            with Image.open(img_path) as img:
                print(img_path, img.size)
        except Exception as e:
            print(img_path, "Error:", e)
    else:
        print(img_path, "does not exist")
