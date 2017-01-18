/*jshint esversion: 6 */

const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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
        console.log(JSON.stringify(result));
    }
});
