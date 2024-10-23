const express = require('express');
const router = express.Router();
const routerUser = require('./user.router');
const routerMedia = require('./video.router');


router.use("/users", routerUser)
router.use("/video", routerMedia)

module.exports = router;