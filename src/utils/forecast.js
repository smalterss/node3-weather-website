const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a4764e9a1ca1e1636ea98f10b420b5f1/'+ longitude +','+ latitude
   
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('unable to connect to darksky', undefined)
        }else if (body.code === 400) {
            callback('incorrect coordinates', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    }
)}

module.exports = forecast
