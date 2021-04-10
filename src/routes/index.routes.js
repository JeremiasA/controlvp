const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controller');

router.get('/', controller.index);
router.get('/pedidos', controller.pedidos);
router.get('/filter', controller.filter);
router.post('/nueva', controller.nueva);
router.get('/delete/:id', controller.delete);
router.post('/edit/:id', controller.edit);
router.post('/entregada', controller.entregada);



module.exports = router;
