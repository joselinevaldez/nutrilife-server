var express = require('express');
var app=express();
var mdAutentication = require('../middlewares/autenticacion');
var Nutriologo = require('../models/nutriologo');
var Usuario = require('../models/usuario');
//Actualizar
app.put('/:id', mdAutentication.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Nutriologo.findById(id, (err, nutriologo) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar nutriologo',
                errors: err
            });
        }

        if (!nutriologo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El nutriologo con el id ' + id + ' no existe',
                errors: { message: 'No existe un nutriologo con ese ID' }
            });
        }

        nutriologo.direccion=body.direccion;
        nutriologo.nombreconsultorio=body.nombreconsultorio;
        nutriologo.telefono=body.telefono;
        nutriologo.horario=body.horario;

        nutriologo.save((err, nutriologoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar nutriologo',
                    errors: err
                });
            }

            

            res.status(200).json({
                ok: true,
                nutriologo: nutriologoGuardado
            });

        });

    });

});

app.get('/:id', (req, res, next) => {

    var id= req.params.id ;
    

    Nutriologo.find({"nutriologo": id}, )
    .populate({ path: 'nutriologo', model: Usuario })
            
        .exec(
            (err, nutriologos) => {
             
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando nutriologos',
                        errors: err
                    });
                }
               
                              ////
                    res.status(200).json({
                        ok: true,
                        nutriologos: nutriologos,
                        
                    });

                
});
            
            



            
});
module.exports=app;