var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var expedienteSchema = new Schema({
    exploracion: {type: String,default:null},
    cirugias: {type: String,default:null},
    antecedentes: {type: String, default:null},
    problemas: {type: String, default:"seleccione"},

    abdomen: {type: Number, default:null},
    cintura: {type: Number, default:null},
    peso: {type:  Number, default:null},
    estatura: {type:  Number, default:null},
    grasacorporal: {type:  Number, default:null},
    grasaviceral: {type:  Number, default:null},

    abdomenA: {type:  Number, default:null},
    cinturaA: {type:  Number, default:null},
    pesoA: {type: Number, default:null},
    grasacorporalA: {type:  Number, default:null},
    grasaviceralA: {type:  Number, default:null},

    imc: {type:  Number, default:null},
  
    recomendaciones: {type:  String, default:null},
    diagnostico:{type:  String, default:null},

    abdomenB: {type:  Number, default:null},
    cinturaB: {type:  Number, default:null},
    pesoB: {type: Number, default:null},
    grasacorporalB: {type:  Number, default:null},
    grasaviceralB: {type:  Number, default:null},
    dietaA:{ type: Schema.Types.ObjectId,ref:'Dieta',defaul:null} , 
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'expediente' });

module.exports = mongoose.model('Expediente', expedienteSchema);