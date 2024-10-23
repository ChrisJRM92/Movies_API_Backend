const { getAll, getOne, remove, update, videoToDB } = require('../controllers/video.controllers');
const express = require('express');

const routerName = express.Router();

routerName.route('/').get(getAll).post(videoToDB);

routerName.route('/:id').get(getOne).delete(remove).put(update);

module.exports = routerName;