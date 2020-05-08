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

            // console.log(users);
        });
    }
}

export { UserGetAllExecute };