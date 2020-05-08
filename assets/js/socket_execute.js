import Execute from './execute';
import io from 'socket.io-client';
let socket = io();

export default class SocketExecute extends Execute {
    constructor(pathname){
        super(pathname);
        this.socket = io();
    }

    execute(){
        socket.on('connect', () => {
            console.log('El cliente esta conectado');
            
            socket.emit('activeChat', this.userAuth, (data) => {
                console.log(data);
            })
        
        });

        socket.on('sendMessage', ( data ) => {
            console.log('Administrador:', data);
        });

        socket.emit('sendMessage', { data: this.userAuth.name, message: 'Hola amigos' });

        // socket.emmit('messagePrivate', { data: this.userAuth, message: "Hola prra" });

        socket.on('disconnect', () => {
            console.log('El servidor se callo');
        })

    }
}
