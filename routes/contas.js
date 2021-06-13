var express = require('express');
var router = express.Router();

const contasController = require('../controllers/contas');

router.post('/', contasController.create );
router.get('/', contasController.read );
router.get('/edit', contasController.readById );
router.get('/read', contasController.readContas );
router.put('/update', contasController.update );
router.delete('/delete', contasController.delete );
router.get('/filter', contasController.filter );

module.exports = router;