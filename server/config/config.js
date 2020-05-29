//==========================
// Puerto
//==========================

process.env.PORT = process.env.PORT || 4000;

//==========================
// Entorno'
//==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


//==========================
// Duracion de token
//==========================
process.env.EXPIRED_TOKEN = '48h';


//==========================
// Seed
//==========================
process.env.SEED = 'el-gato-esta-en-desarrollo'; 


//==========================
// Base de datos
//==========================
let urlDB;

if(process.env.NODE_ENV === 'development'){
    urlDB = 'mongodb://localhost:27018/chat_platform'
}
else{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
