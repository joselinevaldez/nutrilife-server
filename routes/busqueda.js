var express = require('express');
var mdAutentication = require('../middlewares/autenticacion');
var app=express();
var Paciente = require('../models/paciente');
var Alimento = require('../models/alimento');
var Platillo = require('../models/platillo');
var Dieta = require('../models/dieta');

app.get('/coleccion/:tabla/:busqueda',mdAutentication.verificaToken, (req, res) => {
    var nutriologo =req.usuario._id;
    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'pacientes':
            promesa = buscarPacientes(busqueda, regex,nutriologo);
            break;
        case 'alimentos':
            promesa = buscarAlimentos(busqueda, regex,nutriologo);
            break;
        case 'alimentoscategoria':
            promesa = buscarAlimentosCategoria(busqueda, regex,categoria,nutriologo);
            break;
        case 'platillos':
            promesa = buscarPlatillos(busqueda, regex,nutriologo);
            break;
        case 'dietas':
            promesa = buscarDietas(busqueda, regex,nutriologo);
            break;
       

        

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: pacientes,nutriologos,citas,platillos,alimentos y dietas',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});
function buscarPacientes(busqueda, regex,nutriologo) {

    return new Promise((resolve, reject) => {

        Paciente.find({"nutriologo":nutriologo } )
           // .find({"estatus": estatus})
            .or([{ 'nombre': regex }, { 'app': regex }, { 'apm': regex }])
            .populate('expediente')
            .populate('usuario')
         
            .exec((err, pacientes) => {

                if (err) {
                    reject('Erro al cargar pacientes', err);
                } else {
                    resolve(pacientes);
                }


            })


    });
}


function buscarAlimentos(busqueda, regex,nutriologo) {
    
       return new Promise((resolve, reject) => {
   
           Alimento.find({"nutriologo":nutriologo } )
              // .find({"estatus": estatus})
               .or([{ 'nombre': regex }, { 'grupo': regex }])
                         
               .exec((err, alimentos) => {
   
                   if (err) {
                       reject('Error al cargar alimento', err);
                   } else {
                       resolve(alimentos);
                   }
   
   
               })
   
   
       });
   }
function buscarAlimentosCategoria(busqueda, regex,categoria,nutriologo) {
    
    return new Promise((resolve, reject) => {

        Alimento.find({"nutriologo":nutriologo ,"grupo":categoria} )
           // .find({"estatus": estatus})
            .or([{ 'nombre': regex }, { 'grupo': regex }])
                      
            .exec((err, alimentos) => {

                if (err) {
                    reject('Error al cargar alimento', err);
                } else {
                    resolve(alimentos);
                }


            })


    });
}
function buscarPlatillos(busqueda, regex,nutriologo) {

    return new Promise((resolve, reject) => {

        Platillo.find({"nutriologo":nutriologo } )
           // .find({"estatus": estatus})
            .or([{ 'nombre': regex }, { 'tiempocomida': regex }])
                   
            .exec((err, platillos) => {

                if (err) {
                    reject('Erro al cargar platillos', err);
                } else {
                    resolve(platillos);
                }


            })


    });
}
function buscarDietas(busqueda, regex,nutriologo) {

    return new Promise((resolve, reject) => {

        Dieta.find({"nutriologo":nutriologo } )
           // .find({"estatus": estatus})
            .or([{ 'nombre': regex }, { 'tipopersona': regex }])
                   
            .exec((err, dietas) => {

                if (err) {
                    reject('Erro al cargar dietas', err);
                } else {
                    resolve(dietas);
                }


            })


    });
}
module.exports=app;