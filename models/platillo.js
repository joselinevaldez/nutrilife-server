var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var platilloSchema = new Schema({
    nombre: {type: String,default:null},
    tiempocomida: {type: String, default:null},
    estatus:{type: String, default:"1"},
    nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'platillos' });

module.exports = mongoose.model('Platillo', platilloSchema);