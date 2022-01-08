const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Log in
router.post('/login',
  userController.login(),
  function (req, res) {
    res.status(200).json({
      status: true
    })
  })

router.post('/approve/:id',
  userController.approveWork(),
  function (req, res) {
    res.status(200).json({
      status: true
    })
  })

module.exports = router