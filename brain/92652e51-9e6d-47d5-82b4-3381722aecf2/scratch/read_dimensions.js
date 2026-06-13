const fs = require('fs');

function getJpegSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  let i = 4;
  while (i < buffer.length) {
    const marker = buffer.readUInt16BE(i);
    i += 2;
    if (marker === 0xFFC0 || marker === 0xFFC2) {
      i += 2; // skip length
      const precision = buffer[i++];
      const height = buffer.readUInt16BE(i);
      i += 2;
      const width = buffer.readUInt16BE(i);
      return { width, height };
    } else {
      const length = buffer.readUInt16BE(i);
      i += length;
    }
  }
  return null;
}

try {
  console.log('Arabescato:', getJpegSize('public/images/Links/Arabescato Vagli Face 1_1.jpg'));
  console.log('Oyster Face 1:', getJpegSize('public/images/Links/Calacatta Oyster Face 1.jpg'));
  console.log('Oyster Bookmatch:', getJpegSize('public/images/Calacatta Oyster/Bookmatch.jpg'));
} catch (e) {
  console.error(e);
}
