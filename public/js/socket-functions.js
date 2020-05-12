function SocketImplement(){
    this.event = new SocketEvent;
    
    //Generar lista de usuario en el header
    this.renderUsersList = function(data){

        var contentUsers = document.querySelector('#content_users');
        contentUsers.innerHTML = '';
    
        data.forEach( user => {
            contentUsers.innerHTML += '<button id= '+  user._id  + '>'+ user.email +'</button>';
            this.event.eventUsersList();

        });

    }

    //Crear chat
    this.renderChat = function(data, type = 'private'){

        var contentChats = document.querySelector('#content_chats');

        var form = document.createElement('form');
        var textarea = document.createElement('textarea');
        var button = document.createElement('button');

        var divParent = document.createElement('div');
        var divMessage = document.createElement('div');

        divParent.innerHTML = '<h2>'+ data.name +'</h2>';
        divParent.setAttribute('id', 'chat_' + data._id)

        textarea.setAttribute('cols', 30);
        textarea.setAttribute('rows', 10);
        textarea.setAttribute('name', 'message');
        textarea.setAttribute('placeholder', 'Escribe ...');

        button.setAttribute('type', 'submit');
        button.innerText = 'Enviar';

        form.setAttribute('action', '/' + data._id);

        divMessage.className = 'content_messages';

        form.appendChild(textarea);
        form.appendChild(button);

        divParent.appendChild(divMessage);
        divParent.appendChild(form);

        contentChats.appendChild(divParent);

        switch(type){
            case 'private': 
                this.event.eventCreateMessage(form);           
            break;

            case 'group':
                this.event.eventCreateMessageGroup(form);
            break;

            default: 
                console.log('No selecciono la opcion correcta');
        }


    }

    //Validar la existencia del chat de usuarios
    this.validateChat = function(chat, data) {
        var self = this;

        if(!chat){
            socket.emit('renderChat',  { id: data.user._id }, function(dataRender){
                self.renderChat(dataRender);
    
                var chat = document.getElementById(data.query);
                chat.children[1].innerHTML += self.createMessage(data);
    
            });
        }
        else{
            chat.children[1].innerHTML += self.createMessage(data);
        }
    }
    
    //Validar la existencia del chat de grupo
    this.validateChatGroup = function(chat, data) {
        var self = this;

        if(!chat){
            socket.emit('renderChatGroup',  { id: data.group._id }, function(dataRender){
                self.renderChat(dataRender);
    
                var chat = document.getElementById(data.query);
                chat.children[1].innerHTML += self.createMessage(data);
            });
        }
        else{
            chat.children[1].innerHTML += self.createMessage(data);
        }
    }

    //Crear mensaje
    this.createMessage = function(data){
        return '<div>' + data.user.name + ' - ' + data.message + '<div>';        
    }

}

var implement = new SocketImplement;

function SocketEvent(){

    //Evento que da accion a botones del header
    this.eventUsersList = function(){

        var contentUsers = document.querySelector('#content_users');

        for(let i = 0; i < contentUsers.children.length; i++){

            contentUsers.children[i].addEventListener('click', function(e){
                e.preventDefault();

                socket.emit('renderChat', { id: this.id }, function(data){
                    implement.renderChat(data);
                });
            });

        }

    }

    //Evento que da accion a chat de usuarios
    this.eventCreateMessage = function(form){

        form.addEventListener('submit', function(e){
            e.preventDefault();
            
            var idUser = this.action.split('/')[this.action.split('/').length - 1];
            var that =  this;
            
            socket.emit('createMessage', { id: idUser, message: this.message.value }, function(data){
                that.parentNode.children[1].innerHTML += implement.createMessage(data);
            })
        });

    }

    //Evento que da accion a chat de grupo
    this.eventCreateMessageGroup = function(form){
        form.addEventListener('submit', function(e){
            e.preventDefault();

            var idGroup = this.action.split('/')[this.action.split('/').length - 1];
            var that = this;

            socket.emit('createMessageGroup', { id: idGroup, message: this.message.value }, function(data){
                that.parentNode.children[1].innerHTML += implement.createMessage(data);                
            });
        })
    }

    //Evento que da accion a formulario de creacion de grupo
    this.eventRenderGroupChat = function(form){

        form.addEventListener('submit', function(e){
            e.preventDefault();
            var userArr = [];
        
            for(var user of this.user){
        
                if( user.checked ){
                    userArr.push(user.value);
                }
        
            }

            // console.log( userArr );
        
            socket.emit('renderGroupChat', { name: this.name.value, users: userArr }, function(data){
                // console.log(data);
                implement.renderChat(data, 'group');
            });
        })

    }
}