const express = require('express');
const router = express.Router();
const routerUser = require('./user.router');
const routerMedia = require('./media.router');


router.use("/users", routerUser)
router.use("/media", routerMedia)

module.exports = router;