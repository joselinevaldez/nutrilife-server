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

        abdomenA: body. abdomenA,
        cinturaA: body.cinturaA,
        pesoA: body.pesoA,
        grasacorporalA: body.grasacorporalA,
        grasaviceralA: body.grasaviceralA,

        abdomenB: body. abdomenB,
        cinturaB: body.cinturaB,
        pesoB: body.pesoB,
        grasacorporalB: body.grasacorporalB,
        grasaviceralB: body.grasaviceralB,

        diagnostico:body.diagnostico,
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
        expediente.grasacorporal= body.grasacorporal,
        expediente.grasaviceral= body.grasaviceral,

        expediente.abdomenA= body. abdomenA,
        expediente.cinturaA= body.cinturaA,
        expediente.pesoA= body.pesoA,
        expediente.grasacorporalA= body.grasacorporalA,
        expediente.grasaviceralA= body.grasaviceralA,

        expediente.abdomenB= body. abdomenB,
        expediente.cinturaB= body.cinturaB,
        expediente.pesoB= body.pesoB,
        expediente.grasacorporalB= body.grasacorporalB,
        expediente.grasaviceralB= body.grasaviceralB,

        expediente.imc= body.imc,
       expediente.diagnostico=body.diagnostico,
       expediente.recomendaciones=body.recomendaciones
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