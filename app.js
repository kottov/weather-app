/*jshint esversion: 6 */

const req = require('request');

var mapsApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var address = 'Yevhena Konovaltsia St, 15/2, Kyiv, Ukraine';

req({
    url: mapsApiUrl + address,
    json: true
}, (err, res, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});
