
const request = require('request');

const getGeoCode = (address,cb) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW1pdDAwOTc4IiwiYSI6ImNrMnB2cmQ1MzA4b3kzZHFlNzRwbXQ3bXkifQ.51QEequNaN5tZ9BqmbfMKA&limit=1';
    request({
     url,
     json:true
    },(err,{ body })=>{    
        if(err){     
            cb("unable to connect the geocodeing api:",undefined);
        }
        else if(body.message){
            cb("Not able to find the match.please try again with different search",undefined);
        }
        else if(!body.features.length){
            cb("Not able to find the match.please try again with different search",undefined);
        }
        else{
            const {center,place_name} = body.features[0]
            cb(undefined,{
                longitude:center[0],
                latitude: center[1],
                location: place_name
            });
        }
    })
}  

module.exports=
getGeoCode
