const express = require('express');
const bcrypt = require('bcrypt');
const { authToken } = require('../../../middlewares/authentication_api');
const User = require('../../../models/user');

const app = express();

//Mostrar uarios
app.get('/api/v1/users', authToken, (req, res) => {
    User.find({ status: true }).exec((err, users) => {
        
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        User.countDocuments({ status: true }, (err, count) => {
            return res.json({
                ok: true,
                users,
                count
            });
        });

    })
});

//Crear usuarios
app.post('/api/v1/users', authToken, (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    user.save((err, userDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json( {
            ok: true,
            user: userDB 
        } );
    })
});

//Mostrar usuarios por id
app.get('/api/v1/users/:id', authToken, (req, res) => {
    let id = req.params.id;

    User.findById( id, (err, user) => {
        
        if(err){
            return res.status(500).json({
                ok: true,
                err
            });
        }

        if(!user) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            })
        }

        if(!user.status) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            })
        }

        return res.json({
            ok: true,
            user
        });

    });

});

//Editar usuarios por id
app.put('/api/v1/users/:id', authToken, ( req, res ) => {
    let id = req.params.id;
    let body = req.body;

    delete body.password,
    delete body.img;
    
    User.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (err, user) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!user){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            })
        }

        return res.json({
            ok: true,
            user
        });
    } );

});

//Agregar grupos a la coleccion de usuarios
app.put('/api/v1/users/:id/groups', authToken, (req, res) => {
    let id = req.params.id;
    let body = {
        $push: {
            groups: {
                $each: [ req.body.group ]
            }
        }
    }

    User.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (err, user) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!user){
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            })
        }

        return res.json({
            ok: true,
            user
        });
    } );

})

//Remover grupos a la coleccion de usuarios
app.delete('/api/v1/users/:id/groups', authToken, (req, res) => {
    let id = req.params.id;
    let body = req.body; 

    User.findByIdAndUpdate( id, { $pull: { "groups": body.group } }, {new: true, runValidators: true}, (err, user) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!user){
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            })
        }

        return res.json({
            ok: true,
            user
        });
    } );

})

//Eliminar usuarios por id
app.delete('/api/v1/users/:id', authToken, (req, res) => {
    let id = req.params.id;

    User.findByIdAndUpdate(id, { status: false }, {new: true, runValidators: true}, (err, user) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!user) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            })
        }

        return res.json({
            ok: true,
            user
        })
    });

});

module.exports = app;
