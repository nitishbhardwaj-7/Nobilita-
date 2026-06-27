const { Jimp } = require('jimp');
const path = require('path');

async function analyze() {
  const imgPath = path.join(__dirname, '../../../public/images/format & dimensions application copy new.jpg');
  try {
    const image = await Jimp.read(imgPath);
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    const data = image.bitmap.data; // Buffer of RGBA values
    console.log(`Image dimensions: ${w}x${h}`);
    
    // Sample colors from the bottom few rows at x = w/2
    const sampleRows = [h - 2, h - 5, h - 10, h - 20, h - 40, h - 60, h - 80];
    const x = Math.floor(w / 2);
    for (const r of sampleRows) {
      if (r < 0 || r >= h) continue;
      const idx = (r * w + x) * 4;
      const red = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      console.log(`Row ${r} (from top): rgba(${red}, ${g}, ${b}, ${a})`);
    }
  } catch (e) {
    console.error('Error analyzing image:', e.message);
  }
}

analyze();
