const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
//carregando models categorias
require("../models/Categoria")

//pega o modulo do arquivo Categorias.js
const Categoria = mongoose.model("Categorias")



//routers //rotas
router.get("/", function(req, res){
    res.render("admin/index")
})


router.get("/posts", function(req, res){
    res.send("pagina de posts")

})

router.get("/categorias", function(req, res){
    res.render("admin/categorias")
})

router.get("/categorias/add", function(req, res){
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", function(req, res){
    //validacao do formulario
    var erros = [] 
    //se o nome for vazio ou undefined ou null
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto:"Nome inválido"})        
    }
    if(!req.body.slug || typeof req.body.slug == undefined  || req.body.slug == null){
        erros.push({texto:"Slug inválido: coloque somente letras e que sejam minúsculas"})        
    }

    if(erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    }else{
        //se não houver erros cria no banco
        const novaCatedoria = {
            // ESSE REQ.BODY.NOME É REFERENCIA PARA O ADDCATEGORIAS
            // QUE POSSUE UM NAME=  "NOME"
            nome: req.body.nome,
            slug: req.body.slug
        }
        //schema do modulo
        new Categoria(novaCatedoria).save().then((result) => {
            //enviar msg de sucesso para variavel global
            req.flash("success_msg","Marca criada com sucesso")
            res.redirect('/admin/categorias')
        }).catch((error) => {
            //envia msg de erro para variavel global
            req.flash("error_msg","Houve um erro ao salvar a marca, tente novamente!")
        });
    
    }
    

})
module.exports = router