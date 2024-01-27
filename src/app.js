const express= require('express');
const config =require('./config');
const morgan = require('morgan');

 
const usuarios= require('./modulos/usuarios/rutas.js');
const users = require('./modulos/Users/rutas.js');
const error  = require('./red/errors');



const app =express();
//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

 //configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/usuarios', usuarios)
app.use('/api/users', users)
app.use(error);
module.exports = app;
