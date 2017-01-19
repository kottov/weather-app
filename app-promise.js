/*jshint esversion: 6 */

const yargs = require('yargs');
const axios = require('axios');

const geoApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
const weatherApiUrl = 'https://api.darksky.net/forecast';
const weatherApiKey = '0e9d5d3d5cf89ebf2356e4669ea70cdc';

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

axios.get(geoApiUrl, { 
    params: { address: argv.address } 
})
    .then((res) =>  {
        if(res.data.status === 'ZERO_RESULTS') throw new Error('Unable to find that address.');
        console.log(res.data.results[0].formatted_address);
        const location = res.data.results[0].geometry.location;

        return axios.get(`/${weatherApiKey}/${location.lat},${location.lng}`, {
            baseURL: weatherApiUrl,
            params: {
                exclude: '[minutely,hourly,daily,alerts,flags]',
                units: 'si'
            }
        });
    }).then((res) => {
        console.log(`It's currently ${res.data.currently.temperature}. It feels like ${res.data.currently.apparentTemperature}.`);
    })
    .catch((e) => {
        if(e.code === 'ENOTFOUND' || e.response.status === 404) {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(e.message);
        }
    });