"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var jwtConfig = require("../config/middleware/jwtAuth");
var swaggerUi = require("swagger-ui-express");
var auth_route_1 = require("./auth/auth.route");
var user_route_1 = require("./user/user.route");
var swaggerDoc;
try {
    swaggerDoc = require('../../swagger.json');
}
catch (error) {
    console.log('***************************************************');
    console.log('  Seems like you doesn\`t have swagger.json file');
    console.log('  Please, run: ');
    console.log('  $ swagger-jsdoc -d swaggerDef.js -o swagger.json');
    console.log('***************************************************');
}
/**
 * @export
 * @param {express.Application} app
 */
function init(app) {
    var router = express.Router();
    /**
         * @constructs all routes
         */
    app.use('/api/v1', router);
    /**
     * @description
     *  Forwards any requests to the /v1/users URI to our UserRouter
     *  Also, check if user authenticated
     * @constructs
     */
    router.use('/users', jwtConfig.isAuthenticated, user_route_1["default"]);
    /**
     * @description Forwards any requests to the /auth URI to our AuthRouter
     * @constructs
     */
    router.use('/auth', auth_route_1["default"]);
    /**
     * @description
     *  If swagger.json file exists in root folder, shows swagger api description
     *  else send commands, how to get swagger.json file
     * @constructs
     */
    if (swaggerDoc) {
        app.use('/docs', swaggerUi.serve);
        app.get('/docs', swaggerUi.setup(swaggerDoc));
    }
    else {
        app.get('/docs', function (req, res) {
            res.send('<p>Seems like you doesn\'t have <code>swagger.json</code> file.</p>' +
                '<p>For generate doc file use: <code>swagger-jsdoc -d swaggerDef.js -o swagger.json</code> in terminal</p>' +
                '<p>Then, restart your application</p>');
        });
    }
    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use(function (req, res, next) {
        res.status(404).send(http.STATUS_CODES[404]);
    });
}
exports.init = init;
