<template>
    <div v-bind:class="[ message.me ? 'target me' : 'target' ]">
        <div class="image width-30px">
            <img src="https://picsum.photos/200" alt="">
        </div>

        <div class="content_box box box-shadow-child">
            <div class="header_taget blur">
                {{message.user.name}} 
            </div>
            <div class="message_target">
                {{ message.message }}
            </div>
        </div>
    </div>
</template>

<script>
    export default { 
        name: 'TargetChat',
        props: {
            message: Object
        },
        data() {
            return {
                me: false
            }
        },
    }
</script>