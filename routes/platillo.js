var express = require('express');
var mdAutentication = require('../middlewares/autenticacion');
var Platillo = require('../models/platillo');
var app=express();

app.get('/',mdAutentication.verificaToken, (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Platillo.find({"nutriologo": req.usuario._id}, )
        .skip(desde)
        .limit(5)
                    
        .exec(
            (err, platillos) => {
             
            
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando platillo',
                        errors: err
                    });
                }
               
                Platillo.count({"nutriologo": req.usuario._id}, (err, conteo) => {
                        ////
                    res.status(200).json({
                        ok: true,
                        platillos: platillos,
                        total: conteo
                    });

                })
            });
            
            



            
});
app.get('/select',mdAutentication.verificaToken, (req, res, next) => {

    

    Platillo.find({"nutriologo": req.usuario._id,"estatus":'1'} )
        
                    
        .exec(
            (err, platillos) => {
             
            
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando platillo',
                        errors: err
                    });
                }
               
                         ////
                    res.status(200).json({
                        ok: true,
                        platillos: platillos

                        
                    });

                
            });
            
            



            
});
app.get('/paciente/:id', (req, res, next) => {

    var nutriologo=req.params.id;

    Platillo.find({"nutriologo": nutriologo,"estatus":'1'} )
        
                    
        .exec(
            (err, platillos) => {
             
            
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando platillo',
                        errors: err
                    });
                }
               
                         ////
                    res.status(200).json({
                        ok: true,
                        platillos: platillos

                        
                    });

                
            });
            
            



            
});
app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var platillo = new Platillo({
        nombre: body.nombre,
        tiempocomida: body.tiempocomida,
        estatus: body.estatus,
        nutriologo: req.usuario._id 

        
    });
    ////////////////////
    platillo.save(  (err, platilloGuardado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear platillo',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
            platillo: platilloGuardado
         
        });
    } );
    
});

app.put('/alta/:id',(req,res)=>{
    var id=req.params.id;
       Platillo.findById(id, (err,platillo)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar platillo',
                errors:err
            });

        }
        if(!platillo){
            return res.status(400).json({
                ok:false,
                mensaje:'el con el id '+id+' no existe',
                errors:err
            });
        }
        
        platillo.estatus="1";
      
        
        platillo.save((err, platilloGuardado)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'Error al actualizar el platillo',
                    errors: err
                });
            }
            res.status(200).json({
                ok:true,
                platillo: platilloGuardado
            });

        });
    })

   

});
app.put('/baja/:id',(req,res)=>{
    var id=req.params.id;
       Platillo.findById(id, (err,platillo)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar platillo',
                errors:err
            });

        }
        if(!platillo){
            return res.status(400).json({
                ok:false,
                mensaje:'el con el id '+id+' no existe',
                errors:err
            });
        }
        
        platillo.estatus="0";
      
        
        platillo.save((err, platilloGuardado)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'Error al actualizar el platillo',
                    errors: err
                });
            }
            res.status(200).json({
                ok:true,
                platillos: platilloGuardado
            });

        });
    })

   

});
module.exports=app;