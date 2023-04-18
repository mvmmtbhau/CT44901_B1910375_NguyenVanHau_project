const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staff.controller');
const { upload } = require("../utils/upload");

router.post('/add', upload.single('image', 1), staffController.addNewStaff);

router.patch('/update/:id', upload.single('image', 1), staffController.updateById);

router.delete('/delete/:id', staffController.deleteById);

router.get('/', staffController.getAll);
router.get('/:id', staffController.getById);

module.exports = router;