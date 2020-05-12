"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var logger = require("morgan");
var helmet = require("helmet");
var index_1 = require("../error/index");
var sendHttpError_1 = require("../error/sendHttpError");
//import * as Routes from '../../modules/route';
/**
 * @export
 * @param {express.Application} app
 */
function configure(app) {
    // express middleware
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // returns the compression middleware
    app.use(compression());
    if (process.env.NODE_ENV !== 'production') {
        app.use(logger('dev'));
    }
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that can be used to enable CORS with various options
    app.use(cors());
    // custom errors
    app.use(sendHttpError_1.sendHttpErrorModule);
    // cors
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
            ' Content-Type, Accept,' +
            ' Authorization,' +
            ' Access-Control-Allow-Credentials');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
}
exports.configure = configure;
/**
 * @export
 * @param {express.Application} app
 */
function initErrorHandler(app) {
    app.use(function (error, req, res, next) {
        if (typeof error === 'number') {
            error = new index_1.HttpError(error); // next(404)
        }
        if (error instanceof index_1.HttpError) {
            res.sendHttpError(error);
        }
        else {
            if (app.get('env') === 'development') {
                error = new index_1.HttpError(500, error.message);
                res.sendHttpError(error);
            }
            else {
                error = new index_1.HttpError(500);
                res.sendHttpError(error, error.message);
            }
        }
        console.error(error);
    });
}
exports.initErrorHandler = initErrorHandler;
