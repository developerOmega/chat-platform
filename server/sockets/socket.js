const { io } = require('../server');
const User = require('../models/user');
const Group = require('../models/group');

io.on('connection', ( client ) => {

    console.log('El servidor esta conectado')

    //Activar usuarios
    client.on('activeUser', (data, callback) => {
        let id = data._id;

        User.findByIdAndUpdate( id, { idSession: client.id, status: true }, (err, userDB) => {
            if(err){
                throw new Error(err);
            }

            User.find({ status: true }).exec((err, usersDB) => {
                // console.log(usersDB);
                if(err){
                    throw new Error(err);
                }
                client.broadcast.emit('viewUsers', usersDB);
                callback(usersDB);
                
            });
        } );
    });

    //Crear chat de grupo y guardarlo en base de datos
    client.on('renderGroupChat', (data, callback) => {
        let group = new Group({
            name: data.name,
            users: data.users
        });

        client.join(data.name);

        group.save( (err, groupDB) => {
            if(err){
                throw new Error(err);
            }

            User.populate(groupDB, {path: 'users'}, (err, groupDB) => {

                groupDB.users.forEach( user => {
                    client.broadcast.to( user.idSession ).emit('renderGroupChat', groupDB );
                } );

                callback(groupDB);
            })
            

        } );


    })

    //Crear chat privado
    client.on('renderChat', (data, callback) => {
        let id = data.id;
        
        User.findById(id, (err, userDB) => {
            if(err){
                throw new Error(err)
            }   
            callback(userDB);
        } );
    });

    //Generar chat de grupo ya existenete
    client.on('renderChatGroup', (data, callback) => {
        id = data.id;

        Group.findById(id, (err, groupDB) => {
            if(err){
                throw new Error(err)
            }   
            callback(groupDB);
        } );
    });

    //Crear mensaje priavdo
    client.on('createMessage', (data, callback) => {
       let id = data.id;

        User.findOne( { idSession: client.id }, (err, userDB) => {
            
            if(err){
                throw new Error(err);
            }
            
            User.findById(id, (err, userAddress) => {
                if(err){
                    throw new Error(err);
                }
                
                client.broadcast.to(userAddress.idSession).emit('createMessage', { 
                    user: userDB, 
                    message: data.message, 
                    query: `chat_${userDB.id}` 
                })
     
                callback({ user: userDB, message: data.message });
            })

        } )

    });

    //Crear mensaje de grupo
    client.on('createMessageGroup', (data, callback) => {
        Group.findById( data.id ).exec((err, groupDB) => {
            if(err){
                throw new Error(err);
            }

            User.findOne({ idSession: client.id }, (err, userDB) => {
                if(err){
                    throw new Error(err);
                }

                User.populate(groupDB, {path: 'users'}, (err, groupDB) => {

                    groupDB.users.forEach(user => {
                        client.broadcast.to(user.idSession).emit('createMessageGroup', { 
                            user: userDB, 
                            group: groupDB,
                            message: data.message, 
                            query: `chat_${groupDB.id}` 
                        });
                    });
    
                    callback({ user: userDB , message: data.message, });
                })

               

            })

        });
    })

    //Deconectar
    client.on('disconnect', () => {
        console.log('Se perdio coneccion con el usuario');

        let id = client.id;
        User.findOneAndUpdate({idSession: id}, { status: false }, (err, userDB) => {
            User.find({status: true}).exec((err, usersDB) => {

                if(err){
                    throw new Error(err);
                }

                client.broadcast.emit('viewUsers', usersDB)
            })
        })
    })

})
