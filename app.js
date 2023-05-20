const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res){
    const query = req.body.cityName
    const unit = "metric"
    const apiKey = "a538b001f32b2ebf95e33fe217031a28"

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+unit+"";

    https.get(url, function(response){
    console.log(response.statusCode)

    response.on('data', function(data){
        //Turn the hexadecimal into JSON

        const weatherData = JSON.parse(data)
        // console.log(data);
        // console.log(weatherData);

        // getting the temperature data
        const temp = weatherData.main.temp
        // console.log(temp)

        // getting the description -> data is stored in array so we use [0]
        const description = weatherData.weather[0].description
        // console.log(description)
        const icon = weatherData.weather[0].icon
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

        // res.write can be used multiple times
        res.write("<p>The weather is currently " + description + "<p>");
        res.write("<h1> The temperature in "+query+" is " + temp + " degree Celcius. </h1>");
        res.write("<img src=" + imageURL + ">")
        res.send()

    })
})

// // res.send("Server is up and running");
});




app.listen(3000, function(){
    console.log("Server is running on port 3000");
});