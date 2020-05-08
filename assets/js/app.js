import { LoginAuthExecute, LogoutAuthExecute } from './auth_execute';
import SocketExecute from './socket_execute';
import { UserGetAllExecute } from './user_execute';


if(window.location.pathname === '/'){
    let login = new LoginAuthExecute('/');
    login.execute();
}

if(window.location.pathname === '/home'){
    let logout = new LogoutAuthExecute('/');
    logout.execute();


    let users = new UserGetAllExecute('/');
    users.execute();

    let socket = new SocketExecute('/');
    socket.execute();
}
