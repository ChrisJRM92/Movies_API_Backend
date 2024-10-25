const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const { videoToDB } = require('../controllers/video.controllers');

const uploadsPath = path.join(__dirname, '../uploads');
// console.log(uploadsPath)

const watcher = chokidar.watch(uploadsPath, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  depth: 1,
});

watcher.on('add', (filePath) => {
  console.log(`Nuevo archivo agregado: ${filePath}`);

  const fileName = path.basename(filePath);
  const relativePath = path.relative(uploadsPath, filePath).replace(/\\/g, '/');
  const folderName = path.basename(path.dirname(filePath));

  const videoStats = fs.statSync(filePath);
  const videoData = {
    title: fileName,
    path: `/uploads/${relativePath}`,
    size: videoStats.size, 
    category: folderName,
  };

  videoToDB(videoData)
    .then(() => {
      // console.log(`Video ${fileName} guardado en la base de datos`);
    })
    .catch((error) => {
      // console.error(`Error al guardar el video en la base de datos: ${error}`);
    });
});

module.exports = watcher;
