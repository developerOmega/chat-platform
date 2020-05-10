import Execute from './execute';
import User from './components/user';

class UserExecute extends Execute{
    constructor(pathname){
        super(pathname);
        this.user = new User;
    }
}

class UserGetAllExecute extends UserExecute {
    constructor(pathname){
        super(pathname);
    }

    execute(){
        this.user.get('all', ( err, users ) => {
            if(err){
                console.error(err);
            }

            // let contentUsers = document.querySelector('#content_users');
            // users.users.forEach( user => {
            //     contentUsers.innerHTML += `<button id= '${ user.idSession }' >${ user.email }</button>`
            // });
        });
    }
}

export { UserGetAllExecute };