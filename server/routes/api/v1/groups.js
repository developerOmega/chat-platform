const express = require('express');
const { authToken } = require('../../../middlewares/authentication_api');
const Group = require('../../../models/group');
let app = express();

//Mostrar grupos
app.get( '/api/v1/groups', authToken, ( req, res ) => {
    Group.find({}).exec((err, group) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            group
        })
    });
} );

//Mostrar grupos por id
app.get('/api/v1/groups/:id', authToken, (req, res) => {
    let id = req.params.id;

    Group.findById(id).exec( (err, group) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!group){
            return res.status(404).json({
                ok: false,
                err: {
                    'message': 'No existe el grupo'
                }
            })
        }

        return res.json({
            ok: true,
            group
        })
    } );
});

//Crear grupos
app.post('/api/v1/groups', authToken, (req, res) => {
    let body = req.body;

    let group = new Group({
        name: body.name
    });

    group.save((err, groupDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            group: groupDB            
        })
    })


});

//Editar grupos por id
app.put('/api/v1/groups/:id', authToken, ( req, res ) => {
    let id = req.params.id;
    let body = req.body;

    Group.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, group) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!group){
            return res,status(404).json({
                ok: false,
                err: {
                    message: 'No existe el grupo'
                }
            })
        }

        return res.json({
            ok: true,
            group
        })
    })
});

//Agregar usuarios a la coleccion de grupos
app.put('/api/v1/groups/:id/users', authToken, (req, res) => {
    let id = req.params.id;
    let body = {
        $push: {
            users: {
                $each: [ req.body.user ]
            }
        }
    }

    Group.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, group) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!group){
            return res,status(404).json({
                ok: false,
                err: {
                    message: 'No existe el grupo'
                }
            })
        }

        return res.json({
            ok: true,
            group
        })
    })
})

//Remover usuarios a la coleccion de grupos
app.delete('/api/v1/groups/:id/users', authToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Group.findByIdAndUpdate(id, { $pull: { "users": body.user } }, {new: true, runValidators: true}, (err, group) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!group){
            return res,status(404).json({
                ok: false,
                err: {
                    message: 'No existe el grupo'
                }
            })
        }

        return res.json({
            ok: true,
            group
        })
    })
})

//Eliminar grupos por id
app.delete('/api/v1/groups/:id', authToken, ( req, res ) => {
    let id = req.params.id;
    Group.findByIdAndRemove(id, (err, group) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!group){
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'No existe el grupo'
                }
            })
        }

        return res.json({
            ok:true,
            message: 'El grupo fue eliminado con exito',
            group
        })
    })
});

module.exports = app;