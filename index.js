const express = require('express')
require("dotenv").config()


const app = express()
const PORT = process.env.PORT ||3000

//Middleware ya que la comunicacion se hace por JSON
app.use(express.json())

//Importamos las rutas de las categorias
const categoriaRoutes = require('./src/routers/categoriaRoutes')
const activoRouters = require('./src/routers/activoRouters')
//Implementar rutas
app.use('/api/categorias', categoriaRoutes)
app.use('/api/activos', activoRouters)

app.get("/", (req, res) => {
  res.send("API de logistica funcionando correctamente")
})

//Iniciamos el servidor
app.listen(PORT, () => {
  console.log("Servidor iniciado en http://localhost:3000")
})