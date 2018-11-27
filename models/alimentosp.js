var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var alimentospSchema = new Schema({
    
    platillo:{ type: Schema.Types.ObjectId,ref:'Platillo',required:true},  
    alimento:{ type: Schema.Types.ObjectId,ref:'Alimento',required:true},  
    nombre: {type: String, default:null},
    unidad: {type: String, default:null},
    cantidad: {type: Number, default:null}
      
},{ collection:'alimentosp' });

module.exports = mongoose.model('Alimentosp', alimentospSchema);