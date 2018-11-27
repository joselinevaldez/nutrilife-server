var express = require('express');
var mdAutentication = require('../middlewares/autenticacion');
var Alimentos = require('../models/alimento');
var app=express();

app.get('/',mdAutentication.verificaToken,(req,res,next)=> {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Alimentos.find({"nutriologo": req.usuario._id}, )
       .skip(desde)
       .limit(5)
       .exec(
        (err, alimentos) => {
       
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando alimentos',
                    errors: err
                });
            }

            Alimentos.count({"nutriologo": req.usuario._id}, (err, conteo) => {
                    ////
                res.status(200).json({
                    ok: true,
                    alimentos: alimentos,
                    total: conteo
                });

            })
        



        });
});
app.get('/:grupo',mdAutentication.verificaToken,(req,res,next)=> {
   
    var grupo=req.params.grupo;
     Alimentos.find({"nutriologo": req.usuario._id , "grupo":grupo}, )
       .exec(
        (err, alimentos) => {
       
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando alimentos',
                    errors: err
                });
            }

           
                    ////
                res.status(200).json({
                    ok: true,
                    alimentos: alimentos
                   
                });

            
        



        });
});
app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var alimento = new Alimentos({
        nombre: body.nombre,
        grupo: body.grupo,
        cantidad: body.cantidad,
        unidad: body.unidad,
        peso: body.peso,
        calorias: body.calorias,
        proteina: body.proteinas,
        fibra: body.fibras,
        grasa: body.grasas,
        estatus: body.estatus,
        nutriologo: req.usuario._id 

        
    });
    ////////////////////
    alimento.save(  (err, alimentoGuardado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear alimento',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
            alimento: alimentoGuardado
         
        });
    } );
    //console.log(citas);
});
app.put('/:id',(req,res)=>{
    var id=req.params.id;
    var body = req.body;
    Alimentos.findById(id, (err,alimento)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar alimento',
                errors:err
            });

        }
        if(!alimento){
            return res.status(400).json({
                ok:false,
                mensaje:'el alimento con el id '+id+' no existe',
                errors:err
            });
        }
        alimento.nombre= body.nombre,
        alimento.grupo= body.grupo,
        alimento.cantidad= body.cantidad,
        alimento.unidad= body.unidad,
        alimento.peso= body.peso,
        alimento.calorias= body.calorias,
        alimento.proteina= body.proteinas,
        alimento.fibra= body.fibras,
        alimento.grasa= body.grasas,
        alimento.estatus= body.estatus,
       
        
        alimento.save((err, alimentoGuardado)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'Error al actualizar el alimento',
                    errors: err
                });
            }
            res.status(200).json({
                ok:true,
                alimento: alimentoGuardado
            });

        });
    })

   

});
module.exports=app;