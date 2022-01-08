const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
      title: 'Sensor Data API',
    },
    basePath: '/api'
  };

const outputFile = './swaggerOutput.json'
const endpointsFiles = ['./routes/sensor.js', './routes/users.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
