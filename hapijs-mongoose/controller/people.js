'use strict';

var
    Joi = require('joi'),
    Boom = require('boom'),
    People = require('../model/people.js'),
    Division = require('../model/division.js'),
    mongoose = require('mongoose');


module.exports = {
    home: {
        handler: function (request, reply) {
            People.find({})
                .populate('division')
                .exec(function (err, people) {
                    //console.log(people);
                    if (err)
                        return reply(Boom.badImplementation(err)); // 500 error
                    console.log('-------------------Starting with People page-------------------');
                    return reply.view("people/people", { people: people });
                })
        }
    },
    getNew: {
        handler: function (request, reply) {
            Division.find({}, function (err, d) {
                if (err) throw err;
                return reply.view("people/new_people", { division: d });
            });
        }
    },
    new: {
        handler: function (request, reply) {

            var newPeople = People({
                name: request.payload.name,
                email: request.payload.email,
                phone: request.payload.phone,
                division: request.payload.division,
                usename: request.payload.email,
                password: request.payload.phone

            });

            var schema = Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                division: Joi.string().required(),
                id: Joi.any(),
                phone: Joi.string()
            });

            // Joi.validate(request.payload, schema, function (err, value) { 
            //     if(err) throw err;
            //       return reply.view("error", {message: err});
            //     // return Boom.badImplementation(err);
            //     console.log(value);
            // });

            newPeople.save(function (err, r) {
                if (err)
                    return reply.view("error", { message: err });
                return reply.redirect("/people");
            });
        }
    },
    getUpdate: {
        handler: function (request, reply) {

            var person = {};
            var division = [];
            People.find(request.params, function (err, people) {
                if (err) throw err;
                person = people[0];


                Division.find({}, function (err, divisions) {
                    if (err) throw err;
                    division = divisions;

                    return reply.view("people/edit_people", { person: person, division: division });

                });

            });
        }
    },
    update: {
        handler: function (request, reply) {
            var person = {
                _id: request.params._id,
                name: request.payload.name,
                email: request.payload.email,
                phone: request.payload.phone,
                division: request.payload.division
            };

            People.findOneAndUpdate({ _id: request.params._id }, person, function (err, p) {
                            if (err) throw err;
                                return reply.redirect("/people");
                            });
                }

    },
    delete: {
        handler: function (request, reply) {

            People.findOneAndRemove({ _id: request.params._id }, function (err, people) {
                if (err) throw err;
                console.log('DELETED');
                Division.findById(people.division, function (err, division) {
                    if (err) throw err;
                    // console.log(division);
                    division.GiamSL();
                    return reply.redirect("/people");
                })
            })
        }
    },
    search: {
        handler: function (request, reply) {
            // var people = [];
            var keyword = request.query.keyword;
            // People.find({"name": new RegExp('/.*'+keyword+'*/')})
            // console.log(new RegExp('.*'+keyword+'.*'));
            People.find({ "name": new RegExp('.*' + keyword + '.*') })

                .populate('division')
                .exec(function (err, people) {
                    //console.log(people);
                    if (err)
                        return reply(Boom.badImplementation(err)); // 500 error
                    console.log('Search - ', keyword);
                    console.log(people);

                    return reply.view("people/people", { people: people });
                })
        }
    }
}