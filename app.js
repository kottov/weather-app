/*jshint esversion: 6 */

var mapsApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

const req = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        address: {
            demand: true,
            describe: 'Address to fetch weather for.',
            alias: 'a',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

req({
    url: mapsApiUrl + encodeURIComponent(argv.address),
    json: true
}, (err, res, body) => {
    if(err) {
        console.log('Can not connect to server.');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address.');
    } else  if (body.status === 'OK') {
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
});
