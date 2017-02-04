var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 3000;

var users = require('./users.json');
var userCtrl = require('./userCtrl')

var app = express();

var corsOptions = {
  origin: 'http://localhost:8999',
};

app.use(express.static('/'));
app.use(bodyParser.json());
app.use(cors(corsOptions));

///ENDPOINTS///

app.get('/api/users', userCtrl.getAllUsers);

app.get('/api/users/:target', userCtrl.getUsersByTarget);

app.post('/api/users', userCtrl.createNewUser);

app.post('/api/users/:privilege', userCtrl.createNewUserWithPrivilege);

app.post('/api/users/language/:target', userCtrl.modifyUserLanguage);

app.post('/api/users/forums/:target', userCtrl.modifyUserForums);

app.delete('/api/users/forums/:target', userCtrl.deleteUserForums);

app.delete('/api/users/:id', userCtrl.banUser);

app.put('/api/users/:id', userCtrl.updateUserById);



app.listen(port, function() {
  console.log(`express running on port ${port}`)
});

module.exports = app;