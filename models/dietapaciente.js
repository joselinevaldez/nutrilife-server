var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dietapacienteSchema = new Schema({
    
    recomendaciones: {type:  String, default:null},
    dieta:{ type: Schema.Types.ObjectId,ref:'Dieta',required:true} ,
    fecha:{ type:  Date, default:null},
    paciente:{ type: Schema.Types.ObjectId,ref:'Paciente',required:true} ,
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'dietapaciente' });

module.exports = mongoose.model('Dietapaciente', dietapacienteSchema);