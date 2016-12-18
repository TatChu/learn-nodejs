'use strict';

const Hapi = require('hapi');
// const Path = require('path');
var inert = require('inert');
var low = require('lowdb');

const server = new Hapi.Server({});

server.connection({ port: 6868, routes: { cors: { origin: ['*'] } } });

const db = low('db.json');


db.defaults({ people: [], division: [] , message: []})
    .value();


const options = {
    query: {
      page: {
        name: 'page' // The page parameter will now be called the_page
      },
      limit: {
        name: 'limit', // The limit will now be called per_page
        default: 3       // The default value will be 10
      }
    },
     meta: {
        name: 'metadata', // The meta object will be called metadata
        count: {
            active: true,
            name: 'count'
        },
        pageCount: {
            name: 'totalPages'
        },
        self: {
            active: true // Will not generate the self link
        },
        first: {
            active: true // Will not generate the first link
        },
        last: {
            active: true // Will not generate the last link
        }
     },
     routes: {
         include: ['/no-apply'],
     }
};


server.register([inert, {register: require('hapi-pagination'), options: options}], (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply('HOME');
        }
    });
    ////////////////////////////////////////////////////////////
    server.route({
        method: 'GET',
        path: '/api/people',
        handler: function(request, reply) {
            console.log("Getting all people:");
            console.log(request.params);

            reply(db.get('people')
                .value());

            // console.log('Getting ...')
            // reply(db.get('people').value());
        }, 
        config: {
          plugins: {
            pagination: {
              // enabled: boolean - force enable or force disable  
              defaults: {
                page: 2,
                limit: 3
                // pagination: override if pagination is false or true by 
                // default 
              }
            }
          }
        }
    });
    server.route({
        method: 'GET',
        path: '/api/people/{id}',
        handler: function(request, reply) {
            console.log("Getting a person:");
            console.log(request.params);
            reply(db.get('people')
                .find(request.params)
                .value());
        }
    });


    server.route({
        method: 'DELETE',
        path: '/api/people/{id}',
        handler: function(request, reply) {
            console.log(request.params);
            console.log('deleting...');
            var res = db.get('people')
                .find(request.params)
                .first()
                .value();
            db.get('people')
                .remove(request.params)
                .value();
            console.log(res);
            // reply(db.get('people').value());
            reply(res);
        }
    });


     server.route({
        method: 'GET',
        path: '/api/people/getByDivisionID/{id}',
        handler: function(request, reply) {
            console.log('searching...', {division: request.params.id});
            var res = db.get('people')
                .filter({division: request.params.id} )
                .value();

            console.log(res);

            reply(res);
        }
    });

    server.route({
        method: 'POST',
        path: '/api/people',
        handler: function(request, reply) {
            console.log("Adding new people:");
            console.log(request.payload);
           //console.log(request.params); //this params is null

            var current = db.get('people').value();
            var p = {
                    id: current.length + 1,
                    name: request.payload.name,
                    email: request.payload.email,
                    phone: request.payload.phone,
                    division: request.payload.division
                };
                p.id = p.id + "";

            db.get('people')
                .push(p)
                .value();

            var res = db.get('people')
                        .find(p)
                        .value();
            reply(res);

            //return all people
            // reply(db.get('people').value());
        }

    });



    server.route({
        method: 'PUT',
        path: '/api/people',
        handler: function(request, reply) {
            console.log('updating...');
            console.log(request.params);
            console.log(request.payload);

            var res = db.get('people')
                .find({id: request.payload.id})
                .assign(request.payload)
                .value();

            // var res = db.get('people')
            //     .find(request.params)
            //     .first()
            //     .value();
            console.log(res);
            // reply(db.get('people').value());
            reply(res);
        }
    });

    ////////////////////////////////////////////////////////////
    //division
    server.route({
        method: 'GET',
        path: '/api/division',
        handler: function(request, reply) {
            console.log("Getting all division:");

             // var res = db.get('people')
             //    .filter({division: request.params.id} )
             //    .value();

            var res = db.get('division').value();

            for(var i = 0; i <= res.length -1; i++){
                    var people = db.get('people')
                            .filter({division: res[i].id} )
                            .value();
                    console.log("=============================START=====================================");
                    console.log(i,' : ', {division: res[i].id} , ' : ', people)
                    console.log("=============================END=======================================");
                    res[i].people = people;
                }
            reply (res);
        }
    });

    server.route({
        method: 'GET',
        path: '/api/division/{id}',
        handler: function(request, reply) {
            console.log("Getting a division:");
            // console.log("=============================START=====================================");
            console.log(request.params);
            // console.log("=============================END=======================================");
            reply(db.get('division')
                .find(request.params)
                .value());
        }
    });

    server.route({
        method: 'POST',
        path: '/api/division',
        handler: function(request, reply) {
            console.log("Add a division:");
            var current = db.get('division').value();
            var division = {};
                division.id = current.length + 1;
                division.id = division.id + "";
                division.name = request.payload.name;
                division.note = request.payload.note;

            var res = db.get('division')
                        .push(division)
                        .value();
            // console.log(res);
            console.log(division);
            reply(division);
        }
    });



    server.route({
        method: 'DELETE',
        path: '/api/division/{id}',
        handler: function(request, reply) {
            console.log(request.params);
            console.log('deleting D...');
            var res = db.get('division')
                .find(request.params)
                .first()
                .value();
            db.get('division')
                .remove(request.params)
                .value();
            console.log(res);
            // reply(db.get('people').value());
            reply(res);
        }
    });



    server.route({
        method: 'PUT',
        path: '/api/division',
        handler: function(request, reply) {
            console.log('updating division...');
            console.log(request.params);
            console.log(request.payload);

            var res = db.get('division')
                .find({id: request.payload.id})
                .assign(request.payload)
                .value();

            // var res = db.get('people')
            //     .find(request.params)
            //     .first()
            //     .value();
            console.log(res);
            // reply(db.get('people').value());
            reply(res);
        }
    });
    ////////////////////////////////////////////////////////////

    server.route({
        method: 'POST',
        path: '/api/login',
        handler: function(request, reply) {
            console.log("login...");
            
            var res = db.get('people')
                        .filter({email: request.payload.email})
                        .first()
                        .value();
            console.log(res);
            if(res === undefined)
                return reply.redirect('http://localhost:9999/#/login');
            return reply(res);
        }
    });
    ////////////////////////////////////////////////////////////





    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'static'
            }
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server:', server.info.uri);
    });
});