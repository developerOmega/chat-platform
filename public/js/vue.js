Vue.component( 'nav-user', {
    template: `
        <button type="button" class="card"> 
            <div class='img'> <img v-bind:src="user.img">  </div>
            <div class="info" >
                <div> {{ user.name }} </div>
                <div class='blur'> {{ user.email }} </div>
            </div>
            <div class="icon"> 
                <i class="fas fa-comment-alt"></i>
            </div>  
        </button>
    `,
    props: ['user']
});

Vue.component( 'chat', {
    template: `
        <div class="chat">
            <div class="header">
                <div class="info">
                    <img src="" alt="">
                    <div>{{ user.name }}</div>
                </div>
                <div> <i class="fas fa-minus"></i> </div>
            </div>
            <div class="content">
                <target-chat
                    v-for="message in messages"
                    v-bind:message="message"
                    v-bind:key="message.id"
                />
            </div>

            <form class="text_area">
                <input type="text" placeholder="Escribe tu mensaje ... ">
            </form>

        </div>
    `,
    props: ['user'],
    data() {
        return {
            messages: [
                {
                    id: 1, 
                    text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium veritatis enim ea ',
                    img: this.user.image
                },
                {
                    id: 2, 
                    text:'Hola kk',
                },
                {
                    id: 3, 
                    text:'Eres una prra',
                }
            ]
        }
    },
} );

Vue.component( 'target-chat' ,{
    template: `
        <div v-bind:class="[ me ? 'target me' : 'target' ]">
            <img src="" alt="">
            <div class="content_box">
                {{ message.text }}
            </div>
        </div>
    `,
    props: ['message'],
    data() {
        return {
            me: false
        }
    },
});

new Vue({
    el: '#content',
    data: {
        text: 'Hola desde Vue',
        users: [
            { id: 1, name: 'Javier', email: 'javier@email.com', img: 'https://picsum.photos/200' },
            { id: 2, name: 'Daniel', email: 'daniel@email.com', img: 'https://picsum.photos/200' },
            { id: 3, name: 'Naeyli', email: 'nayeli@email.com', img: 'https://picsum.photos/200' }
        ]
    }, 
    methods: {
        
    },
});
