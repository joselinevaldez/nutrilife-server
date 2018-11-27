var express = require('express');
var mdAutentication = require('../middlewares/autenticacion');
var app=express();
var Dieta=require('../models/dieta');
app.get('/',mdAutentication.verificaToken,(req,res,next)=> {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Dieta.find({"nutriologo": req.usuario._id}, )
       .skip(desde)
       .limit(5)
       .exec(
        (err, dietas) => {
       
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando dietas',
                    errors: err
                });
            }

           Dieta.count({"nutriologo": req.usuario._id}, (err, conteo) => {
                    ////
                res.status(200).json({
                    ok: true,
                    dieta: dietas,
                    total: conteo
                });

            })
        



        });
});
app.get('/select',mdAutentication.verificaToken,(req,res,next)=> {
   
    Dieta.find({"nutriologo": req.usuario._id}, )
      
       .exec(
        (err, dietas) => {
       
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando dietas',
                    errors: err
                });
            }

          
                    ////
                res.status(200).json({
                    ok: true,
                    dieta: dietas,
                    
                });

           
        



        });
});

app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var dieta = new Dieta({
        dias:{
            lunes:{
                    desayunoL: body.desayunoL,
                    comidaL:body.comidaL,
                    cenaL:body.cenaL
            },
            martes:{
                    desayunoM:body.desayunoM,
                    comidaM:body.comidaM,
                    cenaM:body.cenaM
            },
            miercoles:{
                    desayunoMI:body.desayunoMI,
                    comidaMI:body.comidaMI,
                    cenaMI:body.cenaMI
            },
            jueves:{
                    desayunoJ:body.desayunoJ,
                    comidaJ:body.comidaJ,
                    cenaJ:body.cenaJ
            },
            viernes:{
                    desayunoV:body.desayunoV,
                    comidaV:body.comidaV,
                    cenaV:body.cenaV
            },
            sabado:{
                    desayunoS:body.desayunoS,
                    comidaS:body.comidaS,
                    cenaS:body.cenaS
            },
            domingo:{
                desayunoD:body.desayunoD,
                comidaD:body.comidaD,
                cenaD:body.cenaD
            }
        },
        nombre: body.nombre,
        tipopersona: body.tipopersona,
        nutriologo:req.usuario._id 

        
    });
    ////////////////////
    dieta.save(  (err, dietaGuardada)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear dieta',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
           dieta: dietaGuardada
         
        });
    } );
    console.log(dieta);
});

app.put('/alta/:id',(req,res)=>{
    var id=req.params.id;
       Dieta.findById(id, (err,dieta)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar dieta',
                errors:err
            });

        }
        if(!dieta){
            return res.status(400).json({
                ok:false,
                mensaje:'la dieta con el id '+id+' no existe',
                errors:err
            });
        }
        
        dieta.estatus="1";
      
        
        dieta.save((err, dietaGuardada)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'Error al actualizar dieta',
                    errors: err
                });
            }
            res.status(200).json({
                ok:true,
                dieta: dietaGuardada
            });

        });
    })

   

});
app.put('/baja/:id',(req,res)=>{
    var id=req.params.id;
       Dieta.findById(id, (err,dieta)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar dieta',
                errors:err
            });

        }
        if(!dieta){
            return res.status(400).json({
                ok:false,
                mensaje:'la dieta con el id '+id+' no existe',
                errors:err
            });
        }
        
        dieta.estatus="0";
      
        
        dieta.save((err, dietaGuardada)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'Error al actualizar dieta',
                    errors: err
                });
            }
            res.status(200).json({
                ok:true,
                dieta: dietaGuardada
            });

        });
    })

   

});

module.exports=app;