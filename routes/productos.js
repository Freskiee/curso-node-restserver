

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearProducto,
        obtenerProductos,
        obtenerProductoPorId,
        actualizarProducto,
        borrarProducto,
} = require('../controllers/productos.controller');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//~ Obtener todos los productos - público
router.get('/', obtenerProductos);

//~ Obtener un producto por id - público
router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProductoPorId);

//~ Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//~ Actualizar - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], actualizarProducto);

//~ Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], borrarProducto);

module.exports = router; 
