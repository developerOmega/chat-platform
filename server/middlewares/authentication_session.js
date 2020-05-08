let authSession = (req, res, next) => {
    
    if(!req.session.user){
        return res.redirect('/');
    }

    next();
}

let excludeSession = (req, res, next) => {
    
    if(req.session.user){
        return res.redirect('/home');
    }

    next();

}

module.exports = {
    authSession,
    excludeSession
}