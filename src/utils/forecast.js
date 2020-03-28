const request = require('request')
const forecast = (loc, callback) => {
    const url = `https://api.darksky.net/forecast/af342c9f5e824ef74ab5385d24b9c8fe/${loc.latitude},${loc.longitude}?units=si`
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Cannot Connect to the Servers :(')
        } else if (response.body.error) {
            callback('Unable to find the location!Try a Different One')
        } else {            
            callback(undefined, {
            forecast: `${response.body.daily.summary}There is currrently ${response.body.currently.temperature} degress out.There is ${response.body.currently.precipProbability} % chances of rain `
            ,
            address: loc.place
        })
        
    }})
}
module.exports = forecast