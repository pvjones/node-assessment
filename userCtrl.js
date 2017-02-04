var users = require('./users.json')

exports.getAllUsers = (req, res, next) => {

  console.log(req.query)

  if (req.query.language) {
    let filteredUsers = users.filter(function(e) {
      return e.language.toLowerCase() === req.query.language.toLowerCase();
    })
    res.status(200).json(filteredUsers);
  } else if (req.query.age) {
    let filteredUsers = users.filter(function(e) {
      return e.age == req.query.age;
    })
    res.status(200).json(filteredUsers);
  } else if (req.query.city) {
    let filteredUsers = users.filter(function(e) {
      return e.city.toLowerCase() === req.query.city.toLowerCase();
    })
    res.status(200).json(filteredUsers);
  } else if (req.query.state) {
    let filteredUsers = users.filter(function(e) {
      return e.state.toLowerCase() === req.query.state.toLowerCase();
    })
    res.status(200).json(filteredUsers);
  } else if (req.query.gender) {
    let filteredUsers = users.filter(function(e) {
      return e.gender.toLowerCase() === req.query.gender.toLowerCase();
    })
    res.status(200).json(filteredUsers);
  } else {
    res.status(200).json(users);
  }
};

exports.getUsersByTarget = (req, res, next) => {
  let target = req.params.target;
  let filteredUsers;
  if (target === "user" || target === "admin" || target === "moderator") {
    filteredUsers = users.filter(function(e) {
      return e.type === target;
    })
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == target) {
        filteredUsers = users[i];
        break;
      }
    }
  }

  (req.params.target && filteredUsers) ? res.status(200).json(filteredUsers): res.status(404).send('User not found');
};

exports.createNewUser = (req, res, next) => {
  let newUser = req.body;
  newUser.id = users.length + 1;
  newUser.favorites = [];
  users.push(newUser);
  res.status(200).json(newUser);
}

exports.createNewUserWithPrivilege = (req, res, next) => {
  let newUser = req.body;
  newUser.id = users.length + 1;
  newUser.type = req.params.privilege;
  newUser.favorites = [];
  users.push(newUser);
  res.status(200).json(newUser);
}

exports.modifyUserLanguage = (req, res, next) => {
  let target = req.params.target;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == target) {
      users[i].language = req.body.language;
      res.status(200).json(users[i]);
      return;
    }
  }
  res.status(404).send('user not found');
}

exports.modifyUserForums = (req, res, next) => {
  let target = req.params.target;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == target) {
      users[i].favorites.push(req.body.add);
      res.status(200).json(users[i]);
      return;
    }
  }
  res.status(404).send('user not found');
}

exports.deleteUserForums = (req, res, next) => {
  let target = req.params.target;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == target) {
      users[i].favorites.splice(users[i].favorites.indexOf(req.query.favorite), 1);
      res.status(200).json(users[i]);
      return;
    }
  }
  res.status(404).send('user not found');
}

exports.banUser = (req, res, next) => {
  let target = req.params.id
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == target) {
      res.status(200).send(users.splice(i, 1))
      return;
    }
  }
  res.status(404).send([]);
}

exports.updateUserById = (req, res, next) => {
  let target = req.params.id
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == target) {
      for (var prop in req.body) {
        users[i][prop] = req.body[prop];
      }
      res.status(200).json(users[i]);
      return;
    }
  }
  res.status(404).send('user not found');
}
