const request = require('request')

const forecast = (longitude, latitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=39234602b63999ac96237bd07cf2cb20&query=${longitude},${latitude}`
    
    request({ url, json: true }, (error, { body }={}) => {     
        if (error) { 
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('You have exceeded your monthly request limit', undefined)
        } else if(body.error.type) {  
            callback('search not found!', undefined)
        } else { 
            callback(undefined, `Its now ${body.current.temperature} temperature. The weather is ${body.current.weather_descriptions} and it feels like its ${body.current.feelslike}.`)
        }
    })
}



module.exports = forecast


