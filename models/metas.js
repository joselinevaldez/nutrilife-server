var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var metasSchema = new Schema({
    abdomen: {type: String, default:"no"},
    abdomenmeta: {type:String, default:"elegir"},
    abdomencm: {type: Number, default:null},
    cintura: {type: String, default:"no"},
    cinturameta: {type:String, default:"elegir"},
    cinturacm: {type: Number, default:null},
    peso: {type: String, default:"no"},
    pesometa: {type:String, default:"elegir"},
    pesokg: {type: Number, default:null},
    
    brazo: {type: String, default:"no"},
    brazometa: {type:String, default:"elegir"},
    brazocm: {type: Number, default:null},

    
    gluteo: {type: String, default:"no"},
    gluteometa: {type:String, default:"elegir"},
    gluteocm: {type: Number, default:null},
    paciente:{ type: Schema.Types.ObjectId,ref:'Paciente',required:true} ,
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'metas' });

module.exports = mongoose.model('Metas', metasSchema);