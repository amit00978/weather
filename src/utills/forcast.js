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
            cb(undefined,{
                summary:body.daily.data[0].summary,
                temperature:body.currently.temperature,
                precipProbability:body.currently.precipProbability
            })
       }  
    })
}

module.exports = getForecast;