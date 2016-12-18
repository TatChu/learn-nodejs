module.exports = function(server){

var Joi = require('joi');
var db = require('./db_api/api.js');
/////////////////////////////////////////////////////////////////////////////////////////////////
    server.route({
        path:"/division/new",
        method:"GET",
        handler:function(request,reply){
            return reply.view("division/new_division");
        }
    });

     server.route({
        path:"/division/new",
        method:"POST",
        config: {
            handler: function(request,reply){
            var d={name: request.payload.name, note: request.payload.note};
                var res = db.division.add(d);
                console.log(res);
                return reply.redirect("/division");
            },
            validate: {
                payload: {
                    note: Joi.string().required(),
                    name: Joi.string().required()
                }
            }
        }
    });
	//division page
	server.route({
		path:"/division",
		method:"GET",
		handler:function(request,reply){
            var division = db.division.getAll();
			return reply.view("division/division",{division: division});
		}
	});
    
 server.route({
            path:"/division/delete/{id}",
            method:"GET",
            handler:function(request,reply){
                
                console.log('deleting a division.');
                db.division.delete(request.params.id);
                return reply.redirect("/division");
            }
        });

    server.route({
            path:"/division/edit/{id}",
            method:"GET",
            handler:function(request,reply){
                var division = db.division.getByID(request.params.id);
                console.log("Updated");
                return reply.view("division/edit_division", {division: division});  
            }
        });

    server.route({
        path:"/division/update/{id}",
        method:"POST",
        handler:function(request,reply){

                var current = db.division.getByID(request.params.id);
                current.name = request.payload.name;
                current.note = request.payload.note;

                var res = db.division.update(current);
            return reply.redirect("/division");
        }
    });

////////////////////////////////////////////////////////////
	//people page
	server.route({
		path:"/people",
		method:"GET",
		handler:function(request,reply){

            var people = db.people.getAll();
            return reply.view("people/people",  {people: people});
			
		}
	});

	server.route({
		path:"/people/new",
		method:"GET",
		handler:function(request,reply){
            var division = db.division.getAll();
			return reply.view("people/new_people",  {division: division});
		}
	});
    server.route({
        path:"/people/new",
        method:"POST",
        handler:function(request,reply){
            var p = {
                    name: request.payload.name,
                    email: request.payload.email,
                    phone: request.payload.phone,
                    division: request.payload.division
               };

            db.people.add(p);

            return reply.redirect("/people");
        }
    });

	server.route({
			path:"/people/edit/{id}",
			method:"GET",
			handler:function(request,reply){
				var person = db.people.getByID(request.params.id);
                var division = db.division.getAll();
	            return reply.view("people/edit_people", {person: person, division: division});  
			}
		});

	server.route({
		path:"/people/update/{id}",
		method:"POST",
		handler:function(rq,reply){ 
            var person = {
                id: rq.payload.id,
                name: rq.payload.name,
                email: rq.payload.email,
                phone: rq.payload.phone,
                division: rq.payload.division
            };

            db.people.update(rq.payload.id,person);
			return reply.redirect("/people");
		}
	});



    server.route({
            path:"/people/delete/{id}",
            method:"GET",
            handler:function(request,reply){
                db.people.delete(request.params.id);                               
                return reply.redirect("/people");
            }
        });


    server.route({
                path:"/people/search/{keyword*}",
                method:"GET",
                handler:function(request,reply){
                    
                    console.log(request.params);
                    console.log('searching...');
                    
                    var res = db.get('people')
                    .filter({name: request.params.keyword})
                    .value();
                 
                    console.log(res)
                    return reply.view("people/people", {people: res});
                }
            });
///#####################################################////
	server.route({
		path:"/error",
		method:"GET",
		handler:function(request,reply){
			return reply.view("error",{message:"Put error details here!"},{layout:"layout_error"});
		}
	});

    // HOME
    server.route({
        path:"/{params*}",
        method:"GET",
        handler:function(request,reply){
            return reply.view("index");
        }
    });

    //contact page
    server.route({
        path:"/contact",
        method:"GET",
        handler:function(request,reply){
            return reply.view("contact");
        }
    });

    server.route({
            method: 'GET',
            path: '/static/{param*}',
            config:{
                auth:false
            },
            handler: { 
                directory: {
                    path: 'public'
                }
            }
    });



}


