export default class Execute {
    
    constructor(pathname){
        this.pathname = pathname;
        this.userAuth = !localStorage.getItem('userAuth') || localStorage.getItem('userAuth') == undefined ? '' : JSON.parse(localStorage.getItem('userAuth'));
    }

    execute(){
        return this.pathname;
    }
}