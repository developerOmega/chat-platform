<template> 

    <div class="chat box box-shadow-patent" v-bind:id="query">
        <div class="header">
            <div class="info">
                <div class="image width-30px">
                    <img src="https://picsum.photos/200" alt="">
                </div>
                <div>{{ data.name }}</div>
            </div>
            <button type="button" v-on:click="chatNone"> <i class="fas fa-times"></i> </button>
        </div>

        <div class="content scroll min">
            <TargetChat
                v-for="message in messages"
                v-bind:message="message"
                v-bind:key="message.id"
            />
        </div>

        <form class="text_area" v-on:submit.prevent="createMessage(data)">
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
            data: Object,
            messages: Array,
            query: String,
            type: String
        },
        data() {
            return {
                newMessage: ''
            }
        },
        methods: {
            createMessage(data){
                // console.log(data);
                let self = this;

                switch(this.type){
                    case 'private': 
                        Socket.emit('createMessage', { id: data._id, message: this.newMessage }, function(data){
                            data.me = true;
                            self.messages.push(data);
                        })
                    break;

                    case 'group':
                        Socket.emit('createMessageGroup', { id: data._id, message: this.newMessage }, function(data){
                            data.me = true;
                            self.messages.push(data);

                        })
                    break;

                    default: 
                        console.error("La opcion no existe");
                }
              
            },

            chatNone(){
                let selfChat = document.querySelector(`#${this.query}`);
                selfChat.className += ' none';
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