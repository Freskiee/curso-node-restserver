
const { Categoria, Usuario, Producto } = require('../models');
const Role = require('../models/role');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    };
};

const emailExiste = async (correo = '') => {
    //! Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado en la BD.`);
    };
};

const existeUsuarioPorId = async (id = '') => {
    //! Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id}, NO existe.`);
    };
};

/**
 * Categorias
 */
const existeCategoriaPorId = async (id = '') => {
    //! Verificar si la categoria existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoria con id: ${id}, NO existe.`);
    };
};

/**
 * Productos
 */
const existeProductoPorId = async (id = '') => {
    //! Verificar si el producto existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El producto con id: ${id}, NO existe.`);
    };
};

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida - ${colecciones}`)
    };
    return true;

};

module.exports = {
    coleccionesPermitidas,
    emailExiste,
    esRoleValido,
    existeCategoriaPorId,
    existeProductoPorId,
    existeUsuarioPorId,
};
