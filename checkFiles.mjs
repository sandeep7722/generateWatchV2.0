
import fs from 'fs';
import path from 'path';

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

// Example: Provide the path to the folder you want to check
const folderPath = './images';
const numberOfFiles = getNumberOfFiles(folderPath);
console.log(`Number of files in the folder: ${numberOfFiles}`);
