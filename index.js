//npm install replicate
//npm install request
//npm install jimp
//npm install express
// npm install express replicate request jimp 

const Replicate = require('replicate');
const express = require('express');
const fs = require('fs');
const request = require('request');
const Jimp = require('jimp');
const path = require('path');
const app = express();
const hostname='0.0.0.0';
const port = 3000;


// Serve static images from the 'images' folder
app.use(express.static('images'));

const replicate = new Replicate({
  auth: 'r8_2IH7YIHqxpNG87zdQGajEfhYAuA3gDg3WJ8II',
});

//image array from where ele will be picked
var images = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png', 'image8.png', 'image9.png', 'image10.png', 
                  'image11.png', 'image12.png', 'image13.png', 'image14.png', 'image15.png', 'image16.png', 'image17.png', 'image18.png', 'image19.png', 'image20.png', 'image21.png', 'image22.png', 'image23.png', 'image24.png', 'image25.png',
                 'image26.png', 'image27.png', 'image28.png', 'image29.png', 'image30.png', 'image31.png', 'image32.png', 'image33.png', 'image34.png', 'image35.png', 
                  'image36.png', 'image37.png', 'image38.png', 'image39.png', 'image40.png', 'image41.png', 'image42.png', 'image43.png', 'image44.png', 'image45.png', 'image46.png', 'image47.png', 'image48.png', 'image49.png', 'image50.png',
                 'image51.png', 'image52.png', 'image53.png', 'image54.png', 'image55.png', 'image56.png', 'image57.png', 'image58.png', 'image59.png', 'image60.png', 'image61.png', 'image62.png', 'image63.png', 'image64.png', 'image65.png',
                 'image66.png', 'image67.png', 'image68.png', 'image69.png', 'image70.png', 'image71.png', 'image72.png', 'image73.png', 'image74.png', 'image75.png', 'image76.png', 'image77.png', 'image78.png', 'image79.png', 'image80.png',
                 'image81.png', 'image82.png', 'image83.png', 'image84.png', 'image85.png', 'image86.png', 'image87.png', 'image88.png', 'image89.png', 'image90.png', 'image91.png', 'image92.png', 'image93.png', 'image94.png', 'image95.png',
                 'image96.png', 'image97.png', 'image98.png', 'image99.png', 'image100.png']; // List of image files

let isImageDownloaded=true;
// method to dowload image
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
      console.log(filePath);
     
      fs.writeFile(filePath, imageData, 'binary', (err) => {
        if (err) {
          console.error('Error saving image:', err);
          return;
        }
        
       // console.log(images);
        console.log('Image saved:', filePath);
        images.push(filename);
        isImageDownloaded=true;
      });
    } else {
      console.error('Error:', response.statusCode);
    }
  });
}

// funtion for check number of files in images folder
function getNumberOfFiles(folderPath) {
  let numberOfFiles = 0;

  const items = fs.readdirSync(folderPath);
  

  items.forEach(item => {
    const itemPath = path.join(folderPath, item);
    

    const stats = fs.statSync(itemPath);

    if (stats.isFile()) {
      numberOfFiles++;
    }
  });

  return numberOfFiles;
}


const model="tability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";
const input={
    prompt: "Create a cinematic 8K image showcasing a Ralph Lauren wristwatch adorned with enchanting butterfly and floral designs. Ensure the entire wristwatch is prominently featured in the composition, with no human body visible in the frame. Craft a visually compelling scene that accentuates the luxury and beauty of the timepiece, keeping the focus solely on this stylish accessory."
  };



async function processImage(input) {
  try {
     isImageDownloaded=false;
      const output = await replicate.run(model, { input });
      console.log(output[0]);
      console.log("image url received from API");
      const url = output[0];

      // Folder ka naam
      const folderName = './images';

      const numberOfFiles = getNumberOfFiles(folderName);
      console.log(`Number of files in the folder: ${numberOfFiles}`);

      // Image ko rename karne ke liye
      const filename = `image${numberOfFiles + 1}.png`;

      // Image download kar
      downloadImage(url, filename, folderName);
  } catch (err) {
      isImageDownloaded=true;
      console.log(err);
  }
}

// processImage(input);

// new code from github repo
// Define a route to get a random image
app.get('/getRandomImage', (req, res) => {
  // Random image selection logic
  
  //console.log(images);
  console.log(images.length);
  const randomImage = images[Math.floor(Math.random() * images.length)];
  
  // Send the selected image as a response
  res.sendFile(`${__dirname}/images/${randomImage}`);
  if(isImageDownloaded)
  {
    processImage(input);
  }

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



