/*jshint esversion: 6 */

const request = require('request');
const yargs = require('yargs');

var mapsApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var defaultAddress = 'Yevhena Konovaltsia St, 15/2, Kyiv, Ukraine';

var weatherApiKey = 'ddde0a22180a131c6563f3242b519c66';
var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&';

var address = yargs.argv.address || defaultAddress;

request(mapsApiUrl + address, (err, res, body) => {
    if(err && res.statusCode !== 200) throw err;
    var bodyObj = JSON.parse(body);
    var geo = {
        address,
        lat: bodyObj.results[0].geometry.location.lat,
        lng: bodyObj.results[0].geometry.location.lng
    };
    console.log(weatherApiUrl + `lat=${geo.lat}&lon=${geo.lng}&APPID=${weatherApiKey}`);
    request(weatherApiUrl + `lat=${geo.lat}&lon=${geo.lng}&APPID=${weatherApiKey}`, (err, res, body) => {
        weather = JSON.parse(body);
        console.log(weather.main.temp);
        
    });
});