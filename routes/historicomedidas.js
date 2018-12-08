var express = require('express');

var app=express();
var Medidas = require('../models/historicomedidas');
app.get('/',(req,res,next)=> {
    res.status(200).json({
        ok:true,
        mensaje:'Peticion realizada correctamente'
    });
});


app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var medida = new Medidas({
        abdomen: body. abdomen,
        cintura: body.cintura,
        peso: body.peso,
        estatura: body.estatura,
        grasacorporal: body.grasacorporal,
        grasaviceral: body.grasaviceral,
        cadera:body.cadera,
        muslo:body.muslo,
        brazo:body.brazo,
        gluteo:body.gluteo,     
        diagnosticoimc:body.diagnosticoimc,
        imc: body.imc,
        paciente:body.paciente,
        fecha:body.fecha,
        nutriologo: req.usuario._id  
    });
    medida.save(  (err, medidaGuardada)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al guardar medida',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
            medida: medidaGuardada
         
        });
    } );
   
});
module.exports=app;