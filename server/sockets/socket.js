const { io } = require('../server');
const User = require('../models/user');
const Group = require('../models/group');

io.on('connection', ( client ) => {

    console.log('El servidor esta conectado')

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

    client.on('createGroupChat', (data, callback) => {
        let group = new Group({
            name: data.name
        });

        client.join(data.name);

        group.save( (err, groupDB) => {
            if(err){
                throw new Error(err);
            }

            let body = {
                $push: {
                    users: {
                        $each: data.users
                    }
                }
            }

            Group.findByIdAndUpdate( groupDB.id, body, {new: true, runValidators: true}, ( err, groupDB ) => {
                if(err){
                    throw new Error(err);
                }


            });
        } );


    })

    client.on('renderChat', (data, callback) => {
        let id = data.id;

        User.findById(id, (err, userDB) => {
            if(err){
                throw new Error(err)
            }   

            callback(userDB);
        } );
    });

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
