var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var rolesValidos ={
    values: ['ADMIN_ROLE','NUTRIOLOGO_ROLE','PACIENTE_ROLE'],
    message:'{VALUE} no es un rol permitido'
}
var usuarioSchema = new Schema({
    nombre: {type: String, required:[true,'El nombre es necesario']},
    email: {type: String,unique:true,required:[true,'El correo es necesario']},
    password:{type: String, required:[true,'La contraseña es necesaria']},
    img:{type: String, required:false},
    role:{type: String, required:true,default:'NUTRIOLOGO_ROLE', enum: rolesValidos}
    

});
usuarioSchema.plugin(uniqueValidator,{ message: '{PATH} El correo debe de ser unico'});
module.exports = mongoose.model('Usuario', usuarioSchema);