<template>
    <div class="chat box box-shadow-patent" v-bind:id="query">
        <div class="header">
            <div class="info">
                <div class="image width-30px">
                    <img src="https://picsum.photos/200" alt="">
                </div>
                <div>{{ user.name }}</div>
            </div>
            <button type="button"> <i class="fas fa-times"></i> </button>
        </div>

        <div class="content scroll min">
            <TargetChat
                v-for="message in messages"
                v-bind:message="message"
                v-bind:key="message.id"
            />
        </div>

        <form class="text_area" v-on:submit.prevent="createMessage(user)">
            <input type="text" v-model="newMessage" placeholder="Escribe tu mensaje ... ">
        </form>

    </div>
</template>

<script>

    import TargetChat from './TargetChat.vue'; 
    import { Socket } from './implemets/event_socket';

    export default {
        name: 'Chat',
        components: { TargetChat },
        props: {
            user: Object,
            messages: Array,
            query: String
        },
        data() {
            return {
                newMessage: ''
            }
        },
        methods: {
            createMessage(user){
                console.log(user);
                let self = this;
                Socket.emit('createMessage', { id: user._id, message: this.newMessage }, function(data){
                    data.me = true;
                    self.messages.push(data);
                    console.log('Tu mensaje es:', data)
                })
            }
        },
        mounted(){

            let self = this;
            if(this.message){
                this.messages.push(this.message);
            }
        }
       
        
    }
</script>