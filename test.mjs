
import fs from 'fs';
import request from 'request';
 import Jimp from 'jimp';

// URL se image download karne ke liye
function downloadImage(url, filename, folderName) {
  // Image ka URL le
  request(url, { encoding: 'binary' }, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      return;
    }

    if (response.statusCode === 200) {
      // Image ka data buffer me store ho jayega
      var imageData = body;

      // Image ko file me save karne ke liye
      const filePath = `${folderName}/${filename}`;
     
      fs.writeFile(filePath, imageData, 'binary', (err) => {
        if (err) {
          console.error('Error saving image:', err);
          return;
        }

        console.log('Image saved:', filePath);
      });
    } else {
      console.error('Error:', response.statusCode);
    }
  });
}

// Image download karne aur rename karne ke liye
function main() {
  // Image ka URL le
  const url = 'https://replicate.delivery/pbxt/p6fL7mlNc8QHGKaLu6OJA8716b5WgCdoab5Ys1zqmoGizR7IA/out-0.png';

  // Image ko rename karne ke liye
  const filename = 'my_image.png';

  // Folder ka naam
  const folderName = './images';

  // Image download kar
  downloadImage(url, filename, folderName);
}

// Main function ko call kar
main();
