var express = require('express');
var pdf = require('html-pdf');
var app=express();

app.get('/',(req,resp,next)=> {

    

        var contenido = `
        <h1>Esto es un test de html-pdf</h1>
        <p>Estoy generando PDF a partir de este código HTML sencillo</p>
        `;

        pdf.create(contenido).toFile('./pdf/salida.pdf', function(err, res) {
            if (err){
                console.log(err);
                resp.status(400).json({
                    ok:false,
                    mensaje:'El pdf no pudo ser generado'
                });
            } else {
                console.log(res);
                resp.status(200).json({
                    ok:true,
                    mensaje:'Pdf generado correctamente'
                });
            }
        });
   
});

module.exports=app;






