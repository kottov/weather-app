/*jshint esversion: 6 */

const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errMessage, result) => {
    if(errMessage) {
        console.log(errMessage);
    } else {
        console.log(result.address);
        weather.getWeather(result.lat, result.lng, (errMessage, weatherResult) => {
            if(errMessage) {
                console.log(errMessage);
            } else {
                console.log(`It's currently ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}.`);
            }
        });
    }
});
