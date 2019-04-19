module.exports = {
    eAdmin:  function(req,res,next){
        //funcao do passport que verifica se o usuario esta autenticado
        //para ser admin é necessário ser 1
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next()
        }else{
            req.flash("error_msg", 'Você precisa ser um admin para ter acesso')
            res.redirect('/admin')
        }
    }
}