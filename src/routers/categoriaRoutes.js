const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categoriaController')


//Endpoint
router.get('/', categoriaController.obtenerCategorias);
router.post('/', categoriaController.crearCategoria);
router.get('/:id', categoriaController.obtenerCategoriasPorId);
router.put('/:id', categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);
module.exports = router;