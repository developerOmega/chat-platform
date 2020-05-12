var socket = io();
var userAuth = !localStorage.getItem('userAuth') || localStorage.getItem('userAuth') == undefined ? '' : JSON.parse(localStorage.getItem('userAuth'));
var implement = new SocketImplement;
var event = new SocketEvent;

event.eventRenderGroupChat( document.querySelector('#contentGroupForm') );

//Coneccion
socket.on('connect', function(){
    console.log('El usuario esta conectado');

    socket.emit('activeUser', userAuth, function(data){
        console.log(data);
        implement.renderUsersList(data);
    });

});

//Ejecuta el metodo para renderizar los botones del header
socket.on('viewUsers', function(data){
    console.log('Todos los usuarios', data);
    implement.renderUsersList(data);
});

//Renderiza chat ------- OBSOLETO
socket.on('renderChat', function(data){
    implement.renderChat(data.user);

});

//Crea mensaje privado
socket.on('createMessage', function(data){
    var chat = document.getElementById(data.query);
    implement.validateChat(chat, data);
});

//Crea mensaje de grupo
socket.on('createMessageGroup', function(data){
    var chat = document.getElementById(data.query);
    implement.validateChatGroup(chat, data);
})

//Genera chat de grupo
socket.on('renderGroupChat', function(data){
    // console.log('createGroupChat', data);
    implement.renderChat(data, 'group');
})

//Deconetar
socket.on('disconnect', function(){
    console.log('Se perdio la coneccion');
});

// socket.emit('hola', { message: 'Hola crallola' });

