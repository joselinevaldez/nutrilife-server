var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var app=express();
var mdAutentication = require('../middlewares/autenticacion');
var Usuario = require('../models/usuario');
//comentario
app.get('/',mdAutentication.verificaToken,(req,res,next)=> {
    Usuario.find({}, (err,usuarios)=>{
        if(err){
            return res.status(500).json({
                ok:true,
                mensaje:'Error cargando usuarios',
                errors: err
            });
        }
        res.status(200).json({
            ok:true,
            usuarios: usuarios,
            usuariotoken: req.usuario
        });
    })
   
});
//CREAR NUEVO USUARIO
app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email:body.email,
        password: bcrypt.hashSync(body.password,10),
        img:body.img,
        role:body.role
    });
    usuario.save(  (err, usuarioGuardado)=>{
        if(err){
            return res.status(400).json({
                ok:true,
                mensaje:'Error al crear usuarios',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });
    } );
   
});

module.exports=app;