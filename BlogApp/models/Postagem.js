//imports
const mongoose =require('mongoose')
//importando o metodo esquema
const Schema = mongoose.Schema;

const Postagem = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    //ex conteudo
    email:{
        type: String,
        required: true
    },    
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categorias",
        required: true
    },
    telefone:{
        type: String,
        required: false
    },
    data:{
        type: Date,
        default: Date.now()
    }
})

//criando colecao no BD
mongoose.model("Postagens", Postagem)