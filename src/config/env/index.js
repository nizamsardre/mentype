"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var NODE_ENV = process.env.NODE_ENV || 'development';
var development = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db'
    },
    secret: process.env.SECRET || '@QEGTUI'
};
var production = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db'
    },
    secret: process.env.SECRET || '@QEGTUI'
};
var test = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
        MONGODB_DB_MAIN: 'test_users_db'
    },
    secret: process.env.SECRET || '@QEGTUI'
};
var config = {
    test: test,
    development: development,
    production: production
};
exports["default"] = config[NODE_ENV];
