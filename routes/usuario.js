var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var app=express();
var mdAutentication = require('../middlewares/autenticacion');
var Usuario = require('../models/usuario');
var Paciente = require('../models/paciente');
var Nutriologo = require('../models/nutriologo');

//comentario
app.put('/:id', mdAutentication.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }


        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});




///
app.get('/',mdAutentication.verificaToken,(req,res,next)=> {
    var id = req.query.id;
    Usuario.find({"usuario":id}, (err,usuarios)=>{
        if(err){
            return res.status(500).json({
                ok:true,
                mensaje:'Error cargando usuarios',
                errors: err
            });
        }
        res.status(200).json({
            ok:true,
            usuarios: req.usuario
          
        });
    })
   
});
//CREAR NUEVO USUARIO
app.post('/',(req, res)=>{
    var body = req.body;
   
    var usuario = new Usuario({
        nombre: body.nombre,
        email:body.email,
        password: bcrypt.hashSync(body.password,10),
        img:body.img,
        role:body.role
    });
    usuario.save(  (err, usuarioGuardado)=>{
        if(err){
            return res.status(400).json({
                ok:true,
                mensaje:'Error al crear usuarios',
                errors: err
            });
        }
        if(body.role==='PACIENTE_ROLE'){
            var paciente = new Paciente({
                nombre: body.nombre,
                app: body.app,
                apm: body.apm,
                estadocivil:body.estadocivil,
                religion:body.religion,
                direccion:body.direccion,
                fechanacimiento:body.fechanacimiento,
                motivo:body.motivo,
                recomendado:body.recomendado,
                medio:body.medio,
                quienrecomendo:body.quienrecomendo,
                sexo:body.sexo,
                telefono:body.telefono,
                edad: body.edad,
                estatus: body.estatus,
                fechaAlta:body.fechaAlta,
                fechaBaja:body.fechaBaja,
                expediente:body.expediente,
                usuario:usuarioGuardado._id,
                nutriologo: body.nutriologo 
            });
            paciente.save(  (err, pacienteGuardado)=>{
                if(err){
                    return res.status(400).json({
                        ok:true,
                        mensaje:'Error al crear paciente',
                        errors: err
                    });
                }
                res.status(201).json({
                    ok:true,
                    paciente: pacienteGuardado,
                    usuario:usuarioGuardado
                 
                });
            } );
           
        }else{
            //GUARDA NUTRIOLOGO
            var nutriologo = new Nutriologo({
                nombreconsultorio:null,
                direccion: null,
                telefono:null,
                horario:null,
                nutriologo: usuarioGuardado._id
            });
            nutriologo.save(  (err, nutriologoGuardado)=>{
                if(err){
                    return res.status(400).json({
                        ok:true,
                        mensaje:'Error al crear nutriologo',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok:true,
                    nutriologo: nutriologoGuardado,
                    usuario: usuarioGuardado
                 
                });
            } );
           /*guardarNutriologo(usuarioGuardado._id);          
            res.status(201).json({
            ok:true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
            });*/
           
    }
    } );
   
});
///ACTUALIZAR USUARIO


module.exports=app;