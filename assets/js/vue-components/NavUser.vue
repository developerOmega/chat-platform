<template>
                   
    <button type="button" v-on:click="renderChat(user)"  class="card"> 
        <div class='img'> <img v-bind:src="user.img">  </div>
        <div class="info" > 
            <div> {{ user.name }} </div>
            <div class='blur'> {{ user.email }} </div>
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
                    self.chats.push({chat: data, messages: [], query: `chat_${data._id}`});
                });

            },
        },
        created(){
        }
    }
</script>