import Data from './data';

export default class Auth extends Data {
    constructor(url){
        super(url);
    }

    login(self){
        let url = `${this.url}/api/v1/login`;
        let params = {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `email=${self.email.value}&password=${self.password.value}`
        }

        fetch(url, params)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                localStorage.setItem('tokenLogin', JSON.stringify(data.token));
                localStorage.setItem('userAuth', JSON.stringify(data.user));
                self.submit();
            })
            .catch( err => console.log(err));

    }

    logout(self){

        if(this.token == ''){
            return self.submit();
        }

        localStorage.removeItem('tokenLogin');
        localStorage.removeItem('userAuth');
        return self.submit();

    }
}