//Acceso a la BD
//Anteriormente ...
//mysql_conect()
//poolConnection()
//Ahora: knex (responsabilidad conexion) : orm
const db= require("../database/db");
//const { param } = require("../routers/categoriaRoutes");


//Crear Metodos en JS
//No se define las rutas ni los vervos(GET,POST,PUT,DELETE)

//req (require)  : solicitud o pedido (input)
//res (result)   : resultado o respuesta (output)
const obtenerCategorias = async(req, res) => {
  try {
    //Consulta > ORM
    const categorias = await db("categorias").select("*");
    return res.status(200).json({
      success: true,
      data: categorias 
    })

  } catch (error) {
    console.error(`Error al leer categorias`, error);  //Desarrollador (test)
    return res
    .status(500)
    .json({success: false, message: 'Error al obtener categorias'})
  }
};

const obtenerCategoriasPorId = async(req, res) => {
  try {
    const {id} = req.params;
    const categoria = await db("categorias").where({ id }).first();

    if (!categoria){
      return res.status(404).json({success: false, message:"No existe esta categoria"});
    }

    return res.status(200).json({success: true, data: categoria})


  } catch (error) {
    console.log("No se pudo ejecutar la busqueda", error)
    return res.status(500).json({success:false, message: "Error interno en el servidor"})
  }
};

const crearCategoria = async(req, res) => {
  try {
    const{ categoria } = req.body

    if (!categoria){
      return res.status(400).json({success: false, message: "El campo categoria es obligatorio"})
    }
    const [ideGenerado] = await db("categorias").insert({ categoria })
    return res.status(200).json({
      success: true, 
      message: 'Categoria creada correctamente', 
      data: {id: ideGenerado}
    })

  } catch (error) {
    console.error("Error al crear categoria: ", error)
    return res.status(500).json({success: false, message:"Error al crear la categoria"})
    
  }
};

const actualizarCategoria = async(req, res) => {
  try {
    //Obtener la id de la url(parametro)
    const {id} = req.params;
    const {categoria} = req.body;
    //const {idcategoria, descripcion, fotografia....} = req.body

    if (!categoria){
      return res.status(400).json({success: false, message:'El categoria es obligatorio'})
    }

    const filasAfectadas = await db("categorias").where({id}).update({categoria})

    if (!filasAfectadas){
      return res.status(404).json({success:false, message:'La categoria no existe'})
    }
    return res.status(200).json({success: true, message:'Categoria actualizada correctamente'})
    
  } catch (error) {
    console.log("Error al actualizar categoria: ", error)
    return res.status(500).json({success: false, message: 'Error al actualizar la categoria'})
  }
};

const eliminarCategoria = async(req, res) => {
  try {
    const{ id } = req.params
    const filasAfectadas = await db("categorias").where({id}).del()

    if (!filasAfectadas){
      return res.status(404).json({success: false, message: "No existe la categoria"})
    }
    return res.status(200).json({success: true, message: 'Categoria Eliminada'})
    
  } catch (error) {
    console.error("Error al eliminar categoria: ", error)
    return res.status(500).json({success: false, message:"Error al eliminar la categoria"})
    
  }
};

//Estas acciones deben ser de utilidad (necesaria) para las rutas
module.exports = {
  obtenerCategorias,
  obtenerCategoriasPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
}


