
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    borrarCategoria,
} = require('../controllers/categorias.controller');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();

/**
 * {{url}}/api/categorias
 */

//~ Obtener todas las categorías - público
router.get('/', obtenerCategorias);

//~ Obtener una categoría por id - público
router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoriaPorId);

//~ Crear categoría - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//~ Actualizar - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], actualizarCategoria);

//~ Borrar una categoría - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], borrarCategoria);

module.exports = router; 
