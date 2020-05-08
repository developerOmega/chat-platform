const { io } = require('../server');
const User = require('../models/user');

io.on('connection', client => {
    console.log('El servidor esta conectado');

    client.on('sendMessage', (data, callback) => {
        
        client.broadcast.emit('sendMessage', client.id);
        // callback(data);
    });

    client.on('disconnect', () => {
        console.log('El usuario esta desconectado');
    });

    client.on('activeChat', ( data, callback ) => {
        let id = data._id;
        User.findByIdAndUpdate( id, { idSession: client.id }, (err, user) => {
            
            if(err) {
                callback(err);
            }

            callback(user);
        } )
    })
});