<template>
    <div v-bind:class="[ me ? 'target me' : 'target' ]">
        <img src="" alt="">
        <div class="content_box">
            {{message.user.name}} - {{ message.message }}
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