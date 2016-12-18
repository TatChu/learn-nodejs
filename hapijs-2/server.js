const Hapi = require('hapi');
var Path = require("path");

var Boom = require('boom');
var mongoose = require('mongoose');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 12345
});

var routers = require('./routing');
var api = require('./db_api/api');
var Handlebars = require('handlebars');


server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

});

server.register(require('vision'), (err) => {

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

Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters!!! :x");

    var operator = options.hash.operator || "==";

    var operators = {
        '==': function(l, r) { return l == r; },
        '===': function(l, r) {
            console.log(l, ' === ? ', r);
            return l === r;
        },
        '!=': function(l, r) { return l != r; },
        '<': function(l, r) { return l < r; },
        '>': function(l, r) { return l > r; },
        '<=': function(l, r) { return l <= r; },
        '>=': function(l, r) { return l >= r; },
        'typeof': function(l, r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' chưa biết so sánh biểu thức: " + operator);

    var result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server:', server.info.uri);
});

////////////// execute modules
// Config router
routers(server);
