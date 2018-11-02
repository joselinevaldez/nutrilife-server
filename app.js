//Requires importacion de librerias
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require ('body-parser');
//Inicializar variables
var app = express();
//Body Parser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
//IMPORTAR RUTAS
var appRoutes= require('./routes/app');
var usuarioRoutes= require('./routes/usuario');
var loginRoutes= require('./routes/login');
//conexion base de datos
mongoose.connection.openUri('mongodb://localhost:27017/nutrilife',(err,res)=>{
    if (err) throw err;
    console.log('base de datos  \x1b[32m%s\x1b[0m',' online');
});
//RUTAS
app.use('/login',loginRoutes);
app.use('/usuario',usuarioRoutes);
app.use('/',appRoutes);

//Escuchar peticiones

app.listen(3000,()=>{
    console.log('express server puerto 3000: \x1b[32m%s\x1b[0m',' online');
})