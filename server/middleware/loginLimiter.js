const rateLimit = require('express-rate-limit');
const {logEvents} = require('./logger');

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1-hour window
    max: 5, // start blocking after 5 requests
    message:{
        message : 'Too many requests from this IP, please try again in an hour!'
    },
    handler: function (req, res, next, options) {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}`, 'errLog.log')
        res.status(options.statusCode).send(options.message);
        },
    standardHeaders: true,
    legacyHeaders: false,
});
