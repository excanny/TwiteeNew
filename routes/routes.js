const express = require ('express');
const router  = express.Router(); 
const auth = require("../middlewares/auth");

const userController = require('../controllers/userController'); 
const twitController = require('../controllers/twitController'); 

router.post('/register', userController.register); 
router.post('/login', userController.login);

router.post('/create/twit/', auth, twitController.createTwit);
router.get('/twits/', auth, twitController.getAllTwits);
router.get('/twit/', auth, twitController.getTwit);
router.post('/delete/twit/', auth, twitController.deleteTwit);
router.post('/create/twit/comment/', auth, twitController.addTwitComment);
router.post('/create/twit/like/', auth, twitController.addTwitLike);

module.exports = router;
