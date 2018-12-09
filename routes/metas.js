var express = require('express');
var mdAutentication = require('../middlewares/autenticacion');
var app=express();
var Meta = require('../models/metas');
app.get('/:id',mdAutentication.verificaToken, (req, res, next) => {
    var id = req.params.id;
    Meta.findOne({"paciente": id}, )
        
        
        .exec(
            (err, metas) => {
             
            
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando metas',
                        errors: err
                    });
                }
               
                     res.status(200).json({
                        ok: true,
                        metas: metas
                        
                    });

                
            });
            
            



            
});
app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var meta = new Meta({
        abdomen: body.abdomen,
        abdomenmeta:body.abdomenmeta,
        abdomencm:body.abdomencm,

        cintura: body.cintura,
        cinturameta:body.cinturameta,
        cinturacm:body.cinturacm,

        peso: body.peso,
        pesometa:body.pesometa,
        pesokg:body.pesokg,
        
        brazo:body.brazo,
        brazometa:body.brazometa,
        brazocm:body.brazocm,

        gluteo:body.gluteo, 
        gluteometa:body.gluteometa,
        gluteocm:body.gluteocm,    
        
        paciente:body.paciente,
       
        nutriologo: req.usuario._id  
    });
    meta.save(  (err, metaGuardada)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al guardar meta',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
            meta: metaGuardada
         
        });
    } );
   
});
module.exports=app;