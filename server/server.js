const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const socketIO = require('socket.io');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

const bodyParser = require('body-parser');

require('./config/config');

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Express HBS engine
app.set('view engine', 'hbs');

// Session express
app.use( session({
    secret: '123qwerty123',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        url: process.env.URLDB,
        autoReconnect: true
    })
}) );


app.use(require('./routes/routes'));
app.use(require('./routes/api/v1/users'));
app.use(require('./routes/api/v1/user_authenticate'));
app.use(require('./routes/api/v1/groups'));


mongoose.connect(process.env.URLDB, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, 
    ( err, res ) => {
        if(err){
            throw new Error(err);
        }
        else{
            console.log('Base de datos ONLINE');
        }
    });

module.exports.io = socketIO(server);
require('./sockets/socket');
    

server.listen(process.env.PORT, () => {
    console.log('Conectado al puerto', process.env.PORT);
});



