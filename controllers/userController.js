var fs = require('fs')
var nodemailer = require("nodemailer")

exports.login = function () {
  return function (req, res, next) {
    console.log(req.body.id, req.body.password)
    var users = require('../mockupDB/users')
    const foundID = users.users.find(element => element.id === req.body.id);
    if (foundID) {
      if (foundID.password === req.body.password) {
        next()
      } else {
        res.status(401).send({
          'status': false,
          'error_message': 'Password not correct.'
        })
      }
    } else {
      res.status(401).send({
        'status': false,
        'error_message': 'User not found.'
      })
    }
  }
}

exports.approveWork = function () {
  return async function (req, res, next) {
    console.log(req.body.userID)
    var works = require('../mockupDB/works')
    var users = require('../mockupDB/users')
    const foundID = users.users.find(element => element.id === req.body.userID);
    if (foundID) {
      if (!works.works[0].approve.includes(req.body.userID)) {
        works.works[0].approve.push(req.body.userID)
      }
      if (works.works[0].approve.length === 3) {
        // Notify
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'dev.yotravee@gmail.com', // Email for testing
            pass: 'y0travee123456'
          }
        });

        var mailOptions = {
          from: 'dev.yotravee@gmail.com',
          to: 'napat.s@swiftdynamics.co.th', // napat.s@swiftdynamics.co.th
          subject: '[NOTIFICATION] Work Approvement',
          text: `Work ID ${works.works[0].id} is approved by 3 users.`
        };

        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log(error)
          } else {
            console.log('Email sent: ' + info.response)
            fs.writeFile('mockupDB\\works.json', JSON.stringify(works), (err) => {
              if (err) throw err;
              console.log('File has been saved!');
              next()
            });
          }
        });
      } else {
        fs.writeFile('mockupDB\\works.json', JSON.stringify(works), (err) => {
          if (err) throw err;
          console.log('File has been saved!');
          next()
        });
      }
    } else {
      res.status(401).send({
        'status': false,
        'error_message': 'User not found.'
      })
    }
  }
}
