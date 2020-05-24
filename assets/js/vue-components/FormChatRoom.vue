<template>
    <form class="login grid border-radius-none position-absolute">
        <div class="field">
            <label for="name_room">Nombre de sala</label>
            <input type="text" id="name_room" name="name" placeholder="Ingresa el nombre de la sala">
        </div>

        <div class="field" v-if="users">
            <label for="user_room">Usuario</label>
            <input type="search" name="user" id="users_room" placeholder="Selecciona usuarios" v-model="userInput" v-on:keyup="searchTags">
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
            <input type="hidden" name="users">
            <div class="box scroll min">

                <button type="button" v-for="user in usersInChat" v-on:click="dropUserChat(user)">
                    <div class="image width-50px">
                        <img :src="user.photo" alt="">
                    </div>

                    <div class="hover-line-through"> {{user.name}} </div>

                </button>

            </div>
        </div>
        
        <button type="submit" > Crear sala </button>
    </form>
</template>

<script>
    import { Socket } from './implemets/event_socket.js';

    export default {
        name: 'FormChatRoom',
        props: {
            usersData: Array
        },
        data() {
            return {
                users: [],
                usersInSkak: [],
                usersInChat: [],
                userInput: ''
            }
        },
        methods: {

            getUsersAll(){
                console.log('Todos los usuarios', this.usersData);
                this.usersData.forEach(user => {
                    let element = {
                        id: user._id,
                        name: user.name,
                        photo: "https://picsum.photos/200",
                        type: user.type
                    }

                    this.user.push(element);
                })
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
        },

    }
</script>