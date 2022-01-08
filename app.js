var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var port = 3000;
var expressValidator = require('express-validator')

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(expressValidator())

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization, X-Access-Token')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
});

app.listen(port, '0.0.0.0', function () {
    console.log('Server is running port: ' + port);
});

// API doc
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('./swaggerOutput.json')
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
console.log(`API document is running at: http://localhost:${port}/doc`);

// Services
var sensor = require('./routes/sensor')
var user = require('./routes/users')
app.use('/api', sensor)
app.use('/api', user)

app.use((req, res, next) => {
    var err = new Error("Service is not available.");
    err.status = 404;
    next(err);
})