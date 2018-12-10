var express = require('express');
var Citas = require('../models/citas');
var Paciente = require('../models/paciente');
var mdAutentication = require('../middlewares/autenticacion');
var app=express();

app.get('/nutriologo',mdAutentication.verificaToken,(req,res,next)=> {
    Citas.find({"nutriologo": req.usuario._id}, )
       .exec(
        (err, citas) => {
       
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando citas',
                    errors: err
                });
            }

            Citas.count({}, (err, conteo) => {
                    ////
                res.status(200).json({
                    ok: true,
                    citas: citas,
                    total: conteo
                });

            })
        



        });
});
app.get('/nutriologo/lista',mdAutentication.verificaToken,(req,res,next)=> {
    Citas.find({"nutriologo": req.usuario._id}, )
    .populate("paciente")   
    .exec(
        (err, citas) => {
       
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando citas',
                    errors: err
                });
            }

            Citas.count({}, (err, conteo) => {
                    ////
                res.status(200).json({
                    ok: true,
                    citas: citas,
                    total: conteo
                });

            })
        



        });
});
app.get('/paciente',(req,res,next)=> {
    var id = req.query.id
    Citas.find({"paciente": id}, )
       .exec(
        (err, citas) => {
        Paciente.populate(citas, {path: "paciente"},function(err){
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando citas',
                    errors: err
                });
            }

            Citas.count({}, (err, conteo) => {
                    ////
                res.status(200).json({
                    ok: true,
                    citas: citas,
                    total: conteo
                });

            })
        });



        });
});

app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var citas = new Citas({
        title: body.title,
        start: body.start,
        time: body.time,
        end: body.end,
        color: body.color,
        estatus: body.estatus,
        paciente: body.paciente,
        nutriologo: req.usuario._id 

        
    });
    ////////////////////
    citas.save(  (err, citaGuardada)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear cita',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
            cita: citaGuardada
         
        });
    } );
    console.log(citas);
});
app.put('/:id',(req,res)=>{
    var id=req.params.id;
    var body = req.body;
    Citas.findById(id, (err,cita)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar cita',
                errors:err
            });

        }
        if(!cita){
            return res.status(400).json({
                ok:false,
                mensaje:'la cita con el id '+id+' no existe',
                errors:err
            });
        }
        cita.title=body.title;
        cita.start=body.start;
        cita.time=body.time;
        cita.paciente=body.paciente;
        cita.estatus=body.estatus;
        cita.color=body.color; 
        
        cita.save((err, citaGuardada)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'Error al actualizar la cita',
                    errors: err
                });
            }
            res.status(200).json({
                ok:true,
                cita: citaGuardada
            });

        });
    })

   

});
module.exports=app;