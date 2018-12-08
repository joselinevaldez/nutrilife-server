var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var historicomedidasSchema = new Schema({
    abdomen: {type: Number, default:null},
    cintura: {type: Number, default:null},
    peso: {type:  Number, default:null},
    estatura: {type:  Number, default:null},
    cadera: {type:  Number, default:null},
    brazo: {type:  Number, default:null},
    muslo: {type:  Number, default:null},
    gluteo: {type:  Number, default:null},
    grasacorporal: {type:  Number, default:null},
    grasaviceral: {type:  Number, default:null},
    imc: {type:  Number, default:null},
    diagnosticoimc:{type:  String, default:null},
    fecha:{type:Date},
    paciente:{ type: Schema.Types.ObjectId,ref:'Paciente',required:true} ,
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'historicomedidas' });

module.exports = mongoose.model('Historicomedidas', historicomedidasSchema);