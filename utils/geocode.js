const request = require('request')

const geocode = (address, callback) => {
    const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWJ1dG8iLCJhIjoiY2s1bWZwZ3JnMHc5eTNqbGIwbWRyaHN3eiJ9.UY4r1qyYH8L2h7a-o0_ikg'
    request({ url: urlGeo, json: true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode