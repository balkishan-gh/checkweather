// jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const date = require(__dirname + "/date.js");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extented:true}));

app.get("/", function(req, res) {
    res.render("index");
});

app.post("/", function(req, res) {

    const unit = "metric";
    const apiKey = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const imgLink = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon  + "@2x.png";
            res.render("result", {cityName : weatherData.name, cityTemp : weatherData.main.temp, windSpeed : weatherData.wind.speed, humidity : weatherData.main.humidity, description : date.capitalizedName(weatherData.weather[0].description), time : date.getDate(), imgLink : imgLink});
        });
    });
    
});

const port = process.env.PORT || 3000;
const host = "0.0.0.0";
app.listen(port, host, function() {
    console.log("Server is running on port 3000");
});

