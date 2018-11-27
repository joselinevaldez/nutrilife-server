var express = require('express');
var app=express();
var mdAutentication = require('../middlewares/autenticacion');
var Paciente = require('../models/paciente');
var Usuario = require('../models/usuario');
var Expediente = require('../models/expediente');
var Nutriologo = require('../models/nutriologo');
app.get('/',mdAutentication.verificaToken, (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Paciente.find({"nutriologo": req.usuario._id}, )
        .skip(desde)
        .limit(5)
        .populate({ path: 'expediente', model: Expediente })
        .populate({ path: 'usuario', model: Usuario })
       
        .exec(
            (err, pacientes) => {
             
            
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando pacientes',
                        errors: err
                    });
                }
               
                Paciente.count({"nutriologo": req.usuario._id}, (err, conteo) => {
                        ////
                    res.status(200).json({
                        ok: true,
                        pacientes: pacientes,
                        total: conteo
                    });

                })
            });
            
            



            
});

app.get('/id', (req, res, next) => {

    var id= req.query.id ;
    

    Paciente.find({"usuario": id}, )
    .populate({ path: 'expediente', model: Expediente })
            
        .exec(
            (err, pacientes) => {
             
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando pacientes',
                        errors: err
                    });
                }
               
                              ////
                    res.status(200).json({
                        ok: true,
                        pacientes: pacientes,
                        
                    });

                
});
            
            



            
});




app.get('/select',mdAutentication.verificaToken, (req, res, next) => {

   


    Paciente.find({"nutriologo": req.usuario._id},'_id nombre app apm' )
        .exec(
            (err, pacientes) => {
            Usuario.populate(pacientes, {path: "usuario"},function(err){
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando pacientes',
                        errors: err
                    });
                }

                Paciente.count({"nutriologo": req.usuario._id}, (err, conteo) => {
                        ////
                    res.status(200).json({
                        ok: true,
                        pacientes: pacientes,
                        total: conteo
                    });

                })
            });



            });
});

//CREAR NUEVO PAPCIENTE
app.post('/',mdAutentication.verificaToken,(req, res)=>{
    var body = req.body;
    var paciente = new Paciente({
        nombre: body.nombre,
        app: body.app,
        apm: body.apm,
        estadocivil:body.estadocivil,
        religion:body.religion,
        direccion:body.religion,
        fechanacimiento:body.fechanacimiento,
        motivo:body.motivo,
        recomendado:body.recomendado,
        quienrecomendo:body.quienrecomendo,
        medio:body.medio,
        sexo:body.sexo,
        telefono:body.telefono,
        celular: body.celular,
        estatus: body.estatus,
        fechaAlta:body.fechaAlta,
        fechaBaja:body.fechaBaja,
        usuario:body.usuario,
        nutriologo: req.usuario._id  
    });
    paciente.save(  (err, pacienteGuardado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear paciente',
                errors: err
            });
        }
        res.status(201).json({
            ok:true,
            paciente: pacienteGuardado
         
        });
    } );
   
});
//ACTUALIZAR PACIENTE
app.put('/:id',(req,res)=>{
    var id=req.params.id;
    var condicion=req.query.condicion | "";
    console.log(condicion);
    var body = req.body;
    Paciente.findById(id, (err,paciente)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al bucar paciente',
                errors:err
            });

        }
        if(!paciente){
            return res.status(400).json({
                ok:false,
                mensaje:'El paciente con el id '+id+' no existe',
                errors:err
            });
        }
        paciente.nombre= body.nombre;
        paciente.app= body.app;
        paciente.apm= body.apm;
        paciente.estadocivil=body.estadocivil;
        paciente.religion=body.religion;
        paciente.direccion=body.direccion;
        paciente.fechanacimiento=body.fechanacimiento;
        paciente.motivo=body.motivo;
        paciente.recomendado=body.recomendado;
        paciente.quienrecomendo=body.quienrecomendo;
        paciente.sexo=body.sexo;
        paciente.edad=body.edad;
        paciente.telefono=body.telefono;
        paciente.estatus=body.estatus;
        
        

        
        
        paciente.save((err, pacienteGuardado)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'Error al actualizar paciente',
                    errors: err
                });
            }
            res.status(200).json({
                ok:true,
                paciente: pacienteGuardado
            });

        });
    })

   

});
module.exports=app;