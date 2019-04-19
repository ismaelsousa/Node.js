const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require('../models/Usuario')
Usuario = mongoose.model("usuarios")
const passport = require('passport')
//import bcryptjs
const bcrypt = require('bcryptjs')
//carregando o helpe
const {eAdmin} /*é um obj que pega somente a funcao eAdimn*/ = require('../helpers/eAdmin')



//rotas de usuarios
//Só pode registrar quem já é admin
router.get("/registro", eAdmin,function(req,res){
    res.render("usuarios/registro")
})

router.post("/registro",eAdmin, function(req,res){
    var erros = []

    if(req.body.senha != req.body.senha2){
        erros.push({texto:'Senha diferentes, tente novamente!'})
    }
    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros})
    }else{
        //antes de cadatrar usuario precisa verificar se ele já está cadastrado
        Usuario.findOne({email: req.body.email}).then(function(usuario){
            if(usuario){
                req.flash("error_msg", "Já existe uma conta com esse e-mail")
                res.redirect("/usuarios/registro")
            }else{
                const novoUsuario =new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    eAdmin: 1
                })

                //encriptar a senha
                bcrypt.genSalt(10, function(erro, salt){
                    bcrypt.hash(novoUsuario.senha,salt, function(erro,hash){
                        if(erro){
                            req.flash("error_msg", "Houve um erro ao cadastrar ")
                            res.redirect("/admin")
                        }else{
                            novoUsuario.senha = hash
                            novoUsuario.save().then(function(){
                                req.flash("success_msg", "Salvo com sucesso")
                                res.redirect('/admin')
                            }).catch(function(){
                                req.flash("error_msg", "Houve um erro ao criar o usuario")
                            })
                        }
                    })
                })
            }
        }).catch(function(error){
            req.flash("error_msg", "Houve um erro ao cadastrar")
            res.redirect("usuarios/registro")
        })        
    }    
})

router.get("/login", function(req,res){
    res.render("usuarios/login")
})

router.post('/login',function(req,res,next){
    //autenticando o usuario
    passport.authenticate('local',{
        //rota que irá se dê certo a autenticar
        successRedirect: '/admin',
        //caso não dê
        failureRedirect: '/usuarios/login',
        //ativando o flash
        failureFlash: true
    })(req,res,next)
})

router.get("/logout",eAdmin, function(req,res){
    req.logOut()
    req.flash("success_msg", "Deslogado com sucesso")
    res.redirect('/')
})

module.exports = router