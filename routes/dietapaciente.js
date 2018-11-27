




var express = require('express');
var Dietapaciente = require('../models/dietapaciente');
var mdAutentication = require('../middlewares/autenticacion');
var app=express();

app.get('/:paciente',(req,res,next)=> {
    var paciente=req.params.paciente;
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Dietapaciente.find({"paciente": paciente}, )
       .sort({fecha: 'descending'})
       .populate('dieta')
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

           Dietapaciente.count({"paciente": paciente}, (err, conteo) => {
                    ////
                res.status(200).json({
                    ok: true,
                    dieta: dietas,
                    total: conteo
                });

            })
        



        });
});
app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var dietapaciente = new Dietapaciente({
        paciente: body.paciente,
        dieta: body.dieta,
        recomendaciones: body.recomendaciones,
        fecha:body.fecha,
        nutriologo: req.usuario._id 

        
    });
    ////////////////////
    dietapaciente.save(  (err, dietapacienteGuardada)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al asignar dieta',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
            dieta: dietapacienteGuardada
         
        });
    } );
    
});

module.exports=app;