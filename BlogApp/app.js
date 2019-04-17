//carregando modulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require('body-parser')
const app = express();
const path = require("path")
//pegando o modulo main
const admin = require('./routes/admin')
const mongoose = require('mongoose')

//configurações 
    //body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //mongoose
    //linha para evitar erros
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/assistencia').then(function(){
        console.log("conectado ao mongo")
    }).catch(function(error){
        console.log('erro ao se conectar ao banco'+ error)
    })

    //public 
    app.use(express.static(path.join(__dirname, 'public')))

//rotas
    //referenciando a rota e o modulo
    app.use('/admin',admin)
//outros
const PORT = 8081;
app.listen(PORT, function(){
    console.log("servidor rodando")
})