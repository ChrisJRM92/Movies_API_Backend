const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const { videoToDB } = require('../controllers/video.controllers');

const uploadsPath = path.join(__dirname, '../uploads');

const watcher = chokidar.watch(uploadsPath, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
});

watcher.on('add', (filePath) => {
  console.log(`Nuevo archivo agregado: ${filePath}`);

  const fileName = filePath.replace(/^.*[\\\/]/, '');
  const relativePath = `/uploads/${fileName}`;

  const videoStats = fs.statSync(filePath);
  const videoData = {
    title: fileName,
    path: relativePath,
    size: videoStats.size, 
  };

  videoToDB(videoData)
    .then(() => {
      console.log(`Video ${fileName} guardado en la base de datos`);
    })
    .catch((error) => {
      console.error(`Error al guardar el video en la base de datos: ${error}`);
    });
});

module.exports = watcher;
