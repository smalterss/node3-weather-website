const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamRvbm45NSIsImEiOiJjanVpaHd0enUxYjM1NDNwYjFwem01Z3pjIn0.rPcmlGwErRb5-nDmFv4zsQ'
    if (address) {

        request({ url, json: true }, (error, {body}) => {
            if (error) {
                callback('Unable to connect to location services!', undefined)
            } else if (body.features.length === 0) {
                callback('unable to ind location. Try another search', undefined)
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                })
            }
        })
    } else {
        callback('Please provide a real city you M O R O N')
    }
}


module.exports = geocode