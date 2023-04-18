const express = require('express');
const router = express.Router();

const positionController = require('../controllers/position.controller');

router.post('/add', positionController.addNewPosition);

router.patch('/update/:id', positionController.updateById);

router.delete('/delete/:id', positionController.deleteById);

router.get('/all', positionController.getPositions);
router.get('/:id', positionController.getById);
router.get('/', positionController.getAll);



module.exports = router;