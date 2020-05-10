var socket = io();
var userAuth = !localStorage.getItem('userAuth') || localStorage.getItem('userAuth') == undefined ? '' : JSON.parse(localStorage.getItem('userAuth'));
var implement = new SocketImplement;

socket.on('connect', function(){
    console.log('El usuario esta conectado');

    socket.emit('activeUser', userAuth, function(data){
        console.log(data);
        implement.renderUsersList(data);
    });

});

socket.on('viewUsers', function(data){
    console.log('Todos los usuarios', data);
    implement.renderUsersList(data);
});

socket.on('renderChat', function(data){
    
    implement.renderChat(data.user);

});

socket.on('createMessage', function(data){
    var chat = document.getElementById(data.query);

    if(!chat){

        socket.emit('renderChat',  { id: data.user._id }, function(dataRender){
            console.log('renderChat', dataRender);
            implement.renderChat(dataRender);

            var chat = document.getElementById(data.query);
            chat.children[1].innerHTML += implement.createMessage(data);

        });

    }
    else{
        chat.children[1].innerHTML += implement.createMessage(data);
        console.log('SERVIDOR', data, chat);
    }

    
});

socket.on('disconnect', function(){
    console.log('Se perdio la coneccion');
});



// socket.emit('hola', { message: 'Hola crallola' });

