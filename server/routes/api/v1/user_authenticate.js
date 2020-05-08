const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const app = express();

app.post('/api/v1/login', (req, res) => {
    let body = req.body;

    User.findOne({email: body.email}, ( err, user ) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!user) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Usuario y contraseña son incorrectos'
                }
            })
        }

        if( !bcrypt.compareSync(body.password, user.password) ){
            return res.status(401).json({
                ok: false,
                err:{ 
                    message: 'Usuario y contraseña son incorrectos'
                }
            })
        }

        let token = jwt.sign({ user }, process.env.SEED, { expiresIn: process.env.EXPIRED_TOKEN});

        return res.json({
            ok: true,
            user,
            token
        })


    })
});

module.exports = app;