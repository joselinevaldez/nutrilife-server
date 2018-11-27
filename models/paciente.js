var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var pacienteSchema = new Schema({
    nombre: {type: String, required:[true,'El nombre es necesario']},
    app: {type: String, required:[true,'El apellido paterno es necesario']},
    apm: {type: String, required:false,default:null},
    estadocivil:{type: String, required:[true,'El estado civil es necesario']},
    religion:{type: String, required:false,default:null},
    direccion:{type: String, required:false,default:null},
    fechanacimiento:{type: Date, required:[true,'La fecha de nacimiento es necesaria']},
    edad:{type: Number, required:[true,'La edad es necesaria']},
    motivo:{type: String, required:false,default:null},
    recomendado:{type: String, required:false,default:null},
    quienrecomendo:{type: String, required:false,default:null},
    medio:{type: String, required:false,default:null},
    sexo:{type: String, required:[true,'El sexo es necesario']},
    telefono:{type: String, required:[true,'El telefono es necesario']},
    estatus:{type: String, required:false ,default:"1"},
    fechaAlta:{type: Date, required:false,default:null},
    fechaBaja:{type: Date, required:false,default:null},
    expediente:{ type: Schema.Types.ObjectId,ref:'Expediente',required:false} ,
  
    usuario:{ type: Schema.Types.ObjectId,ref:'Usuario',required:false} ,
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:false}  
    
},{ collection:'pacientes' });

module.exports = mongoose.model('Paciente', pacienteSchema);