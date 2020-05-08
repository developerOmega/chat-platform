import Execute from './execute';
import Auth from './components/authenticate';

class AuthExecute extends Execute {
    constructor(pathname) {
        super(pathname);
        this.auth = new Auth;
    }
}

class LoginAuthExecute extends AuthExecute {
    constructor(pathname){
        super(pathname);
    }

    execute(){
        const self = this;

        document.querySelector('form').addEventListener('submit', function(e){
            e.preventDefault();
            self.auth.login(this);
        });
    }
}

class LogoutAuthExecute extends AuthExecute {
    constructor(pathname) {
        super(pathname);
    }

    execute(){
        const self = this;

        document.querySelector('#logout_session').addEventListener('submit', function(e){
            e.preventDefault();
            self.auth.logout(this);
        })
    }
}

export { LoginAuthExecute, LogoutAuthExecute };