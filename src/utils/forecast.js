const request = require("request")
const forecast = (latitude, longitude, callback)=> {
    const url = `https://api.darksky.net/forecast/1189c48d40b2e35f52e21a2e32c87721/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`
    request({url, json:true}, (error, {body})=> {
        if(error){
            callback("Unable to connect darksky")
        } else if (body.error) {
            callback("Could not find location")
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degree celcius out. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast