function SocketImplement(){
    this.event = new SocketEvent;
    
    this.renderUsersList = function(data){

        var contentUsers = document.querySelector('#content_users');
        contentUsers.innerHTML = '';
    
        data.forEach( user => {
            contentUsers.innerHTML += '<button id= '+  user._id  + '>'+ user.email +'</button>';
            this.event.eventUsersList(this);

        });

    }

    this.renderChat = function(data){

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

        form.setAttribute('action', '/users/' + data._id);

        divMessage.className = 'content_messages';

        form.appendChild(textarea);
        form.appendChild(button);

        divParent.appendChild(divMessage);
        divParent.appendChild(form);

        contentChats.appendChild(divParent);


        this.event.eventCreateMessage(form, this);

    }

    this.createMessage = function(data){
        return '<div>' + data.user.name + ' - ' + data.message + '<div>';        
    }

}

function SocketEvent(){

    this.eventUsersList = function(self){

        var contentUsers = document.querySelector('#content_users');

        for(let i = 0; i < contentUsers.children.length; i++){

            contentUsers.children[i].addEventListener('click', function(e){
                e.preventDefault();

                socket.emit('renderChat', { id: this.id }, function(data){
                    self.renderChat(data);
                });
            });

        }

    }

    this.eventCreateMessage = function(form, self){

        form.addEventListener('submit', function(e){
            e.preventDefault();
            
            var idUser = this.action.split('/')[this.action.split('/').length - 1];
            var that =  this;
            
            socket.emit('createMessage', { id: idUser, message: this.message.value }, function(data){
                that.parentNode.children[1].innerHTML += self.createMessage(data);
            })
        });

    }
}