var express = require('express');
var app=express();
var mdAutentication = require('../middlewares/autenticacion');
var Expediente = require('../models/expediente');



app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var expediente = new Expediente({
        exploracion: body.exploracion,
        cirugias: body.cirugias,
        antecedentes:body.antecedentes ,
        problemas:body.problemas ,

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
        dietaA:body.dietaA,
        recomendaciones: body.recomendaciones,
        nutriologo: req.usuario._id  
    });
    expediente.save(  (err, expedienteGuardado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear expediente',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
            expediente: expedienteGuardado
         
        });
    } );
   
});
app.put('/:id',(req,res)=>{
    var id=req.params.id;
    var body = req.body;
    Expediente.findById(id, (err,expediente)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar expediente',
                errors:err
            });

        }
        if(!expediente){
            return res.status(400).json({
                ok:false,
                mensaje:'El expediente con el id '+id+' no existe',
                errors:err
            });
        }
        expediente.exploracion= body.exploracion,
        expediente.cirugias= body.cirugias,
        expediente.antecedentes=body.antecedentes ,
        expediente.problemas=  body.problemas,
       
        expediente.abdomen= body. abdomen,
        expediente.cintura= body.cintura,
        expediente.peso= body.peso,
        expediente.estatura= body.estatura,
        expediente.brazo= body.brazo,
        expediente.gluteo=body.gluteo,
        expediente.cadera=body.cadera,
        expediente.grasacorporal= body.grasacorporal,
        expediente.grasaviceral= body.grasaviceral,
    

       
        expediente.imc= body.imc,
       expediente.diagnosticoimc=body.diagnosticoimc
        expediente.save((err, expedienteActualizado)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'Error al actualizar expediente',
                    errors: err
                });
            }
            res.status(200).json({
                ok:true,
                expediente: expedienteActualizado
            });

        });
    })

   

});

app.put('/dieta/:id/:dieta',(req,res)=>{
    var id=req.params.id;
    var dietaA=req.params.dieta;
    var body = req.body;
    Expediente.findById(id, (err,expediente)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar expediente',
                errors:err
            });

        }
        if(!expediente){
            return res.status(400).json({
                ok:false,
                mensaje:'El expediente con el id '+id+' no existe',
                errors:err
            });
        }
       
        
        expediente.dietaA= dietaA,
      
        expediente.save((err, expedienteActualizado)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'Error al actualizar expediente',
                    errors: err
                });
            }
            res.status(200).json({
                ok:true,
                expediente: expedienteActualizado
            });

        });
    })

   

});
module.exports=app;