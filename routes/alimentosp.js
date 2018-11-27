var express = require('express');
var mdAutentication = require('../middlewares/autenticacion');
var Alimentosp = require('../models/alimentosp');
var app=express();

app.get('/',mdAutentication.verificaToken, (req, res, next) => {

    var platillo = req.query.platillo
    

    Alimentosp.find({"platillo": platillo}, )
        
                    
        .exec(
            (err, alimentosp) => {
             
            
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
                        alimentosp: alimentosp
                        
                    });

                
            });
            
            



            
});

app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var alimentosp = new Alimentosp({
        platillo: body.platillo,
        alimento: body.alimento,
        nombre: body.nombre,
        cantidad: body.cantidad,
        unidad:body.unidad

        
    });
    ////////////////////
    alimentosp.save(  (err, alimentospGuardado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear platillo',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
            alimentosp: alimentospGuardado
         
        });
    } );
    
});
module.exports=app;