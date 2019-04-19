//carregando a  estrategia do passport q é a local
const localStrategy = require('passport-local').Strategy
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

//carregando o model
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

module.exports = function(passport){
                                                            //o passwordfiled é para indicar qual o campo tem a senha
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, function(email,senha, done){
        Usuario.findOne({email:email}).then(function(usuario){
            //se achar um usuario
            if(!usuario){
                //no done vc passa os dados da conta autenticada
                //segundo argumento se foi autenticada ou não
                return done(null, false,{message: 'Esta conta não existe'})
            }
            //compara o hash da senha com a senha do usuario achado
            bcrypt.compare(senha, usuario.senha, function(erro, batem){
                 //se as senhas batem
                 if(batem){
                     return done(null, usuario)
                 }else{
                     return done(null, false, {message: "Senha incorreta"})
                 }
            })
        })
    }))


    //salvar dados dos usuarios em uma sessão
    passport.serializeUser(function(usuario,done){
        //passar dados do usuario para uma sessão
        done(null, usuario.id)
    })

    passport.deserializeUser(function(id, done){
        Usuario.findById(id, function(err,usuario){
            done(err,usuario)
        })
    })
}