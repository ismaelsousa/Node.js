//carregando modulos
const express = require("express")
//separador de paginas
const handlebars = require("express-handlebars")
//pega elementos da tela
const bodyParser = require('body-parser')
//express
const app = express();
//rotas
const router = express.Router()
//para usar os caminhos
const path = require("path")
//pegando as rotas do modulo main
const admin = require('./routes/admin')
const usuarios = require('./routes/usuario')
//carregando o mongo
const mongoose = require('mongoose')
//carregando o modulo session
const session = require('express-session')
//carregando o modulo flash que só aparece uma vez
const flash = require('connect-flash')
//carregar o passport
const passport = require('passport')
//chamar o modulo
require('./config/auth')(passport)

//configurações 
    //session
    app.use(session({
        secret: 'jiseletropecas',
        resave: true,
        saveUninitialized: true
    }))

    //entre a sessao e o flash

    app.use(passport.initialize())
    app.use(passport.session())
    //flash
    app.use(flash())

    //Middlewares
    app.use(function(req,res,next) {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.error = req.flash('error')
        //guarda os dados do usuario
        //req.use é criado pelo passport
        res.locals.user = req.user || null
        //defini que pode proseguir para o link
        next();
    })

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
    app.use("/usuarios",usuarios)
    app.get("/", function(req,res){
        res.render('public/index')
    })
//outros
const PORT = 8081;
app.listen(PORT, function(){
    console.log("servidor rodando")
})