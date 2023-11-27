const router = require('express').Router()
const Model = require('./model')

router.post('/auth/login', Model.validate, (req, res) => {
  res.status(200).json({
    message: `Welcome back, ${req.body.username}!`,
    token: req.token,
  })
})

router.get('/auth/is_authed', Model.checkToken, (req, res) => {
  res.status(200).json({
    message: `Token checks out, ${req.jwt.subject}! You have ${req.jwt.remaining} seconds left in your session`,
  })
})

module.exports = router
