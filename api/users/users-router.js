const express = require('express');
const router = express.Router();
const Users = require('./users-model');

router.get('/', (req, res, next) => {
  Users.find()
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(next)
})

router.get("/:id", (req, res, next) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.json(user)
      
    })
    .catch(next)
})

// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something broke in the users-router"
  })
});

module.exports = router;