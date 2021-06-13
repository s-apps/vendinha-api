var express = require('express');
var router = express.Router();

const comprasController = require('../controllers/compras');

router.get('/', comprasController.read );
router.delete('/delete', comprasController.delete );
router.post('/', comprasController.create );

module.exports = router;