const express = require('express')
const router = express.Router()
const sensorController = require('../controllers/sensorController')

router.get('/min',
    sensorController.min(),
    function (req, res) {
        res.status(200).json({
            status: true,
            results: req.results
        })
    }
)

router.get('/max',
    sensorController.max(),
    function (req, res) {
        res.status(200).json({
            status: true,
            results: req.results
        })
    }
)

router.get('/avg',
    sensorController.average(),
    function (req, res) {
        res.status(200).json({
            status: true,
            results: req.results
        })
    }
)

router.get('/devide-predict',
    sensorController.devideSensorData(),
    sensorController.predictData(),
    function (req, res) {
        res.status(200).json({
            status: true,
            results: req.results
        })
    }
)

module.exports = router