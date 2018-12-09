var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var metasSchema = new Schema({
    abdomen: {type: Boolean, default:false},
    abdomenmeta: {type:String, default:null},
    abdomencm: {type: Number, default:null},
    cintura: {type: Boolean, default:false},
    cinturameta: {type:String, default:null},
    cinturacm: {type: Number, default:null},
    peso: {type: Boolean, default:false},
    pesometa: {type:String, default:null},
    pesokg: {type: Number, default:null},
    
    brazo: {type: Boolean, default:false},
    brazometa: {type:String, default:null},
    brazocm: {type: Number, default:null},

    
    gluteo: {type: Boolean, default:false},
    gluteometa: {type:String, default:null},
    gluteocm: {type: Number, default:null},
    paciente:{ type: Schema.Types.ObjectId,ref:'Paciente',required:true} ,
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'metas' });

module.exports = mongoose.model('Metas', metasSchema);