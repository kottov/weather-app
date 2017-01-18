/*jshint esversion: 6 */

const req = require('request');

const weatherApiUrl = 'https://api.darksky.net/forecast';
const weatherApiKey = '0e9d5d3d5cf89ebf2356e4669ea70cdc';

const getWeather = (lat, lng, cb) => {
    req({
        baseUrl: weatherApiUrl,
        uri: `/${weatherApiKey}/${lat},${lng}`,
        qs: { exclude: '[minutely,hourly,daily,alerts,flags]', units: 'si' },
        json: true
    }, (err, res, body) => {
        if(!err && res.statusCode === 200) {
            cb(null, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            cb('Unable to fetch weather.');
        }
    });
};

module.exports = { getWeather };