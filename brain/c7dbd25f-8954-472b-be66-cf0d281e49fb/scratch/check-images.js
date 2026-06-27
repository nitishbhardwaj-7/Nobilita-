const { Jimp } = require('jimp');
const path = require('path');

async function check() {
  const images = [
    path.join(__dirname, '../../../public/images/format & dimensions application copy new.jpg'),
    path.join(__dirname, '../../../public/images/Links/format & dimensions application.jpg'),
    path.join(__dirname, '../../../public/images/Links/format & dimensions application copy.jpg'),
    path.join(__dirname, '../../../public/images/Links/format & dimensions application copy 1.jpg'),
  ];

  for (const imgPath of images) {
    try {
      const image = await Jimp.read(imgPath);
      console.log(`${path.basename(imgPath)}: ${image.bitmap.width}x${image.bitmap.height}`);
    } catch (e) {
      console.error(`Error reading ${path.basename(imgPath)}:`, e.message);
    }
  }
}

check();
