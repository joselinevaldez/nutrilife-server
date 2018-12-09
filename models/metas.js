var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var metasSchema = new Schema({
    abdomen: {type: Boolean, default:false},
    abdomenmeta: {type:String, default:""},
    abdomencm: {type: Number, default:null},
    cintura: {type: Boolean, default:false},
    cinturameta: {type:String, default:""},
    cinturacm: {type: Number, default:null},
    peso: {type: Boolean, default:false},
    pesometa: {type:String, default:""},
    pesokg: {type: Number, default:null},
    
    brazo: {type: Boolean, default:false},
    brazometa: {type:String, default:""},
    brazocm: {type: Number, default:null},

    
    gluteo: {type: Boolean, default:false},
    gluteometa: {type:String, default:""},
    gluteocm: {type: Number, default:null},
    paciente:{ type: Schema.Types.ObjectId,ref:'Paciente',required:true} ,
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'metas' });

module.exports = mongoose.model('Metas', metasSchema);