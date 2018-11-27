var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var nutriologoSchema = new Schema({
    nombreconsultorio: {type: String,default:null},
    direccion: {type: String, default:null},
    telefono: {type: String, default:null},
    horario:{type: String, default:null},
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'nutriologos' });

module.exports = mongoose.model('Nutriologo', nutriologoSchema);