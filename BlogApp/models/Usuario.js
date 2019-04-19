//imports
const mongoose =require('mongoose')
//importando o metodo esquema
const Schema = mongoose.Schema;

//Definindo Usuario
const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    eAdmin:{
        type: Number,
        default: 0 // não é admin
    },
    senha:{
        type: String,
        required: true
    }
})

mongoose.model("usuarios",Usuario)