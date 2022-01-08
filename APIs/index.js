const axios = require('axios')

function getData () {
    return axios.get('http://3.1.189.234:8091/data/ttntest')
}

module.exports = { getData }