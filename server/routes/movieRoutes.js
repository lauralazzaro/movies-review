const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movieCtrl');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');

router.get('', movieCtrl.getAllMovie);
router.get('/:id', movieCtrl.getOneMovie);
router.post('', auth, multer, movieCtrl.addMovie);
router.put('/:id', auth, multer, movieCtrl.updateMovie);
router.delete('/:id', auth, movieCtrl.deleteMovie);
router.post('/:id/like', auth, movieCtrl.likes);

module.exports = router;