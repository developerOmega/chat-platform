<template>
    <form class="login grid border-radius-none position-absolute" id="form_chat_room" v-on:submit.prevent="createChat">
        <div class="field">
            <label for="name_room">Nombre de sala</label>
            <input type="text" id="name_room" name="name" placeholder="Ingresa el nombre de la sala">
        </div>

        <div class="field" v-if="users">
            <label for="user_room">Selecciona usuarios</label>
            <input type="search" name="user" id="users_room" placeholder="@usuario" v-model="userInput" v-on:keyup="searchTags">
            <div id="contentTags" class="content_tags">
                
                <div v-for="user in usersInSkak" v-on:click="selectUser(user)">
                    <img :src='user.photo' > 
                    <div> 
                        <p> {{ user.name }} </p> <p>  {{ user.type }} </p>
                    </div>
                </div>
            </div>

        </div>

        <div class="field">
            <label for="">Usuarios</label>
            <input type="hidden" v-for="user in usersInChat" name="users" :value="user.id">
            <div class="box scroll min">

                <button type="button" v-for="user in usersInChat" v-on:click="dropUserChat(user)">
                    <div class="image width-50px">
                        <img :src="user.photo" alt="">
                    </div>

                    <div class="hover-line-through"> {{user.name}} </div>

                </button>

            </div>
        </div>
        
        <button type="submit"> Crear sala </button>
    </form>
</template>

<script>
    import { Socket } from './implemets/event_socket.js';

    export default {
        name: 'FormChatRoom',
        props: {
            usersData: Array,
            chats: Array,
            formOn: Boolean
        },
        data() {
            return {
                users: this.getUsersAll(),
                usersInSkak: [],
                usersInChat: [],
                userInput: '',
            }
        },
        methods: {

            createChatRoom(){
                this.$refs.App.createChatRoom();
            },

            createChat(e){
                let users = e.target.users || [];
                let name = e.target.name;
                let like = true;

                if(name.value === ''){
                    name.style.border = "1px solid red";
                    name.placeholder = 'No ingresaste el nombre de la sala';
                    like = false;
                }
                else{
                    name.style.border = "1px solid #00A2D6";
                    name.placeholder = 'Ingresa el nombre de la sala';
                    like = true;
                }

                if( users.length < 2 ){
                    e.target.user.style.border = "1px solid red";
                    e.target.user.placeholder = "Tiene que haber mas de 2 usuarios en el chat";
                    like = false;                
                }
                else{
                    e.target.user.style.border = "1px solid #00A2D6";
                    e.target.user.placeholder = "@usuario";
                    like = true;
                }

                if(!like){
                    return;
                }

                let userArr = [];     
                let self = this;       

                for(var user of users){
                    userArr.push(user.value);
                }

                this.$root.$emit('createChatRoom');
                Socket.emit('renderGroupChat', { name: name.value, users: userArr }, function(data){

                    const query = `chat_${data._id}`;
                    const chat = document.querySelector(`#${query}`);

                    if(chat){
                        chat.className = 'chat box box-shadow-patent';
                    }
                    else{
                        self.chats.push({chat: data, messages: [], query, type: 'group'});
                    }

                });


            },

            getUsersAll(){
                let arr = [];

                this.usersData.forEach(user => {
                    let element = {
                        id: user._id,
                        name: user.name,
                        photo: "https://picsum.photos/200",
                        type: user.email
                    }

                    arr.push(element);
                })

                return arr;
            },

            searchTags(){
                if(this.userInput.match(/@[a-zA-Z0-9]+/)){
                    let value = this.userInput.split("");
                    value.shift();
                    value = value.join("");

                    let filterUsers = this.users.filter( user => user.name.indexOf(value) > -1 );
                    this.usersInSkak = filterUsers;

                }else{
                    this.usersInSkak = [];
                }
            },

            selectUser(user){
                this.usersInChat.push(user);
                this.userInput = '';
                this.searchTags();
            },

            dropUserChat(user){
                let newUsersChat = this.usersInChat.filter( userData => userData.id != user.id );
                this.usersInChat = newUsersChat; 
            }
        },

        created(){
            console.log( "Los usuarios desde el form de salas", this.users );
        },

    }
</script>