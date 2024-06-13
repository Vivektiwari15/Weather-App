// https://api.openweathermap.org/data/2.5/weather?q=Nadiad&appid=93c5987d684a9e9a3dad11e0fcd77b7a

const https = require('https')
const fs = require('fs')
const url = require('url')
const express = require('express')
const app = express()
const request = require('requests')


const indexFile = fs.readFileSync('index.html',"utf-8")


const replaceValue=(tmpVal,orgVal)=>{
    
    var temperature = tmpVal.replace('{%temptempr%}',orgVal.main.temp)
        temperature = temperature.replace('{%tempcity%}',orgVal.name)
        temperature = temperature.replace('{%tempcountry%}',orgVal.sys.country)
        temperature = temperature.replace('{%tempwether%}',orgVal.weather.main)

        return temperature
    }
   

app.get('',(req,resp)=>{
    
    const search = req.query
    const SerchEngine=""
    console.log(search)
    if(search.city==null){

    }else{
        const city = search.city
        const citys= city.toLowerCase()
        SerchEngine = citys.charAt(0).toUpperCase() + citys.slice(1);
        
    }
    request(`https://api.openweathermap.org/data/2.5/weather?q=${search.city==null? 'Nadiad':SerchEngine}&appid=93c5987d684a9e9a3dad11e0fcd77b7a`)
    .on('data',(chunk)=> {
        
        
        const objData = JSON.parse(chunk)
        const arrData = [objData]
        // console.log(arrData[0].main.temp)
        
        const CmptWeather = arrData.map((val)=>replaceValue(indexFile,val)).join("")

        resp.send(CmptWeather)
    })
    .on('end',(err)=>{
        if (err) return resp.send("404 Not Found");
        
        resp.end()
    });
    

})


app.listen(1337)
