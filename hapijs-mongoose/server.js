const Hapi = require('hapi');
var Path = require("path");

var Boom = require('boom');
var mongoose = require('mongoose');
var Handlebars = require('handlebars');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 1234
});

//Helper
var Helper = require('./utils/helper.js');
//Routing
var  Routes = require('./router.js');
var router_static = require('./static');


//Database connect
var d = require('./start-up/db.js');


server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

});

server.register(require('vision'), (err) => {

    Helper();
    if (err) {
        console.log("Failed to load vision.");
    }

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        layout: true,
        layoutPath: Path.join(__dirname, 'layout'),
        partialsPath: Path.join(__dirname, 'templates/partials'),
        path: 'templates'
    });

});


// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server:', server.info.uri);
});

////////////// execute modules


server.route(Routes.routing);
// Config router
router_static(server);