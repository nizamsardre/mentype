"use strict";
exports.__esModule = true;
var express = require("express");
var Middleware = require("../middleware/middleware");
var Routes = require("../../modules/route");
/**
 * @constant {express.Application}
 */
var app = express();
/**
 * @constructs express.Application Middleware
 */
Middleware.configure(app);
/**
 * @constructs express.Application Routes
 */
Routes.init(app);
/**
 * @constructs express.Application Error Handler
 */
Middleware.initErrorHandler(app);
/**
 * sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);
/**
 * sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('secret', process.env.SECRET || 'superSecret');
/**
 * @exports {express.Application}
 */
exports["default"] = app;
