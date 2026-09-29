const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.criar);
router.get('/', pedidoController.listarTodos);
router.get('/:id', pedidoController.buscarPorId);
router.patch('/:id/status', pedidoController.atualizarStatus);
router.delete('/:id', pedidoController.deletar);

module.exports = router;