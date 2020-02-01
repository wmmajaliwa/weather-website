const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/8218274d854b3b75c7418801086e05af/' + encodeURIComponent(long) + ',' + encodeURIComponent(lat)
    request({ url, json:  true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error){
            callback('Unable to find location!', undefined)
        } else{
            const deg = body.currently.temperature
            const precProbability = body.currently.precipProbability
            const summary = body.currently.summary
            callback(undefined, {
                summary,
                deg,
                precProbability
            })
        }
    })
}

module.exports = forecast