const express = require('express')
const path = require('path')
require("dotenv").config()


const app = express()
const PORT = process.env.PORT ||3000

//Middleware ya que la comunicacion se hace por JSON
app.use(express.json())
app.use(express.static(path.join(__dirname, 'src', 'public')))

//Importamos las rutas de las categorias
const categoriaRoutes = require('./src/routers/categoriaRoutes')
const activoRouters = require('./src/routers/activoRouters')
//Implementar rutas
app.use('/api/categorias', categoriaRoutes)
app.use('/api/activos', activoRouters)

//Iniciamos el servidor
app.listen(PORT, () => {
  console.log("Servidor iniciado en http://localhost:3000")
})