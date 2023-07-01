const Users = require('../users/users-model');
/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.status(401).json({message: "You shall not pass!"})
  }
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
// REGISTER
async function checkUsernameFree(req, res, next) {
  const { username } = req.body
  const userCheck = await Users.findBy({ username }) /// IMPORTANT: must pass this back in as an object
  if (userCheck.length !== 0) {
    res.status(422).json({message: "Username taken"})
  }
  next()
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists() {

}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {

  const { password } = req.body;

  if (!password || password.length <= 3) {
    res.status(422).json({message: "Password must be longer than 3 chars"})
  } else {
    next()
  }

}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameExists,
  checkPasswordLength,
  checkUsernameFree
}