//Requires importacion de librerias
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require ('body-parser');
//Inicializar variables
var app = express();
//cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","POST,GET,PUT,DELETE, OPTIONS");
  
    next();
  });
  
//Body Parser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
//IMPORTAR RUTAS
var appRoutes= require('./routes/app');
var usuarioRoutes= require('./routes/usuario');
var loginRoutes= require('./routes/login');
var pacienteRoutes= require('./routes/paciente');
var busquedaRoutes= require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');
var nutriologoRoutes = require('./routes/nutriologo');
var citasRoutes = require('./routes/cita');
var expedientesRoutes = require('./routes/expediente');
var conteoRoutes = require('./routes/conteo');
var alimentosRoutes = require('./routes/alimento');
var platilloRoutes = require('./routes/platillo');
var alimentospRoutes = require('./routes/alimentosp');
var dietasRoutes = require('./routes/dieta');
var dietapacienteRoutes = require('./routes/dietapaciente');
//conexion base de datos
//mongoose.connection.openUri('mongodb://localhost:27017/nutrilife',(err,res)=>{
    mongoose.connection.openUri('mongodb://joseline:joseline04@ds151927.mlab.com:51927/nutrilife',(err,res)=>{
    
    if (err) throw err;
    console.log('base de datos  \x1b[32m%s\x1b[0m',' online');
});
//RUTAS
app.use('/paciente',pacienteRoutes);
app.use('/login',loginRoutes);
app.use('/usuario',usuarioRoutes);
app.use('/busqueda',busquedaRoutes);
app.use('/upload',uploadRoutes);
app.use('/img',imagenesRoutes);
app.use('/nutriologo',nutriologoRoutes);
app.use('/citas',citasRoutes);
app.use('/expediente',expedientesRoutes);
app.use('/conteo',conteoRoutes);
app.use('/alimentos',alimentosRoutes);
app.use('/platillo',platilloRoutes);
app.use('/alimentosp',alimentospRoutes);
app.use('/dietas',dietasRoutes);
app.use('/dietapaciente',dietapacienteRoutes);
app.use('/',appRoutes);

//Escuchar peticiones

app.listen(3000,()=>{
    console.log('express server puerto 3000: \x1b[32m%s\x1b[0m',' online');
})