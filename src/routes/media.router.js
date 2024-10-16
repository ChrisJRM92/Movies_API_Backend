const { getAll, create, getOne, remove, update } = require('../controllers/media.controllers');
const express = require('express');

const routerName = express.Router();

routerName.route('/').get(getAll).post(create);

routerName.route('/:id').get(getOne).delete(remove).put(update);

module.exports = routerName;