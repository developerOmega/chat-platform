import Execute from './execute';
import io from 'socket.io-client';
let socket = io();

export default class SocketExecute extends Execute {
    constructor(pathname){
        super(pathname);
        // this.socket = io();
    }

    execute(){
        socket.on('connect', () => {
            console.log('El cliente esta conectado');
            
            socket.emit('activeChat', this.userAuth, (data) => {
                console.log('usuario AAsssA', data);
            })
        
        });

        socket.on('sendMessage', ( data ) => {
            console.log('Administrador:', data);
        });

        socket.on('createMessage', data => {
            console.log(data);
        })

        socket.on('UsersList', data => {
            let contentUsers = document.querySelector('#content_users');
            contentUsers.innerHTML = '';
            console.log(data);

            data.forEach( user => {
                contentUsers.innerHTML += `<button id= '${ user.idSession }' >${ user.email }</button>`
            });
        });

        socket.on('disconnect', () => {
            console.log('El servidor se callo');
        });

        socket.emit('sendMessage', { data: this.userAuth.name, message: 'Hola amigos' });

        // socket.emit('messagePrivate', { id: "6FVgAqZnp_ACfVZSAAAC" , message: "Hola prra" });

       

    }
}
