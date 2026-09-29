const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController'); // <-- Tem que ser produtoController!

router.post('/', produtoController.criar);
router.get('/', produtoController.listarTodos);
router.get('/:id', produtoController.buscarPorId);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

module.exports = router;