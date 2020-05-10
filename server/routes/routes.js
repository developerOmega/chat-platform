const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { excludeSession, authSession } = require('../middlewares/authentication_session');

const User = require('../models/user');


app.get('/', excludeSession, (req, res) => {
    res.render('login', {
        name: 'Daniel',
        title: 'Login'
    })
});

app.post('/login', (req, res) => {
    let body = req.body;

    User.findOne({email: body.email}, (err, userDB) => {
        if(err){
            return res.redirect('back');
        }

        if(userDB == null){
            console.log('No existe el usuario');
            return res.redirect('back');
        }

        if( !bcrypt.compareSync( body.password, userDB.password ) ){
            return res.redirect('back');
        }

        req.session.user = userDB;
        return res.redirect('/home');

    });
})

app.delete('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.get('/home', authSession, (req ,res) => {
    User.find({status: true}).exec((err, usersDB) => {

        if(err){
            throw new Error(err);
        }

        res.render('home', {
            title: 'Home',
            session: req.session,
            users: usersDB
        })
    });
    
});

module.exports = app;
