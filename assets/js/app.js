import '../scss/style.scss';

import { LoginAuthExecute, LogoutAuthExecute } from './auth_execute'
import { UserGetAllExecute } from './user_execute';
import VueExecute from './vue_execute';


if(window.location.pathname === '/'){
    let login = new LoginAuthExecute('/');
    login.execute();
}

if(window.location.pathname === '/home'){

    let vue = new VueExecute('/');
    vue.execute();

    let logout = new LogoutAuthExecute('/');
    logout.execute();

    let users = new UserGetAllExecute('/');
    users.execute();
}
