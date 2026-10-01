const db = require("../database/db");


const obtenerActivos = async(req, res) => {
  try {
    const activos = await db("activos").select("*");
      return res.status(200).json({success: true, data: activos})
    
  } catch (error) {
    console.error(`Error al leer los activos`, error);
    return res.status(500).json({success: false, message:'Error al obtener los activos'});
  }
};


const obtenerActivosPorId = async(req, res) => {
  try {
    const { id } = req.params;
    const activo = await db("activos").where({ id }).first();

    if (!activo) {
      return res.status(404).json({ success: false, message: "No existe este activo" });
    }

    return res.status(200).json({ success: true, data: activo });

  } catch (error) {
    console.error("No se pudo ejecutar la busqueda del activo", error);
    return res.status(500).json({ success: false, message: "Error interno en el servidor" });
  }
}


const crearActivos = async(req, res) => {
  try {
    const{ idcategoria, descripcion, fotografia, estado, precio } = req.body

    if (!idcategoria ||!descripcion ||!fotografia ||!estado ||!precio){
      return res.status(400).json({success: false, message: "Los campos idcategoria, descripcion, fotografia y precio son obligatorios"})
    }
    const [idGenerado] = await db("activos").insert({ 
      idcategoria, 
      descripcion, 
      fotografia, 
      estado: estado || 'Disponible', 
      precio })
    return res.status(200).json({
      success: true, 
      message: 'Activo creado correctamente', 
      data: {id: idGenerado}
    })

  } catch (error) {
    console.error("Error al crear activo: ", error)
    return res.status(500).json({success: false, message:"Error al crear la activo"})
    
  }
}
const actualizarActivos = async(req, res) => {
  try {
    const {id} = req.params;
    const {idcategoria, descripcion, fotografia, estado, precio} = req.body;

    if (!idcategoria ||!descripcion || !fotografia || !estado || !precio){
      return res.status(400).json({success: false, message:'Todos los campos son obligatorios'})
    }
    const filasAfectadas = await db("activos").where({id}).update({idcategoria, descripcion, fotografia, estado, precio})
    if (!filasAfectadas){
      return res.status(404).json({success:false, message:'el activo no existe'})
    }
    return res.status(200).json({success: true, message:'Categoria actualizada correctamente'})
    
  } catch (error) {
    console.log("Error al actualizar activo: ", error)
    return res.status(500).json({success: false, message: 'Error al actualizar la activo'})
  }
}
const eliminarActivos = async(req, res) => {
  try {
    const{ id } = req.params
    const filasAfectadas = await db("activos").where({id}).del()

    if (!filasAfectadas){
      return res.status(404).json({success: false, message: "No existe el activo"})
    }
    return res.status(200).json({success: true, message: 'activo Eliminada'})
    
  } catch (error) {
    console.error("Error al eliminar activo: ", error)
    return res.status(500).json({success: false, message:"Error al eliminar la categoria"})
    
  }
}



module.exports = {
  obtenerActivos,
  obtenerActivosPorId,
  crearActivos,
  actualizarActivos,
  eliminarActivos
}