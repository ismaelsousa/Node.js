const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require('../models/Usuario')
Usuario = mongoose.model("usuarios")

//import bcryptjs
const bcrypt = require('bcryptjs')
//rotas de usuarios
router.get("/registro", function(req,res){
    res.render("usuarios/registro")
})

router.post("/registro", function(req,res){
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
                    senha: req.body.senha
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

module.exports = router