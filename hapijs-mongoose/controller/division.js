'use strict';

var
   Joi = require('joi'),
   Boom = require('boom'),
   People = require('../model/people.js'),
   Division = require('../model/division.js'),
   mongoose = require('mongoose'),
   async = require('async');


module.exports = {
   home: {
      handler: function (request, reply) {

         async.waterfall([
            function (callback) {
               /** Function 1. Find list division.
                 * Pass `ls_division` to Function 2.
                 */
               Division.find({}, function (err, ls_division) {
                  if (err) throw err;
                  callback(err, ls_division);
               });
            },
            /** Function 2. Receive list people folow division id.
              * Pass `ls_division` to final function
              */
            function (ls_division, callback) {
               // Sub function 2: each divisin in ls_division get list people 
               async.each(ls_division,
                  function (division, next) {
                     People.find({ division: division._id }, function (err, lp) {
                        if (err) throw err;
                        division.people = lp;
                        //Go back callback1 handler next division
                        next();
                     });
                  },
                  // 3rd param is the function to call when everything's done
                  function (err) {
                     // All tasks are done now
                     callback(ls_division);
                  }
               );

            }
         ],
            function (ls_division) {
               // Final function
               reply.view("division/division", { division: ls_division });
               console.log(ls_division);
            });
      }
   },
   getNew: {
      handler: function (request, reply) {
         return reply.view("division/new_division");
      }
   },
   new: {
      handler: function (request, reply) {

         var newDivision = Division({
            name: request.payload.name,
            note: request.payload.note
         });

         var promise = newDivision.save();
         promise.then(function (err) {
            if (err) throw err;
            return reply.redirect("/division");
         }).catch(function(err){
            return reply.redirect("/division");
         });
      }
   },
   getUpdate: {
      handler: function (request, reply) {
         var promise = Division.findOne(request.params);
         promise.then(function (d) {
            return reply.view("division/edit_division", { division: d });
         }).catch(function(err){
            console.log(err);
            reply(Boom.badRequest(err));
            // return reply.view("division/edit_division", { division: d });
         });

      }
   },
   update: {
      handler: function (request, reply) {

         var new_Division = {
            name: request.payload.name,
            note: request.payload.note
         }
         Division.findOneAndUpdate({ _id: request.params._id }, new_Division, function (err) {
            if (err) throw err;
            console.log('UPDATED DIVISION');
            return reply.redirect("/division");
         })
      }
   },
   delete: {
      handler: function (request, reply) {

         Division.findOneAndRemove({ _id: request.params._id }, function (err) {
            if (err) throw err;
            console.log('DELETED VIVISION');
            People.remove({ division: request.params._id }, function (err) {
               if (err) throw err;
               console.log('WARRING: DELETED PEOPLE REFERENCE');
               return reply.redirect("/division");
            })


         })
      }
   },
   search: {
      handler: function (request, reply) {
         var keyword = request.query.keyword;
         console.log(new RegExp('.*' + keyword + '.*'));
         Division.find({ "name": new RegExp('.*' + keyword + '.*') })

            .exec(function (err, division) {
               //console.log(people);
               if (err)
                  return reply(Boom.badImplementation(err)); // 500 error
               console.log('Search division - ', keyword);
               return reply.view("division/division", { division: division });
            })
      }
   }
}