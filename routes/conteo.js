
var express = require('express');
var app=express();
var mdAutentication = require('../middlewares/autenticacion');
var Paciente = require('../models/paciente');
var Alimento = require('../models/alimento');
var Platillo = require('../models/platillo');
var Dieta = require('../models/dieta');
app.get('/pacientes',mdAutentication.verificaToken, (req, res, next) => {
  
                    
                Paciente.count({"nutriologo": req.usuario._id}, (err, conteo) => {
                        ////
                    res.status(200).json({
                        ok: true,
                        total: conteo
                    });

                })
            });
app.get('/alimentos',mdAutentication.verificaToken, (req, res, next) => {

                    
        Alimento.count({"nutriologo": req.usuario._id}, (err, conteo) => {
                        ////
            res.status(200).json({
                ok: true,
                total: conteo
             });

              })
 });
 app.get('/platillos',mdAutentication.verificaToken, (req, res, next) => {

                    
    Platillo.count({"nutriologo": req.usuario._id}, (err, conteo) => {
                    ////
        res.status(200).json({
            ok: true,
            total: conteo
         });

          })
});           
app.get('/dietas',mdAutentication.verificaToken, (req, res, next) => {

                    
    Dieta.count({"nutriologo": req.usuario._id}, (err, conteo) => {
                    ////
        res.status(200).json({
            ok: true,
            total: conteo
         });

          })
});           
            



            

module.exports=app;