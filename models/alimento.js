var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var alimentosSchema = new Schema({
    nombre: {type: String,default:null},
    grupo: {type: String, default:null},
    cantidad: {type: Number, default:null},
    unidad: {type: String, default:null},
    peso: {type: Number, default:null},
    calorias: {type: Number, default:null},
    fibra: {type: Number, default:null},
    grasa: {type: Number, default:null},
    proteina: {type: Number, default:null},
    estatus: {type: String, default:"1"},
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'alimentos' });

module.exports = mongoose.model('Alimentos', alimentosSchema);