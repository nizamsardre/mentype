"use strict";
exports.__esModule = true;
var http = require("http");
var serverHandlers = require("./serverHandlers");
var server_1 = require("./server");
var Server = http.createServer(server_1["default"]);
/**
 * Binds and listens for connections on the specified host
 */
Server.listen(server_1["default"].get('port'));
/**
 * Server Events
 */
Server.on('error', function (error) { return serverHandlers.onError(error, server_1["default"].get('port')); });
Server.on('listening', serverHandlers.onListening.bind(Server));
