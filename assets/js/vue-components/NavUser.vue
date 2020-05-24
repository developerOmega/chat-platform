<template>
                   
    <button type="button" v-on:click="renderChat(user)"  class="card button hover-background-00A2D6 background-tranparent"> 

        <div class='image width-50px'> 
            <img v-bind:src="user.img" src="https://picsum.photos/200">  
        </div>
        <div class="info" > 
            <div> {{ user.name }} </div>
            <div> {{ user.email }} </div>
        </div>
        <div class="icon"> 
            <i class="fas fa-comment-alt"></i>
        </div>  
    </button>
</template>

<script>

    import { Socket } from './implemets/event_socket';

    export default {
        name: 'NavUser',
        props: {
            user: Object,
            chats: Array
        },
        methods: {
            renderChat(user){
                let self = this;

                Socket.emit('renderChat', { id: user._id }, function(data){
                    const query = `chat_${data._id}`;
                    const chat = document.querySelector(`#${query}`);

                    if(chat){
                        chat.className = 'chat box box-shadow-patent';
                    }
                    else{
                        self.chats.push({chat: data, messages: [], query, type: 'private'});
                    }
                });

            },
        },
        created(){
        }
    }
</script>