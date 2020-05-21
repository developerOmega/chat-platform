import Execute from './execute';
import Vue from 'vue';
import App from './vue-components/App.vue';

export default class VueExecute extends Execute {
    constructor(pathname){
        super(pathname);
    }

    execute(){
        new Vue({
            de: '#app',
            components: { App },
            template: '<App/>'
        }).$mount('#app');        
    }
}
