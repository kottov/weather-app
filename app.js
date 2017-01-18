/*jshint esversion: 6 */

// const yargs = require('yargs');

// const geocode = require('./geocode/geocode');

// const argv = yargs
//     .options({
//         address: {
//             demand: true,
//             describe: 'Address to fetch weather for.',
//             alias: 'a',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;

// geocode.geocodeAddress(argv.address, (errMessage, result) => {
//     if(errMessage) {
//         console.log(errMessage);
//     } else {
//         console.log(JSON.stringify(result));
//     }
// });

const req = require('request');

const weatherApiUrl = 'https://api.darksky.net/forecast';
const weatherApiKey = '0e9d5d3d5cf89ebf2356e4669ea70cdc';

req({
    baseUrl: weatherApiUrl,
    uri: `/${weatherApiKey}/50.4501,30.5234`,
    qs: { exclude: '[minutely,hourly,daily,alerts,flags]', units: 'si' },
    json: true
}, (err, res, body) => {
    if(!err && res.statusCode === 200) {
        console.log(body.currently.temperature);
    } else {
        console.log('Unable to fetch weather.');
    }
});

