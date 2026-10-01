const express = require('express')
const router = express.Router()
const activoController = require('../controllers/activoController')

// Aquí ya llamamos correctamente al método de tu controlador:
router.get('/', activoController.obtenerActivos);
router.get('/:id', activoController.obtenerActivosPorId);
router.post('/', activoController.crearActivos);
router.put('/:id', activoController.actualizarActivos);
router.delete('/:id', activoController.eliminarActivos);
module.exports = router;

