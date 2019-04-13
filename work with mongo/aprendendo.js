const mongoose = require("mongoose")

//configurando o mongo
    mongoose.Promise = global.Promise;

    mongoose.connect("mongodb://localhost/aprendendo", {useMongoClient: true}).then(function(){
        console.log("conexão com sucesso")
    }).catch(function(error){
        console.log("houve erro"+error)
    })

//model - usuario
//definindo o model
const UsuarioSchem = mongoose.Schema({
    name: {
        type: String,
        //require: false usado para definir se é obrigatório
    },
    sobrenome:{
        type: String,
        require: false
    },
    email:{
        type: String,
        require: true
    }, 
    idade:{
        type: Number,
        require: true
    },
    pais:{
        type: String
    }
})

//para criar a collection 
    mongoose.model('usuarios', UsuarioSchem)
//precisa definir uma constante
const usuario = mongoose.model("usuarios",UsuarioSchem)

//inserir usuario no banco
    new usuario({
        name: "ismael",
        sobrenome: "sousa",
        email: "ismaelufc",
        idade: 20,
        pais: "brazil"
    }).save().then(function(){
        console.log("usuario criado com sucesso")
    }).catch(function(erro){
        console.log("erro:"+erro)
    })
