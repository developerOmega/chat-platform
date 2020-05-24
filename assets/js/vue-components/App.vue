<template>
    <div id="app">
    
        <header>
            <div class="logo">
                <h2>ChatPlatform</h2>
            </div>
            <div class="info">
                <div class="data">
                    <div class="image width-50px">                    
                        <img src="https://picsum.photos/200" alt="">
                    </div>
                    <div class="name">{{ session.email }}</div>
                </div>
                <div class="options">
                    <button class="button hover-background-00A2D6" id="button-chat-room" v-on:click="createChatRoom"><i class="fas fa-comment-alt"></i> Crear sala </button>
                    <form action="/logout?_method=DELETE" method="POST" id="logout_session">
                        <button class="button hover-color-danger" type="submit" ><i class="fas fa-power-off"></i> Cerrar secion </button>
                    </form>
                    
                    <transition
                        v-on:before-enter="beforeEnter"
                        v-on:enter="enter"
                        v-on:leave="leave"
                        v-bind:css="false"
                    >
                       <FormChatRoom
                        v-if="formOn" 
                        v-bind:usersData="users"
                        v-bind:formOn="formOn"
                        v-bind:chats="chats"
                        /> 
                    </transition>
                    
                </div>
                
            </div>
        </header>

        <div class="container">
            <nav class="scroll min">
                <NavUser
                    v-for="user in users"
                    v-bind:user="user"
                    v-bind:chats="chats"
                    v-bind:key="user.id"
                />
               
            </nav>
            
            <div class="main scroll max">
                <Chat 
                    v-for="chat in chats"
                    v-bind:data="chat.chat"
                    v-bind:messages="chat.messages"
                    v-bind:query="chat.query"
                    v-bind:type="chat.type"
                    v-bind:key="chat.id"
                />
            </div>
        </div>


    </div>
</template>

<script>

    import NavUser from './NavUser.vue';
    import Chat from './Chat.vue';
    import FormChatRoom from './FormChatRoom.vue';
    import { Socket } from './implemets/event_socket.js';
    
    let userAuth = !localStorage.getItem('userAuth') || localStorage.getItem('userAuth') == undefined ? '' : JSON.parse(localStorage.getItem('userAuth'));

    export default {
        name: 'App',
        components: {
            NavUser,
            Chat,
            FormChatRoom
        },
        data() {
            return {
                text: 'Hola desde Vue',
                session: userAuth,
                users: [],
                chats: [],
                message: {},
                formOn: false
            }
        },
        methods:{
            createChatRoom(){
                if(this.formOn ==  false){
                    this.formOn = true;
                    document.getElementById('button-chat-room').className += " select";
                }
                else{
                    this.formOn = false;
                    document.getElementById('button-chat-room').className = "button hover-background-00A2D6";                    
                }
            },
            beforeEnter: function (el) {
                el.style.opacity = 0
            },
            enter: function (el, done) {
                Velocity(el, { opacity: 1, fontSize: '1em' }, { duration: 300 }, { complete: done })
            },
            leave: function (el, done) {
                Velocity(el, {opacity: 0, display: 'none'},  { complete: done });
            }
        },
        created(){
            self = this;

            Socket.on('connect', function(){
                console.log('El usuario esta conectado');

                Socket.emit('activeUser', userAuth, function(data){
                    console.log('Data Socket:', data);
                    console.log('Data Vue:', self.text)
                    self.users = data;
                });

            });

            Socket.on('viewUsers', function(data){
                console.log('Todos los usuarios', data);
                self.users = data;
            });

            Socket.on('createMessage', function(data){
                let chat = document.getElementById(data.query);

                if(!chat){
                    Socket.emit('renderChat',  { id: data.user._id }, function(dataRender){
                        let op = {
                            chat: dataRender,
                            messages: [data],
                            query: data.query,
                            type: 'private'
                        }
                        self.chats.push(op);
                        self.message = data;
                    });
                }
                else{
                    chat.className = 'chat box box-shadow-patent';

                    let chatData = self.chats.filter( chat => chat.query === data.query)[0];
                    chatData.messages.push(data);
                }
               
            });

            Socket.on('createMessageGroup', function(data){
                let chat = document.getElementById(data.query);

                if(!chat){
                    Socket.emit('renderChatGroup',  { id: data.group._id }, function(dataRender){
                        let op = {
                            chat: dataRender,
                            messages: [data],
                            query: data.query,
                            type: 'group'
                        }
                        self.chats.push(op);
                        self.message = data;
                    });
                }
                else{
                    chat.className = 'chat box box-shadow-patent';

                    let chatData = self.chats.filter( chat => chat.query === data.query)[0];
                    chatData.messages.push(data);
                }
            });

            Socket.on('renderChat', function(data){
                console.log(this.chats);
                self.chats.push({chat: data, messages: []});
            });

            Socket.on('disconnect', function(){
                console.log('Se perdio la coneccion');
            });
        },
        mounted(){
            this.$root.$on('createChatRoom', ()=>{
                this.createChatRoom();
            })
        }
        
    }
</script>

<style>
   
</style>