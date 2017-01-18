/*jshint esversion: 6 */

const req = require('request');

const mapsApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

const geocodeAddress = (address, cb) => {
    
    req({
        url: mapsApiUrl + encodeURIComponent(address),
        json: true
    }, (err, res, body) => {
        if(err) {
            cb('Can not connect to server.', null);
        } else if (body.status === 'ZERO_RESULTS') {
            cb('Unable to find that address.', null);
        } else  if (body.status === 'OK') {
            cb(null, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
        }
    });
};
module.exports = { geocodeAddress };