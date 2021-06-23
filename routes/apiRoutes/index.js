const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');

//used so that our app knows aobut the routes in animalRoutes.js
router.use(animalRoutes);
router.use(require('./zookeeperRoutes'));

module.exports = router;