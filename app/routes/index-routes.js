'use strict';

let path = require('path');

module.exports = function(app) {
    /**
     * Front end routes shall come here.
     */

    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/index.html')); // load our public/index.html file
    });

};
