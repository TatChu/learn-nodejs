'use strict';

var
    Joi = require('joi'),
    Boom = require('boom'),
    People = require('../model/people.js'),
    Division = require('../model/division.js'),
    mongoose = require('mongoose');


module.exports = {
    get_register: {
        handler: function (request, reply) {
            Division.find({}, function (err, d) {
                if (err) throw err;
                return reply.view("login/register", { division: d });
            });
        }
    },
    register: {
        handler: function (request, reply) {
            console.log(request.payload);
            return reply.redirect('/login');
        }
    },
    get_login: {
        handler: function (request, reply) {
            return reply.view("login/login");
        }
    },
    login: {
        handler: function (request, reply) {
            console.log(request.payload);
            return reply("Đợi tý chưa có làm xong");
        }
    }
}