const path = require('path');

module.exports = {
    openapi: '3.0.0',
    info: {
        // API informations (required)
        title: 'tigrow api doc', // Title (required)
        version: '1.0.0', // Version (required)
        description: 'A blockchain base social for professinal', // Description (optional)
    },
    servers: [
        { url: 'http://localhost:3000' }
    ],
    apis: [path.join(__dirname, './src/**/**/*.ts')]
};
