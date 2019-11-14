
// Node provided api
const path = require('path');

// 3rd party api
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

// Import files
const geoCode = require('./utills/geoCode');
const foreCast = require('./utills/forcast');

// Define paths for express config
const publicDir = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templetes/views');
const partialsPath = path.join(__dirname,'../templetes/partials');
debugger
console.log("partials--->",partialsPath);


// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.locals={
        name:'amit yadav',
        title:"Home page"

    }
    res.render('index');
})
app.get('/about',(req,res)=>{
    res.render('about',{
        about:'about',
        title:'about',
        name:'amit yadav'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        help:"Please visit the costomer care.",
        title:'Help',
        name:'immy price'
    });
})

app.get('/help/*',(req,res)=>{
res.render('404',{
    error:"Help article not found"
})
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return  res.send({
            error:'You must provided a search term'
        })
    }
    res.send({
        products:[]
    })
})
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"Please must provide the address "
        })
    }
    geoCode(req.query.address,(err,{  longitude, latitude ,location}={})=>{
        if(err){
            return res.send({
                error:err
            })
        }
        foreCast(latitude,longitude,(foreCastErr,{ summary , temperature , precipProbability ,temperatureHigh ,temperatureLow}={})=>{
            if(foreCastErr){
                return res.send({
                    error: foreCastErr
                })
            }
            res.send({
                summary: summary,
                temperature:temperature,
                precipProbability: precipProbability,
                location:location,
                temperatureLow,
                temperatureHigh
            })
        })


    })

})
app.get('*',(req,res)=>{
    res.render('404',{
        error:"page not found"
    })
})




app.listen(port,()=>{
    console.log("Server is up on "+port)
})