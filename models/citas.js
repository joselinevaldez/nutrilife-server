var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var citasSchema = new Schema({
    title: {type: String,default:null},
    start: {type: Date, default:null},
    time: {type: String, default:null},
    end: {type: Date, default:null},
    color: {type: String, default:null},
    estatus: {type: String, default:null},
    paciente:{ type: Schema.Types.ObjectId,ref:'Paciente',required:true},  
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'citas' });

module.exports = mongoose.model('Citas', citasSchema);