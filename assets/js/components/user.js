import Data from './data';

export default class User extends Data {
    constructor(url){
        super(url);
    }

    get(id = 'all', callback){
        let urlData = id === 'all' ? `${ this.url }/api/v1/users` : `${ this.url }/api/v1/users/${id}` ;
        let h = new Headers;
        h.append('Authorization', this.token);

        let req = new Request(urlData, {
            method: 'GET',
            mode: 'cors',
            headers: h
        });

        fetch(req)
            .then(resp => resp.json())
            .then( result => callback(null, result))
            .catch( err => callback(err) );
    }

    post(value, callback) {
        let urlData = `${this.url}/api/v1/users`;

        let params = {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Authorization": `${this.token}`
            },
            body: `name=${value.name}&email=${value.email}&password=${value.password}`
        }

        fetch( urlData, params )
            .then( resp = resp.json() )
            .then( result => callback( null, result ) )
            .then( err => callback(err) );
    }

    put(id, value, callback){
        let urlData = `${url}/api/v1/users/${id}`;

        let params = {
            method: 'PUT',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Authorization": `${this.token}`
            },
            // body: `name=${value.name}&email=${value.email}`
            body: `name=${value.name}`            
        }

        fetch(urlData, params)
            .then( rest => rest.json() )
            .then( result => callback(null, result) )
            .catch( err => callback(err) );
    }

    putActive(id, value, callback){
        let urlData = `${url}/api/v1/users/${id}`;
        
        let params = {
            method: 'PUT',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Authorization": `${this.token}`
            },
            // body: `name=${value.name}&email=${value.email}`
            body: `idSession=${value.idSession}`            
        }

        fetch(urlData, params)
            .then( rest => rest.json() )
            .then( result => callback(null, result) )
            .catch( err => callback(err) );
    }

    delete(id, callback){
        let urlData = `${url}/api/v1/users/${id}`;
        let h = new Headers;
        h.append('Authorization', `${this.token}`);

        let params = {
            method: 'DELETE',
            headers: h
        }

        fetch(urlData, params)
            .then( rest => rest.json() )
            .then( result => callback(null, result) )
            .catch( err => callback(err) );
    }
} 