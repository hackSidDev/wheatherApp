const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ce12aacf882d2115f0024b3584048147&query=' + latitude + ',' + longitude

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to Connect weather api', undefined)
        }else if(body.error){
            callback('Please enter valid address', undefined)
        }else{
            callback(undefined, body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast 