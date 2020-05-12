"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var server_1 = require("../server/server");
var error_1 = require("../error");
var http = require("http");
/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 */
function isAuthenticated(req, res, next) {
    var token = req.headers['x-access-token'];
    if (token) {
        try {
            var user = jwt.verify(token, server_1["default"].get('secret'));
            req.user = user;
            return next();
        }
        catch (error) {
            return next(new error_1["default"](401, http.STATUS_CODES[401]));
        }
    }
    return next(new error_1["default"](400, 'No token provided'));
}
exports.isAuthenticated = isAuthenticated;
