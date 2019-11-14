const request = require('request');

getForecast =(lat,lng,cb)=>{
    const url = 'https://api.darksky.net/forecast/115f19a9c7bb341c34414cd9dbb83882/'+lat+','+lng+'?units=si';

    request({
        url,
        json:true
    },(err,{body})=>{
        if(err){
            cb("unable to connect to the weather API",undefined)
         }
        else if(body.error){
              cb("unable to find the location",undefined)
        }
        else{
            console.log("data===>",body.daily.data[0])
            cb(undefined,{
                summary:body.daily.data[0].summary,
                sunsetTime:body.daily.data[0].sunsetTime,
                sunriseTime:body.daily.data[0].sunriseTime,
                temperature:body.currently.temperature,
                temperatureHigh:body.daily.data[0].temperatureHigh,
                temperatureLow:body.daily.data[0].temperatureLow,
                precipProbability:body.currently.precipProbability
            })
       }  
    })
}

module.exports = getForecast;