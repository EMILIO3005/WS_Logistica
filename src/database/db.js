const knex = require('knex');
const knexfile = require('../../knexfile');


//Seleccionamos el entorno (Desarrollo/Produccion)
const environment = process.env.NODE_ENV ||'development'
const configOptions = knexfile[environment];


//Creamos la instancia
const db = knex(configOptions);


//Exportarlo para poder usarlo en otro entorno
module.exports = db;