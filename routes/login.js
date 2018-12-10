var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var mdAutenticacion = require('../middlewares/autenticacion');
var app=express();
var Usuario = require('../models/usuario');
var Nutriologo = require('../models/nutriologo');

app.get('/renuevatoken', mdAutenticacion.verificaToken, (req, res) => {

    var token = jwt.sign({ usuario: req.usuario }, SEED, { expiresIn: 14400 }); // 4 horas

    res.status(200).json({
        ok: true,
        token: token
    });

});


app.post('/',(req,res)=>{
    var body = req.body;

    Usuario.findOne({ email: body.email},(err,usuarioDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar usuarios',
                errors: err
            });
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                mensaje:'credenciales incorrectas',
                errors:err
            });
        }
        if(!bcrypt.compareSync(body.password,usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                mensaje:'credenciales incorrectas',
                errors:err
            });
        }
        //CREAR TOKEN!!
         usuarioDB.password=':)';
        var token = jwt.sign({ usuario: usuarioDB },SEED,{ expiresIn: 62208000 });//4 horas
       ///buscar informacion
       console.log(usuarioDB.role);
       if(usuarioDB.role=="NUTRIOLOGO_ROLE"){
           //console.log(usuarioDB._id);
        Nutriologo.find({"nutriologo": usuarioDB._id}, (err,nutriologos)=>{
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error cargando nutriologo',
                            errors: err
                        });
                    }
                        res.status(200).json({
                            ok: true,
                            nutriologos: nutriologos,
                            usuario: usuarioDB,
                            id: usuarioDB._id,
                            token: token,
                            body: body,
                            menu: obtenerMenu(usuarioDB.role)
                            
                        });
    
                    
    
    
    
    
                });


               
         ////
        }else{
                res.status(200).json({
                    ok:true,
                    usuario: usuarioDB,
                    id: usuarioDB._id,
                    token: token,
                    body: body,
                    menu:obtenerMenu(usuarioDB.role)
                });
    }
    });

});

function obtenerMenu( ROLE ){
    if(ROLE === "NUTRIOLOGO_ROLE"){
            menu = [
                {
                titulo: 'Inicio',
                icono: 'mdi mdi-home',
                url : '/home',
                submenu: [
                        ]
                },
            
                {
                titulo: 'Pacientes',
                icono: 'mdi mdi-account',
                submenu: [
                    { titulo: 'Nuevo Paciente',icono: 'mdi mdi-account-plus', url: '/addpaciente' },
                    { titulo : 'Expedientes', icono: 'mdi mdi-folder-account',url: '/expedientes' }
                    
                ]
                },
                {
                titulo: 'Citas',
                icono: 'mdi mdi-calendar',
                submenu: [
                    { titulo: 'Mi Calendario',icono: 'mdi mdi-calendar-clock', url: '/calendario' },
                    { titulo: 'Lista de citas',icono: 'mdi mdi-calendar-text', url: '/listacitas' },
                  
                    
                ]
                
                },
                {
                titulo: 'Alimentos',
                icono: 'mdi mdi-food-apple',
                submenu: [
                    { titulo: 'Nuevo Alimento',icono: 'mdi mdi-plus-circle', url: '/alimentos' },
                    { titulo : 'Lista de Alimentos', icono: 'mdi mdi-view-list',url: '/alimentoslista' }
                
                ]
                
                },
                {
                titulo: 'Platillos',
                icono: 'mdi mdi-silverware-variant',
                submenu: [
                    { titulo: 'Crear Platillo',icono: 'mdi mdi-pencil-box', url: '/platillos' },
                    { titulo : 'Lista de Platillos', icono: 'mdi mdi-view-list',url: '/platilloslista' }
                
                ]
                
                },
                {
                titulo: 'Dietas',
                icono: 'mdi mdi-food-variant',
                submenu: [
                    { titulo: 'Crear Dieta',icono: 'mdi mdi-pencil-box', url: '/dietas' },
                    { titulo : 'Lista de Dietas', icono: 'mdi mdi-view-list',url: '/planeslista' }
                
                ]
                
                }
            ];
    }else if (ROLE ==="PACIENTE_ROLE"){
        menu = [
            {
              titulo: 'Inicio',
              icono: 'mdi mdi-home',
              url : '/home',
              submenu: [
                    ]
            },
            {
              titulo: 'Mi nutriologo',
              icono: 'mdi mdi-account',
              submenu: [
                { titulo: 'Informacion ',icono: 'fa fa-info', url: '/nutriologo' },
                
              ]
            
            },
            
            {
              titulo: 'Citas',
              icono: 'mdi mdi-calendar',
              submenu: [
                { titulo: 'Mi Calendario',icono: 'mdi mdi-calendar-clock', url: '/citas' },
                
              ]
            
            },
            {
              titulo: 'Progreso',
              icono: 'mdi mdi-chart-line',
              submenu: [
                { titulo: 'Mi progreso',icono: 'mdi mdi-account-star', url: '/progreso' },
                { titulo: 'Mis metas',icono: 'fa fa-star', url: '/metas' }
                
               
              ]
            
            },
            
            {
              titulo: 'Dietas',
              icono: 'mdi mdi-food-variant',
              submenu: [
                     { titulo : 'Mis dietas', icono: 'mdi mdi-view-list',url: '/misdietas' }
               
              ]
            
            }
          ];
        
    }

      return menu;
}


module.exports=app;