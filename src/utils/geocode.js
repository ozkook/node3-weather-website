const request = require('request')
    
const geoCode = (address, callback)=>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoib3prb29rIiwiYSI6ImNrdnk4MG9mMGFrYnUybnF3cngxdXo5bmYifQ.NQ89fX2O3668l6C-8-WjPA&limit=1'
    
    request({ url, json: true }, (error, { body } = {})=>{ //request(), as geoCode() have both an anonymous function as an argument. in request, the anonymous function calls the callback.
    
        if (error) { // low-level error
            callback('Unable to connect to the weather service!', undefined)

        } else if (body.features.length === 0) {
            callback('Unable to find location. please try another search.', undefined)
            
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }       
    })
}
module.exports = geoCode