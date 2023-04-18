const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.controller');
const { upload } = require("../utils/upload");

router.post('/add', upload.single('image', 1), roomController.addNewRoom);

router.patch('/update/:id', roomController.updateById);

router.delete('/delete/:id', roomController.deleteById);

router.get('/', roomController.getAll);
router.get('/:id', roomController.getById);

module.exports = router;