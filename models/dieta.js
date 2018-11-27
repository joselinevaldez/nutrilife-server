var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dietaSchema = new Schema({
     dias:{
            lunes:{
                    desayunoL:{type: String, default:null},
                    comidaL:{type: String, default:null},
                    cenaL:{type: String, default:null}
            },
            martes:{
                    desayunoM:{type: String, default:null},
                    comidaM:{type: String, default:null},
                    cenaM:{type: String, default:null}
            },
            miercoles:{
                    desayunoMI:{type: String, default:null},
                    comidaMI:{type: String, default:null},
                    cenaMI:{type: String, default:null}
            },
            jueves:{
                    desayunoJ:{type: String, default:null},
                    comidaJ:{type: String, default:null},
                    cenaJ:{type: String, default:null}
            },
            viernes:{
                    desayunoV:{type: String, default:null},
                    comidaV:{type: String, default:null},
                    cenaV:{type: String, default:null}
            },
            sabado:{
                    desayunoS:{type: String, default:null},
                    comidaS:{type: String, default:null},
                    cenaS:{type: String, default:null}
            },
            domingo:{
                desayunoD:{type: String, default:null},
                comidaD:{type: String, default:null},
                cenaD:{type: String, default:null}
            }
        },
        nombre: {type: String, default:null},
        tipopersona: {type: String, default:null},
        estatus:{type: String, default:"1"},
        nutriologo:{ type: Schema.Types.ObjectId,ref:'Usuario',required:true}  
    
},{ collection:'dietas' });

module.exports = mongoose.model('Dieta', dietaSchema);