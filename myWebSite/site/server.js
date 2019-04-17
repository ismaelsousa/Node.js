const express = require("express");
const app = express();
const handle = require("express-handlebars");
const path = require("path")
//config handlebars
app.engine("handlebars", handle());
app.set("view engine", "handlebars")

//Carrega os arquivos estaticos
app.use(express.static(path.join(__dirname,'public')));


//routing//encaminhamento
app.get("/",function(req, res){

    res.render("index");
})

app.get("/fale-conosco",function(req, res){

    res.render("fale-conosco");
})
app.get("/fotos",function(req, res){

    res.render("fotos");
})
app.get("/google-glass",function(req, res){

    res.render("google-glass");
})

app.get("/multimidia",function(req, res){

    res.render("multimidia");
})

app.get("/specs",function(req, res){

    res.render("specs");
})

const PORT = process.env.PORT || 8081

//start server in port 8080
app.listen(PORT, function(){
    console.log("serve rodando");
})