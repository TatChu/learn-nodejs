module.exports = function(server){

///#####################################################////
    server.route({
        path:"/error",
        method:"GET",
        handler:function(request,reply){
            return reply.view("error",{message:"No error detected!"},{layout:"layout_error"});
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


