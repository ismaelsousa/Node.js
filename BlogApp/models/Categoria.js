//imports
const mongoose =require('mongoose')
//importando o metodo esquema
const Schema = mongoose.Schema;

//crinado modelo
const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

//criar a tabela lá 
mongoose.model('Categorias',Categoria)