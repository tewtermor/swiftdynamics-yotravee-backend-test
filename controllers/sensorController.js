var apis = require('../APIs')

exports.min = function () {
    return function (req, res, next) {
        // Get data at the time
        apis.getData().then(res => {
                req.results = {
                    data: findMin(res.data, 'data'),
                    data2: findMin(res.data, 'data2')
                }
                next()
            })
            .catch(error => {
                console.log(error)
            })
    }
}

exports.max = function () {
    return function (req, res, next) {
        // Get data at the time
        apis.getData().then(res => {
                req.results = {
                    data: findMax(res.data, 'data'),
                    data2: findMax(res.data, 'data2')
                }
                next()
            })
            .catch(error => {
                console.log(error)
            })
    }
}

exports.average = function () {
    return function (req, res, next) {
        // Get data at the time
        apis.getData().then(async res => {
                req.results = {
                    data: await findAverage(res.data, 'data'),
                    data2: await findAverage(res.data, 'data2')
                }
                next()
            })
            .catch(error => {
                console.log(error)
            })
    }
}

exports.divideSensorData = function () {
    return function (req, res, next) {
        // Get data at the time
        apis.getData().then(res => {
                req.rawData = res.data.slice()
                var split = 200
                var sensorDataGroup = [],
                    sensorDataGroupNumber = []
                for (var i = 0; i < res.data.length; i += split) {
                    let array = res.data.slice(i, i + split);
                    sensorDataGroupNumber.push(array.length)
                    sensorDataGroup.push(array)
                }
                req.results = {
                    devidedNumber: sensorDataGroupNumber
                }
                req.rawDataGroup = sensorDataGroup
                next()
            })
            .catch(error => {
                console.log(error)
            })
    }
}

exports.predictData = function () {
    return async function (req, res, next) {
        var avg = await findAverage(req.rawData, 'data')
        req.results.prediction = {
            "1day": (req.rawDataGroup[req.rawDataGroup.length - 1][req.rawDataGroup[req.rawDataGroup.length - 1].length - 1].data + avg) / 2,
            "7days": (req.rawDataGroup[req.rawDataGroup.length - 1][req.rawDataGroup[req.rawDataGroup.length - 1].length - 1].data + (avg * 6)) / 6
        }
        next()
    }
}

function findMin(array, data) {
    return Math.min.apply(null, array.map(function (item) {
        return item[`${data}`];
    }))
}

function findMax(array, data) {
    return Math.max.apply(null, array.map(function (item) {
        return item[`${data}`];
    }))
}

async function findAverage(array, data) {
    var sum = 0
    array.forEach(element => {
        sum = sum + (element[`${data}`] ? element[`${data}`] : 0)
    });
    return sum / array.length
}