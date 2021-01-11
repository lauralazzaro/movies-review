const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movieCtrl');
// const multer = require('../middleware/multer-config');
// const auth = require('../middleware/auth');

router.get('', movieCtrl.getAllMovie);
router.get('/:id', movieCtrl.getOneMovie);
router.post('', movieCtrl.addMovie);
router.put('/:id', movieCtrl.updateMovie);
router.delete('/:id', movieCtrl.deleteMovie);
router.post('/:id/like', movieCtrl.likes);

module.exports = router;