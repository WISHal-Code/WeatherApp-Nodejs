const request = require('request')


const geoCode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidmlzaGFsZGVzaWducyIsImEiOiJjazgxOWEydDAwY29jM25tc3VpZzUzODh5In0.4mmOmcHQCSWyTWt9huMn3Q&limit=1"

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Cannot establish a sucessful connection with Servers :(')
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location ! Try a different one :)')
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                place: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode