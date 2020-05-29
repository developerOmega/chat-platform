const express = require('express');
const app = express();

app.use(require('./routes'));
app.use(require('./api/v1/users'));
app.use(require('./api/v1/user_authenticate'));
app.use(require('./api/v1/groups'));

module.exports = app;
