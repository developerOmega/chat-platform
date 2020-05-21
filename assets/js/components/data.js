export default class Data {
    constructor(url){
        this.url = 'http://localhost:4000';
        this.token = !localStorage.getItem('tokenLogin') || localStorage.getItem('tokenLogin') == undefined ? '' : JSON.parse(localStorage.getItem('tokenLogin'));
    }

    get(id = 'all', callback){
        return callback(null, this.url);
    }

    post(value, callback){
        return callback(null, this.url);
    }

    put(id, value, callback){
        return callback(null, this.url);
    }

    delete(id, callback){
        return callback(null, this.url);
    }
}